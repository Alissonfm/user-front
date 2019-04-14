import { BaseResourceModel } from './base-resource.model';

export class User extends BaseResourceModel {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token?: string;
}