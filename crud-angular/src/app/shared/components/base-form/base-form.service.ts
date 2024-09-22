import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BaseFormService {
  constructor() {}

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup).forEach((fieldName) => {
      const control = formGroup.get(fieldName);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFormField(field);
  }
  getErrorMessageFormField(field: UntypedFormControl): string {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Campo deve ter no máximo de ${requiredLength} `;
    }
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Campo deve ter no mínimo de ${requiredLength} `;
    }
    return 'Compo Inválido';
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(
      fieldName
    ) as UntypedFormControl;
    return this.getErrorMessageFormField(field);
  }

  isFormArrayRequiredLesson(
    formGroup: UntypedFormGroup,
    formArrayName: string
  ): boolean {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return  !formArray.valid && formArray.touched;
  }
}
