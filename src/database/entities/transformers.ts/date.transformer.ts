import { FindOptions, ValueTransformer } from 'typeorm';

export class DataColumnTransformer implements ValueTransformer {
  public static of() {
    return new DataColumnTransformer();
  }

  public from(value: Date | null | FindOptions<Date>) {
    return value;
  }

  public to(value: Date | null | FindOptions<Date>) {
    return value;
  }
}
