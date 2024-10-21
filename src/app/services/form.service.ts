import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form.models';
import { FormResponse } from '../models/formResponse.models';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }


  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/forms/`);
  }

  submitFormResponse(formId: string, formData: FormResponse): Observable<FormResponse> {
    const url = `${this.apiUrl}/formsResponse/${formId}/responses`;
    return this.http.post<FormResponse>(url, formData);
  }

  getAllDataFormResponse(formId: string): Observable<FormResponse[]> {
    const url = `${this.apiUrl}/formsResponse/${formId}/responses`;
    return this.http.get<FormResponse[]>(url);
  }
}
