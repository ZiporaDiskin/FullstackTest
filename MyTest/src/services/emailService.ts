import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class EmailService {
    constructor(private http: HttpClient) { }


    sendEmail(emailInput: any): Observable<any> {
        const apiUrl = 'https://localhost:44390/api/home/submitForm'; 
      
        return this.http.post(apiUrl, emailInput).pipe(
          map((response) => {
            return response;
          }),
          catchError((err, caught) => {
            console.error(err);
            throw err;
          }
          )
        );
      }
  }

    