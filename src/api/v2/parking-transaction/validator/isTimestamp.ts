import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsTimestampConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
      return false;
    }

    // 자바스크립트에서 타임스탬프가 유효한 날짜로 변환되는지 확인
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;

    if (typeof value !== 'number') {
      return 'Value must be a number.';
    }

    if (value < 0) {
      return 'Timestamp must be a non-negative integer.';
    }

    return `Value (${value}) is not a valid timestamp!`;
  }
}

export function IsTimestamp(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimestampConstraint,
    });
  };
}
