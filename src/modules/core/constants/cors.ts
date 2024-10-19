import { HttpResponse } from '@models/http-response.interface';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};

export const BAD_REQUEST_RESPONSE: HttpResponse = {
  type: 'NOT_FOUND',
  message: 'No se encontro resultado',
};
