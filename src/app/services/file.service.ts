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
  upLoadFIle(upLoadFIle:FormData): Observable<any> {

    //console.log(upLoadFIle,"Antes-21");
    // let data=new Blob(fileUpload);
    //let file=upLoadFIle[0];
    //let fd=new FormData();
    //fd.set("upLoadFIle",upLoadFIle[0]);

    //let formDataEntry=upLoadFIle[0];

    //let dataFile=new File(new Blob(formDataEntry),"archivo.xlsx");
    const h = {
      headers: new HttpHeaders(
        {"Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
      )
    };
    h.headers.append("Content-Disposition", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    //  httpOptions.headers.append('Content-Encoding', ' gzip, deflate, br, zstd');
    //  httpOptions.headers.append('Accept-Encoding', 'gzip, deflate, br');
    ////console.log(fd.getAll("upLoadFIle")[0],"upLoadFIle");
    h.headers.append("accept", "application/json");
    return this.http.post(environment.apiUrl+'files.php/files',
      upLoadFIle,
      {
        observe: 'events'}
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


  readFIle(nameFile:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' })
    };
    //options.headers.append("accept", "*/*");
    //options.headers.append("Accept-Encoding","gzip, deflate, br");
    options.headers.append("Accept","application/json; charset=utf-8");
    return this.http.post(environment.apiUrl+'api.php/files/procesFile',
      {
        nameFile
      },
      options
    );
  }

}



