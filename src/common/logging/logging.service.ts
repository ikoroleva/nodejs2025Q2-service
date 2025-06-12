import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService implements LoggerService {
  private logger: Logger;
  private errorLogger: Logger;

  constructor(private configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL', 'info');
    const maxFileSize = this.configService.get<string>(
      'LOG_MAX_FILE_SIZE',
      '5m',
    );

    const logFormat = format.combine(
      format.timestamp(),
      format.ms(),
      format.errors({ stack: true }),
      format.json(),
    );

    this.logger = createLogger({
      level: logLevel,
      format: logFormat,
      transports: [
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: maxFileSize,
          maxFiles: '14d',
          zippedArchive: true,
        }),
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });

    this.errorLogger = createLogger({
      level: 'error',
      format: logFormat,
      transports: [
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: maxFileSize,
          maxFiles: '14d',
          zippedArchive: true,
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
    this.errorLogger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }

  logRequest(request: any) {
    const { method, url, query, body } = request;
    this.log(`Incoming Request: ${method} ${url}`, 'Request');
    if (Object.keys(query).length) {
      this.log(`Query Parameters: ${JSON.stringify(query)}`, 'Request');
    }
    if (Object.keys(body).length) {
      this.log(`Request Body: ${JSON.stringify(body)}`, 'Request');
    }
  }

  logResponse(response: any) {
    const { statusCode, body } = response;
    this.log(`Response: ${statusCode}`, 'Response');
    if (body) {
      this.log(`Response Body: ${JSON.stringify(body)}`, 'Response');
    }
  }
}
