import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  HttpStatus,
  HttpException,
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
      } else if (coordinates.data.status === 'REQUEST_DENIED') {
        throw new BadRequestException('Request denied');
      } else if (coordinates.data.status === 'INVALID_REQUEST') {
        throw new BadRequestException('Invalid request');
      } else if (coordinates.data.status === 'OVER_QUERY_LIMIT') {
        throw new HttpException(
          'Your key has exceeded its rate limit or is invalid.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new InternalServerErrorException('Error getting coordinates');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error getting coordinates');
    }
  }
}
