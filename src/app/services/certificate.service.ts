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
  setCertificate(nit:string,
                 tipo_retencion:string,
                 year_tribute:string,
                 idOrganizacion:string,
                 rangeSince:string,
                 rangeUntil:string): Observable<any> {

    const hopt = {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    };
    hopt.headers.append("Accept-Encoding","gzip, deflate, br");
    hopt.headers.append("Accept","application/json");
    return this.http.post(
      environment.apiUrl+'api.php/certificate/base',
      {nit,
        tipo_retencion,
        year_tribute,
        idOrganizacion,
        rangeSince,
        rangeUntil
      },hopt,
    );
  }

  getPreCertification(nit:string,tipo_retencion:string,
                      year_tribute:string,idOrganizacion:string): Observable<any> {

    const opt = {
      params:new HttpParams().set("nit",nit)
                              .set("tipo_retencion",tipo_retencion)
                              .set("year_tribute",year_tribute)
                              .set("idOrganizacion",idOrganizacion)
    };

    return this.http.get(
      environment.apiUrl+'api.php/certificate/getInfoPreBase',opt
    );
  }

}
