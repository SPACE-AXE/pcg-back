import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';
import { MapBodyDto } from './dto/map.dto';

@Injectable()
export class MapService {
  constructor(private readonly configService: ConfigService) {}

  async getPublicPark(mapBodyDto: MapBodyDto) {
    const addr = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${mapBodyDto.lng},${mapBodyDto.lat}&output=json&orders=roadaddr&output=json`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': this.configService.get('NAVER_MAP_ID'),
          'X-NCP-APIGW-API-KEY': this.configService.get('NAVER_MAP_SECRET'),
        },
      },
    );

    if (!addr.data.results) {
      throw new NotFoundException('Park Data Not Found!!');
    }

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
          parseInt(item.prkcmprt) >= mapBodyDto.space
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
      return filteredItems;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch data from API: ${error}`);
    }
  }

  async addrToLatLng(addr: string) {
    const apiKeyId = this.configService.get<string>('NAVER_MAP_ID');
    const apiKey = this.configService.get<string>('NAVER_MAP_SECRET');

    try {
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
    } catch (error) {
      throw new NotFoundException('Addr Not Found');
    }
  }

  async placeToLatLng(place: string) {
    try {
      const response = await axios.get(
        `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${this.configService.get<string>('GET_ADDR_KEY')}`,
        {
          params: {
            currentPAge: 1,
            countPerPage: 1,
            keyword: place,
            resultType: 'json',
          },
        },
      );
      return await this.addrToLatLng(
        response.data.results.juso[0].roadAddrPart1,
      );
    } catch (error) {
      throw new NotFoundException('Place Not Found');
    }
  }

  async getParkInfo(name: string) {
    try {
      const apiUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api?serviceKey=${this.configService.get('PUBLIC_DATA_ID')}&pageNo=1&numOfRows=100&type=json&prkplceNm=${name}`;
      const response = await axios.get(apiUrl);
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
    } catch (error) {
      throw new NotFoundException('Park Info Not Found');
    }
  }
}
