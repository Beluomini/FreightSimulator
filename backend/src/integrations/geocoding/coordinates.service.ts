import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResponseCoordenatesDto } from './coordinates.dto';

@Injectable()
export class CoordinatesService {
  private readonly geocodingApiKey = process.env.GEOCODING_API_KEY;
  private readonly geocodingRoute = process.env.GEOCODING_API_ROUTE;

  async getCoordinates(address: string): Promise<ResponseCoordenatesDto> {
    const coordinates = await axios.get(this.geocodingRoute, {
      params: {
        key: this.geocodingApiKey,
        address: address,
      },
    });
    return coordinates.data.results[0].geometry.location;
  }
}
