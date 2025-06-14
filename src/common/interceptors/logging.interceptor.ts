import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query } = request;

    this.loggingService.logRequest(request);

    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const delay = Date.now() - now;
          this.loggingService.logResponse({
            statusCode: response.statusCode,
            body: data,
          });
          this.loggingService.log(
            `${method} ${url} ${response.statusCode} - ${delay}ms`,
            'LoggingInterceptor',
          );
        },
        error: (error) => {
          const delay = Date.now() - now;
          this.loggingService.error(
            `${method} ${url} - ${delay}ms - body:${body} - query:${query}`,
            error.stack,
            'LoggingInterceptor',
          );
        },
      }),
    );
  }
}
