import {
    AbstractControl,
    FormArray,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export class FormUtils {
    static getTextError(errors: ValidationErrors): string | null {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Campo obligatorio';
                case 'pattern':
                    return 'Debe incluir mayúscula, minúscula y un número o símbolo (no iniciar con .)';
                case 'usernameTaken':
                    return 'Nombre de usuario no disponible';
                case 'emailTaken':
                    return 'Email no disponible';
            }
        }
        return null;
    }

    static isFieldEqualToOther(field: string, field2: string, error: string) {
        return (formGroup: AbstractControl) => {
            const fieldVal = formGroup.get(field)?.value;
            const field2Val = formGroup.get(field2)?.value;

            return fieldVal === field2Val ? null : { [error]: true };
        };
    }

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return (
            !!form.controls[fieldName].errors &&
            form.controls[fieldName].touched
        );
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null;

        const errors = form.controls[fieldName].errors ?? {};
        return this.getTextError(errors);
    }

    static isValidFieldInArray(formArray: FormArray, index: number) {
        return (
            !!formArray.controls[index].errors &&
            formArray.controls[index].touched
        );
    }

    static getFieldErrorInArray(
        formArray: FormArray,
        index: number
    ): string | null {
        if (formArray.controls.length == 0 || !formArray.controls[index])
            return null;

        const errors = formArray.controls[index].errors ?? {};
        return this.getTextError(errors);
    }

    static isRequiredField(form: FormGroup, fieldName: string): boolean {
        const control = form.controls[fieldName];
        const validator = control?.validator
            ? control.validator({} as AbstractControl)
            : {};
        return validator && validator?.['required'];
    }

    static getRequiredAsterisk(form: FormGroup, fieldName: string): string {
        return this.isRequiredField(form, fieldName) ? '*' : '';
    }
}
