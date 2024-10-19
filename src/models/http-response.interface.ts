import { HttpStatus } from "@nestjs/common";

export interface HttpResponse {
  type: keyof typeof HttpStatus;
  message: string;
}
