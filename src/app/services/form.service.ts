import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form.models';
import { FormResponse } from '../models/formResponse.models';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }


  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>('http://localhost:3000/forms/');
  }

  submitFormResponse(formId: string, formData: FormResponse): Observable<FormResponse> {
    const url = `http://localhost:3000/formsResponse/${formId}/responses`;
    return this.http.post<FormResponse>(url, formData);
  }

  getAllDataFormResponse(formId: string): Observable<FormResponse[]> {
    const url = `http://localhost:3000/formsResponse/${formId}/responses`;
    return this.http.get<FormResponse[]>(url);
  }
}
