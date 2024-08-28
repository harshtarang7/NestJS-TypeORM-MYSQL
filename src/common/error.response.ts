import { HttpStatus } from '@nestjs/common';

type ErrorType =
  | ErrorResponseData
  | FileNotFound
  | NotAuthorized
  | NoDataFound
  | SomethingWentWrong;

export class ErrorResponse {
  constructor(
    public message: string,
    public error_status: boolean = true,
    public error?: ErrorType,
  ) {}
}

type ErrorResponseData = {
  error_code: number;
  error_message: HttpStatus;
};

export class BadRequest {
  constructor(
    public message: string = 'Bad Request again',
    public error_code: HttpStatus = HttpStatus.BAD_REQUEST,
    public errorData: unknown = {},
  ) {}
}

export class NoDataFound {
  constructor(
    public message: string = 'No data found',
    public error_code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {}
}

// Custom error classes
export class FileNotFound {
  constructor(
    public message: string = 'File not found',
    public error_code: number = HttpStatus.BAD_REQUEST,
  ) {}
}

export class NotAuthorized {
  constructor(
    public message: string = 'Not authorized',
    public error_code: number = HttpStatus.UNAUTHORIZED,
  ) {}
}

export class SomethingWentWrong {
  constructor(
    public message: string = 'Something went wrong',
    public error_code: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {}
}
