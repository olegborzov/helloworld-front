import { BaseModel } from './base.model';

export class User extends BaseModel {
  id: number;
  email: string;
  name?: string;
  isAdmin?: boolean;
}
