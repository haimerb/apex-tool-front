import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  allCertificatesByOrg(idOrganization: string): Observable<any> {
    const httpOptions = {
      params:new HttpParams().set("idOrganization",idOrganization)
    };
    return this.http.get(
      environment.apiUrl+'certification.php/certifications',httpOptions
    );
  }

  getTypesCertificates(): Observable<any> {
    return this.http.get(
      environment.apiUrl+'certification.php/allTypesCertificates',
    );
  }


  // setBaseCertificate(nit:string,tipo_retencion:string,year_tribute:string,idOrganizacion:String): Observable<any> {
  //   return this.http.post(
  //     environment.apiUrl+'files.php/files/generateBase',
  //     {
  //       nit,
  //       tipo_retencion,
  //       year_tribute,
  //       idOrganizacion
  //     },
  //     httpOptions
  //   );
  // }

  setCertificate(nit:string,
                 tipo_retencion:string,
                 year_tribute:string,
                 idOrganizacion:string): Observable<any> {

    const hopt = {
      //headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    };
    hopt.headers.append("Accept-Encoding","gzip, deflate, br");
    hopt.headers.append("Accept","application/json");
    return this.http.post(
      environment.apiUrl+'api.php/files/base',
      {nit,
        tipo_retencion,
        year_tribute,
        idOrganizacion,
      },hopt,
    );
  }


}
