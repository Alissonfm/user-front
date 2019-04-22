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

    private eraseUser(){
        if(localStorage.getItem('currentUser') != undefined ){
            localStorage.removeItem('currentUser');
            this.user = undefined;
        }
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
        this.eraseUser();
    }
}


/*
@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        console.log(`${environment.baseUrl}/users/authenticate`);
        let user = new User();
        user.password = password;
        user.login = username;
        return this.http.post<any>(`${environment.baseUrl}/users/authenticate`, user)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
*/