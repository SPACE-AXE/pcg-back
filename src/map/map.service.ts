import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class MapService {
  constructor(private readonly configService: ConfigService) {}

  async getPublicPark(lat: number, lng: number) {
    const addr = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${lng},${lat}&sourcecrs=epsg:4326&output=json&orders=roadaddr&output=json`,
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
      return [].concat(...items);
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error}`);
    }
  }
}
