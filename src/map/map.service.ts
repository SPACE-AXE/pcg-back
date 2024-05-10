import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';
import { MapBodyDto } from './dto/map.dto';
import { filter } from 'rxjs';
import { ConnectedSocket } from '@nestjs/websockets';

@Injectable()
export class MapService {
  constructor(private readonly configService: ConfigService) {}

  async getPublicPark(mapBodyDto: MapBodyDto) {
    const addr = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${mapBodyDto.lng},${mapBodyDto.lat}&sourcecrs=epsg:4326&output=json&orders=roadaddr&output=json`,
      {
        params: {
          'X-NCP-APIGW-API-KEY-ID': this.configService.get('NAVER_MAP_ID'),
          'X-NCP-APIGW-API-KEY': this.configService.get('NAVER_MAP_SECRET'),
        },
      },
    );
    const slicedAddr = addr.data.results[0].region.area2.name;

    const jsonData = fs.readFileSync('code.json', 'utf-8');
    const data = JSON.parse(jsonData);

    const matchingData = data.filter((item) => {
      return item['제공기관명'].includes(slicedAddr);
    });

    const organizationCodes = matchingData.map((item) => item['제공기관코드']);

    try {
      const responses = await Promise.all(
        organizationCodes.map(async (code) => {
          const apiUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api?serviceKey=${this.configService.get('PUBLIC_DATA_ID')}&pageNo=1&numOfRows=500&type=json&instt_code=${code}`;

          return await axios.get(apiUrl);
        }),
      );
      const items = responses.map((response) => {
        return response.data.response.body.items;
      });
      const newItems = [].concat(...items);

      console.log(mapBodyDto.disabled, mapBodyDto.price, mapBodyDto.space);

      newItems.map((a) => {
        console.log(
          a.prkplceNm,
          a.pwdbsPpkZoneYn,
          a.basicCharge,
          typeof a.prkcmprt,
        );
      });
      const priceFilter = newItems.filter((item) => {
        if (
          item.basicCharge === '' ||
          parseInt(item.basicCharge) <= mapBodyDto.price
        ) {
          return item;
        }
      });

      const spaceFilter = priceFilter.filter((item) => {
        if (
          item.prkcmprt === undefined ||
          parseInt(item.prkcmprt) <= mapBodyDto.space
        ) {
          return item;
        }
      });

      const filteredItems = spaceFilter.filter((item) => {
        if (mapBodyDto.disabled === 'Y') {
          if (item.pwdbsPpkZoneYn === 'Y') {
            return item;
          }
        } else if (mapBodyDto.disabled === 'N') {
          return item;
        }
      });
      // const filteredItems = newItems.filter((item) => {
      //   if (
      //     parseInt(item.basicCharge) <= mapBodyDto.price &&
      //     parseInt(item.prkcmprt) <= mapBodyDto.space
      //   ) {
      //     return item;
      //   }
      // });

      // const _filteredItems = [];

      // filteredItems.forEach((item) => {
      //   if (mapBodyDto.disabled === 'Y') {
      //     // disabled가 'Y'이면서 pwdbsPpkZoneYn이 'Y'인 항목을 필터링합니다.
      //     if (item.pwdbsPpkZoneYn === 'Y') {
      //       _filteredItems.push(item);
      //     }
      //   } else if (mapBodyDto.disabled === 'N') {
      //     // disabled가 'N'이면서 다른 조건에 상관없이 모든 항목을 필터링합니다.
      //     _filteredItems.push(item);
      //   }
      // });
      // console.log(_filteredItems);
      // console.log(newItems[0]);
      // console.log(filteredItems[0]);
      return filteredItems;
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error}`);
    }
  }

  async addrToLatLng(addr: String) {
    const apiKeyId = this.configService.get<string>('NAVER_MAP_ID');
    const apiKey = this.configService.get<string>('NAVER_MAP_SECRET');

    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${addr}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': apiKeyId,
          'X-NCP-APIGW-API-KEY': apiKey,
        },
      },
    );
    return response.data.addresses[0];
  }

  async placeToLatLng(place: String) {}

  async getParkInfo(name: String) {
    const apiUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api?serviceKey=${this.configService.get('PUBLIC_DATA_ID')}&pageNo=1&numOfRows=100&type=json&prkplceNm=${name}`;
    const response = await axios.get(apiUrl);
    console.log(response.data.response.body.items[0]);
    const data = response.data.response.body.items[0];

    const time = {
      weekdayOpenAt: data.weekdayOperOpenHhmm,
      weekdayCloseAt: data.weekdayOperColseHhmm,
      satOpenAt: data.satOperOperOpenHhmm,
      satCloseAt: data.satOperCloseHhmm,
      holidayOpenAt: data.holidayOperOpenHhmm,
      holidayCloseAt: data.holidayCloseOpenHhmm,
    };

    const price = {
      baseTime: data.basicTime,
      basePrice: data.basicCharge,
      unitTime: data.addUnitTime,
      unitPrice: data.addUnitCharge,
      datTime: data.dayCmmtktAdjTime,
      dayPrice: data.dayCmmtkt,
      monthPrice: data.monthCmmtkt,
    };

    const processedData = {
      name: data.prkplceNm,
      addr: data.rdnmadr ? data.rdnmadr : data.lnmadr,
      space: data.prkcmprt,
      disabled: data.pwdbsPpkZoneYn,
      time: time,
      price: price,
    };

    return processedData;
  }
}
