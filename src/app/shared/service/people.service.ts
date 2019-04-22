import { Injectable, Injector } from '@angular/core';
import { People } from '../models/people.model';
import { BaseResourceService } from './base-resource.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends BaseResourceService<People> {
  constructor(injector: Injector) {
    super(injector, environment.baseUrl + '/peoples');
  }
}
