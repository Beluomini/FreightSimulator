import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { ResponseCoordenatesDto } from './coordinates.dto';

@Injectable()
export class CoordinatesService {
  private readonly geocodingApiKey = process.env.GEOCODING_API_KEY;
  private readonly geocodingRoute = process.env.GEOCODING_API_ROUTE;

  async getCoordinates(address: string): Promise<ResponseCoordenatesDto> {
    try {
      const coordinates = await axios.get(this.geocodingRoute, {
        params: {
          key: this.geocodingApiKey,
          address: address,
        },
      });
      if (coordinates.data.status === 'OK') {
        return coordinates.data.results[0].geometry.location;
      } else if (coordinates.data.status === 'ZERO_RESULTS') {
        throw new NotFoundException('Address not found');
      } else {
        throw new InternalServerErrorException('Error getting coordinates');
      }
    } catch (error) {
      throw error;
    }
  }
}
