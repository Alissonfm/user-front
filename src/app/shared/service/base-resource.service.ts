import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

import { BaseResourceModel } from '@shared/models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected apiPath: string) { 
    this.http = injector.get(HttpClient);
  }

  getById(id: number) {
    return this.http.get<T>(`${this.apiPath}/${id}`);
  }

  getAll() {
      return this.http.get<T[]>(`${this.apiPath}`);
  }
}