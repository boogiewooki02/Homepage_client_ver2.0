interface BasicInputType {
  type: string;
  label: string;
  title: string;
  required?: boolean;
  disabled?: boolean;
}

export interface TextType extends BasicInputType {
  type: 'text';
  inputType: 'text' | 'number';
}

export interface IntType extends BasicInputType {
  type: 'integer';
  inputType: 'number';
}

interface DateTimeType extends BasicInputType {
  type: 'datetime';
}

interface DateType extends BasicInputType {
  type: 'date';
}

interface ImageType extends BasicInputType {
  type: 'image';
}

export type InputFieldType =
  | TextType
  | DateTimeType
  | DateType
  | IntType
  | ImageType;
