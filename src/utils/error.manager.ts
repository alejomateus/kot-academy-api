import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const errorData = message.split(' :: ');
    if (errorData.length > 1) {
      throw new HttpException(message, HttpStatus[errorData[0]]);
    } else {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
