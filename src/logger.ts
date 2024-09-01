import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

export const loggerOptions = {
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs',
      filename: `%DATE%.log`,
      maxFiles: '30d',
      zippedArchive: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Park-Charge-Go', {
          prettyPrint: true,
          colors: true,
          appName: true,
        }),
      ),
    }),
  ],
};
