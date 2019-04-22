import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from './base-resource.service';
import { environment } from '@environments/environment';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseResourceService<Address> {
  constructor(injector: Injector) {
    super(injector, environment.baseUrl + '/addresses');
  }
}
