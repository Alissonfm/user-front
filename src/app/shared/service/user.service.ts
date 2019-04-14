import { environment } from "src/environments/environment";

import { BaseResourceService } from './base-resource.service';
import { User } from '@shared/models/user.model';
import { Injector, Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseResourceService<User> {
  constructor(injector: Injector) {
    super(injector, environment.baseUrl + '/users');
  }

}