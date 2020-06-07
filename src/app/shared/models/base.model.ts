import { classToPlain, plainToClass } from 'class-transformer';

// https://github.com/typestack/class-transformer
export class BaseModel {
  static fromJson(data: any): any {
    return plainToClass(this, data);
  }

  toJson(): any {
    return classToPlain(this);
  }
}
