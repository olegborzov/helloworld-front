import { BaseModel } from '../../core/utils/model';

export class User extends BaseModel {
  id: number;
  email: string;
  isAdmin: boolean;
}
