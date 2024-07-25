import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  updateUser(idUser: number, namesUser:string,lastNamesuser:string,passwordUser:string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };

    options.headers.append('Accept','application/json; charset=utf-8');
    options.headers.append('Method','PUT');

    return this.http.put(environment.apiUrl+'api.php/user/update',
      {
        idUser,
        namesUser,
        lastNamesuser,
        passwordUser
     },
      options
     );
  }

  getAllRolsByIdUser(idUser: number): Observable<any> {
    const httpOptions = {
      params:new HttpParams().set("idUser",idUser)
    };
    return this.http.get(
      environment.apiUrl+'api.php/user/rol',httpOptions
    );
  }

}
