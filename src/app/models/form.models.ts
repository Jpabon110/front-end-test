export interface FormField {
    name: string;
    label: string;
    type: string;
    required: boolean;
    values: string[];
    defaultValue?: string;
  }
  
  export interface Form {
    _id: string;
    name: string;
    description: string;
    fields: FormField[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  