import { BaseResourceModel } from './base-resource.model';

export class User extends BaseResourceModel {
  id?: number;
  user?: string;
  password: string;
  login: string;
}