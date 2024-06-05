import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
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

  getTypesCertificates(): Observable<any> {
    return this.http.get(
      environment.apiUrl+'certification.php/allTypesCertificates',
      {}
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
