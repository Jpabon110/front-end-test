import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Form } from '../../models/form.models';
import { FormResponse } from '../../models/formResponse.models';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  formGroup!: FormGroup;
  formData: Form | null = null;
  allForms: Form[] = [];
  allDataFormsResponse: FormResponse[] = [];
  selectedFormId: string | null = null;
  displayedColumns: string[] = ['name', 'values'];

  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadFormData();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({});
  }

  loadFormData(): void {
    this.formService.getForms().subscribe(data => {
      this.allForms = data;
      if (this.allForms.length > 0) {
        this.selectedFormId = this.allForms[0]._id;
        this.formData = this.allForms[0];
        this.buildForm(this.formData.fields);
        const dataById = this.formService.getAllDataFormResponse(this.allForms[0]._id).subscribe(data =>{
        this.allDataFormsResponse = data;
          console.log("display data", this.allDataFormsResponse);
        })
      }
    });

  }

  buildForm(fields: any[]): void {
    Object.keys(this.formGroup.controls).forEach(controlName => {
      this.formGroup.get(controlName)?.disable();
    });
  
    fields.forEach(field => {
      let validators = [];
  
      if (field.required) {
        validators.push(Validators.required);
      }
  
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
  
      const control = this.formGroup.get(field.name) || this.fb.control('', validators);
      control.setValidators(validators);
      control.enable(); 
  
      if (!this.formGroup.contains(field.name)) {
        this.formGroup.addControl(field.name, control);
      }
    });
  }
  
  
  transformRequest(data: any): any {
    const keys = Object.keys(data)
    const transformData = keys.map((key) =>{
      return {
        name: key,
        value: data[key]
      }
    })
    return {
      fields: transformData
    };
  }

  onSelectForm(formId: string): void {
    if (!formId) {
      console.error('No se ha seleccionado ningún formulario.');
      return;
    }

    this.selectedFormId = formId;
    const selectedForm = this.allForms.find(form => form._id === formId);
    if (selectedForm) {
      this.formData = selectedForm;
      this.formGroup = this.fb.group({});
      this.buildForm(this.formData.fields);
    } else {
      console.error(`No se encontró un formulario con ID: ${formId}`);
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formId = this.selectedFormId;
      const formData = this.formGroup.getRawValue();
      const transformData = this.transformRequest(formData);
  
      if (formId) {
        this.formService.submitFormResponse(formId, transformData).subscribe(
          response => {
            this.initializeForm();
            this.loadFormData();
            console.log('Formulario enviado con éxito', response);
            this.dialog.open(DialogComponent, {
              data: {
                title: 'Éxito',
                message: 'Formulario enviado con éxito.'
              }
            });
          },
          error => {
            console.error('Error al enviar el formulario', error);
            this.dialog.open(DialogComponent, {
              data: {
                title: 'Error',
                message: 'Hubo un error al enviar el formulario. Intenta nuevamente.'
              }
            });
          }
        );
      }
    } else {
      console.log('Formulario inválido');
    }
  }
  
}