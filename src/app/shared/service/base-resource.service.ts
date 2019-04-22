import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

import { BaseResourceModel } from '@shared/models/base-resource.model';
import { Observable } from 'rxjs';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected apiPath: string) { 
    this.http = injector.get(HttpClient);
  }

  getById(id: number) {
    return this.http.get<T>(`${this.apiPath}/${id}`);
  }

  getAll() {
    return this.http.get<T[]>(`${this.apiPath}/all`);
  }

  save(data: any): Observable<T> {
    return this.http.post<T>(`${this.apiPath}/save`, data);
  }

  delete(data: any): Observable<T> {
    console.log(data);
    return this.http.delete<T>(`${this.apiPath}/${data}`);
  }

  edit(data: any) {
    this.http.put<T>(`${this.apiPath}/update`, data);
  }

}