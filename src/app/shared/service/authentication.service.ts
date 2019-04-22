import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '@shared/models/user.model';

import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService {

    private user: User;
    private status: string;

    constructor(private http: HttpClient) {}

    private setUser(data: User){
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.user = data;
    }

    private getUser(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    private eraseUser(){
        if(localStorage.getItem('currentUser') != undefined ){
            localStorage.removeItem('currentUser');
            this.user = undefined;
            return true;
        }
        return false;
    }

    check() {
        if( this.user != undefined) {
            return true;
        }
        return false;
    }

    getMessageStatus(){
        return this.status;
    }

    login(username: string, password: string, onSuccess, onFail) {

        let $this = this;
        let tempUser: User = new User();
        tempUser.login = username;
        tempUser.password = password;

        return this.http.post<User>(`${environment.baseUrl}/users/authenticate`, tempUser).subscribe(
            // callback if success
            (response) => {
                $this.setUser(response);
                $this.status = "Loggin was succefull";
                onSuccess();
            },
            // callback if fail
            (response) => {
                console.log("Erro when process login, see the server message bellow: ");
                console.log(response);
                $this.status = response.message;
                onFail();
            }
        );
    };

    logout() {
        return this.eraseUser();
    }
}