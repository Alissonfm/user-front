import { Injectable, Injector } from '@angular/core';
import { TypeAddress } from '../models/type-address.model';
import { BaseResourceService } from './base-resource.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeAddressService extends BaseResourceService<TypeAddress> {
  constructor(injector: Injector) {
    super(injector, environment.baseUrl + '/type-addresses');
  }
}
