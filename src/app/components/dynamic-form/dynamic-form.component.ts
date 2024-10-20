import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '../../models/form.models';

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
    MatOptionModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  formGroup!: FormGroup;  
  formData: Form | null = null;  
  allForms: Form[] = [];  
  selectedFormId: string | null = null;  

  constructor(private formService: FormService, private fb: FormBuilder) { }

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
        console.log("todos los forms", this.allForms);
        this.selectedFormId = this.allForms[0]._id;  
        this.formData = this.allForms[0];
        this.buildForm(this.formData.fields);  
      }
    });
  }

  buildForm(fields: any[]): void {
    this.formGroup.reset();  
    fields.forEach(field => {
      const control = this.fb.control(
        '',  
        field.required ? Validators.required : null  
      );
      this.formGroup.addControl(field.name, control);
    });
  }

  onSelectForm(formId: string): void {
    if (!formId) {
      console.error('No se ha seleccionado ningún formulario.');
      return; // Salir si no hay ID
    }

    this.selectedFormId = formId; // Actualizar el formulario seleccionado
    const selectedForm = this.allForms.find(form => form._id === formId); // Encontrar el formulario por ID

    if (selectedForm) {
      this.formData = selectedForm; // Cargar el formulario
      this.buildForm(this.formData.fields); // Construir el formulario
    } else {
      console.error(`No se encontró un formulario con ID: ${formId}`);
    }
}


  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
