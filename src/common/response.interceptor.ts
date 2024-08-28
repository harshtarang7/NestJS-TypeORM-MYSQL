import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { SuccessResponse } from './success.response';
import {
  BadRequest,
  ErrorResponse,
  FileNotFound,
  NoDataFound,
  NotAuthorized,
  SomethingWentWrong,
} from './error.response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof SuccessResponse || data instanceof ErrorResponse) {
          return data;
        } else {
          return new SuccessResponse(data);
        }
      }),
      catchError((error) => {
        const errorResponse = this.handleError(error);
        const response = context.switchToHttp().getResponse();
        response
          .status(errorResponse.error.error_code || 500)
          .json(errorResponse);

        // Return empty observable to prevent further processing
        return new Observable();
      }),
    );
  }

  private handleError(error: any): ErrorResponse {
    console.log('Handling error:', error);

    if (error instanceof ErrorResponse) {
      return error;
    } else if (
      error instanceof NoDataFound ||
      error instanceof FileNotFound ||
      error instanceof NotAuthorized ||
      error instanceof SomethingWentWrong
    ) {
      return new ErrorResponse(error.message, true, this.getErrorType(error));
    } else if (
      error instanceof BadRequestException ||
      error instanceof HttpException
    ) {
      const response = error.getResponse();
      let message = 'Bad Request';
      let errorData: any = '';

      if (typeof response === 'object' && response !== null) {
        if (Array.isArray(response['message'])) {
          message = response['message'].join(', ');
        } else {
          message = response['message'] || message;
        }
        errorData = message;
        // message = response['message'] || message;
        // errorData = Array.isArray(response['message']) ? response['message'] : message;
      }

      const bad = new BadRequest();
      bad.errorData = errorData;

      console.log('badrequest', message);
      console.log('from error handler', bad);

      return new ErrorResponse(message, true, bad);
    } else {
      console.log('from error handler', error);
      // Generic error handling for unknown errors
      return new ErrorResponse(
        'An unexpected error occurred',
        true,
        new SomethingWentWrong(),
      );
    }
  }

  private getErrorType(error: any): ErrorType {
    if (error instanceof NoDataFound) return error;
    if (error instanceof FileNotFound) return error;
    if (error instanceof NotAuthorized) return error;
    if (error instanceof SomethingWentWrong) return error;
    if (error instanceof BadRequest) return error;
    return new SomethingWentWrong();
  }
}

type ErrorType =
  | NoDataFound
  | FileNotFound
  | NotAuthorized
  | SomethingWentWrong
  | BadRequest;
