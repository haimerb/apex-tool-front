import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
  params:new HttpParams()
};
const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class FIleService {
  constructor(private http: HttpClient) {}



  upLoadFIle(fileUpload:FormData ): Observable<any> {
    httpOptions.headers.append("accept","application/json");
    return this.http.post(
      environment.apiUrl+'files.php/files',
      {
        fileUpload
      },
      httpOptions
    );
  }

  downloadFIle(nameFile:any ): Observable<any> {
    //httpOptions.headers.append("accept", "*/*");
    //httpOptions.headers.append("accept","gzip, deflate, br");
    const options = {
      params:new HttpParams().set("file",nameFile)
    };
  return this.http.get(
      environment.apiUrl+'files.php/files/downloadFile',
      options
    );
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}



