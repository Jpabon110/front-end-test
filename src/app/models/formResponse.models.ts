export interface FormFields {
    name: string;
    values: string[];
  }
  
  export interface FormResponse {
    form_id: string;
    fields: FormFields[];
  }
  