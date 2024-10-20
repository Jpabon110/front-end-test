export interface FormField {
    name: string;
    label: string;
    type: string;
    required: boolean;
    values: string[];  // Si tienes un array de valores para campos como select
    defaultValue?: string;  // Esto es opcional, ya que no siempre está presente
  }
  
  export interface Form {
    _id: string;
    name: string;
    description: string;
    fields: FormField[];  // Array de campos de formulario
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  