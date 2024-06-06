import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  allCertificatesByOrg(idOrganization: string): Observable<any> {
    return this.http.post(
      environment.apiUrl+'login.php',
      {
        idOrganization
      },
      httpOptions
    );
  }

  getAllOrganizations(nit:string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    params.set("nit",nit);

    const httpOptions = {
      //headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params:new HttpParams().set("nit",nit)
    };

    return this.http.get(
      environment.apiUrl+'organization.php/allOrganizations',httpOptions
    );
  }

  setCertificate(): Observable<any> {
    return this.http.post(
      environment.apiUrl+'login.php',
      {

      },
      httpOptions
    );
  }

}
