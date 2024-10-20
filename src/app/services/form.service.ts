import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form.models';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }


  getForms(): Observable<Form[]> {  // Cambia el tipo de retorno a Form[]
    return this.http.get<Form[]>('http://localhost:3000/forms/'); // Aquí se usa la URL de tu backend
  }
}
