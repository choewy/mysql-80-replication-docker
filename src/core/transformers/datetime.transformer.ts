import { DateTime } from 'luxon';
import { DateTimeFormat } from '../enums';
import { TransformFnParams } from 'class-transformer';

export class DateTimeTransformer {
  private static to(value: string, format: DateTimeFormat): DateTime | null {
    let result: DateTime;

    switch (format) {
      case DateTimeFormat.ISO:
        result = DateTime.fromISO(value);
        break;

      case DateTimeFormat.SQL:
        result = DateTime.fromSQL(value);
        break;

      case DateTimeFormat.DATE:
        result = DateTime.fromFormat(value, format);
        break;
    }

    return result.isValid ? result : null;
  }

  public static byTransform(format: DateTimeFormat) {
    return ({ value }: TransformFnParams) => this.to(value, format);
  }
}
