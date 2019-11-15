//Index
//AlphaNumericWithWhiteSpace
//AlphaNumericWithOutWhiteSpace
//AlphaWithWhiteSpace
//AlphaWithOutWhiteSpace
//ToUpperCase --> Transform text (Like a "pipe")
//ToLowerCase --> Transform text (Like a "pipe")
//AlphaNumericWithOutWhiteSpaceWithCharacters
//WithOutWhiteSpaceInBeginFinal
//IsNullorEmpty
//MatchPassword
//MaxLength
//Numeric
//ValidPasswordCharacters
//WithOutWhiteSpace
//EmailFormat
//AlphaNumericWithWhiteSpaceAmpersand
//AgeMin (15)
//NumberPhone (Colombian : Starts with 3)
//MoreThanZero

import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup, Validators } from '@angular/forms';

export class CustomValidators {

  static AlphaNumericWithWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]*/g, ''));
      return null;
    }
  }

  static AlphaNumericWithOutWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]*/g, ''));
      return null;
    }
  }

  static AlphaWithWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ ]*/g, ''));
      return null;
    }
  }

  static AlphaWithOutWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]*/g, ''));
      return null;
    }
  }

  static ToUpperCase(control: AbstractControl) {
    if (control.value && (/[a-zñáéíóú]/.test(control.value))) {
      control.setValue(control.value.toUpperCase());
    }
    return null;
  }

  static ToLowerCase(control: AbstractControl) {
    if (control.value && (/[A-ZÑÁÉÍÓÚ]/.test(control.value))) {
      control.setValue(control.value.toLowerCase());
    }
    return null;
  }

  static AlphaNumericWithOutWhiteSpaceWithCharacters(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ@&.0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ@&.0-9]*/g, ''));
      return null;
    }
  }

  static WithOutWhiteSpaceInBeginFinal(control: AbstractControl) {
    if ((/[^a-zA-ZñÑ&áéíóúÁÉÍÓÚ ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-Z&ñÑáéíóúÁÉÍÓÚ ]*/g, ''));
      return null;
    } else if (/^\s/.test(control.value) &&
      control.value != null &&
      control.value !== undefined &&
      control.value !== 'undefined' &&
      control.value !== '') {
      console.log('tiene espacio adelante');
      control.setValue(control.value.trim());
      return null;
    }
  }

  static IsNullorEmpty(control: AbstractControl) {
    if (
      control.value === null ||
      control.value === undefined ||
      control.value === 'undefined' ||
      control.value === ''
    ) {
      return { required: true };
    } else {
      return null;
    }
  }

  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }

  static MaxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      if (length > maxLength) {
        control.setValue(control.value.slice(0, maxLength));
      }
      return null;
    };
  }

  static Numeric(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((/[^0-9]/.test(control.value))) {
      control.setValue(control.value.toString().replace(/[^0-9]*/g, ''));
      return null;
    }
  }

  static ValidPasswordCharacters(control: AbstractControl) {

    if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(control.value))) {
      return null;
    } else {
      return { invalidPasswordCharacters: 'invalidPasswordCharacters' };
    }
  }

  static WithOutWhiteSpace(control: AbstractControl) {
    if ((/^\s/.test(control.value))) {
      control.setValue(control.value.replace(/^\s/g, ''));
      return null;
    }
  }

  static EmailFormat(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(control.value))) {
      return { requiredEmailFormat: true };
    }
  }

  static AlphaNumericWithWhiteSpaceAmpersand(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9& ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9& ]*/g, ''));
      return null;
    }
  }

  static AgeMin(control: AbstractControl) {
    if (control.value !== undefined) {
      const yearOn = new Date().getFullYear();
      const age = yearOn - new Date(control.value).getFullYear();
      if (age < 15) {
        return { datefailMin: true };
      } else if (age >= 100 || age < 0) {
        return { datefailMax: true };
      } else {
        return null;
      }
    }
  }

  static AgeMaxPAC(ageMinSons: number, ageMinParents: number, dateAffiliateYear: number, fb: FormGroup) {
    const typeRel = fb.get('createRelationship');
    const controlBirthdate = fb.get('createBirthdate');
    if (typeRel.value !== undefined && controlBirthdate.value !== undefined) {
      const yearOn = new Date().getFullYear();
      const age = yearOn - new Date(controlBirthdate.value).getFullYear();
      if (dateAffiliateYear !== undefined && ['HJ', 'PD'].includes(typeRel.value)) {
        const ageAffiliate = yearOn - dateAffiliateYear;
        const differenceAge = ageAffiliate - age;
        if (differenceAge < 15) {
          controlBirthdate.setErrors({ datefailAffiliate: true });
        }
      }
      if (['HJ', 'HT', 'HM'].includes(typeRel.value)) {
        if (age >= ageMinSons || age < 0) {
          controlBirthdate.setErrors({ datefailMax: true });
        }
      } else if (['PD', 'MD'].includes(typeRel.value)) {
        if (age < ageMinParents || age < 0) {
          controlBirthdate.setErrors({ datefailMaxParents: true });
        }
      } else {
        return null;
      }
    }
  }

  static LengthByTypeDoc(typeField: string, fb: FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const typeDoc = fb.get(typeField);
      if (typeDoc.value === 'CO1E') {
        control.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(15),
          CustomValidators.AlphaNumericWithOutWhiteSpace,
          CustomValidators.LengthByTypeDoc(typeField, fb)]);
      } else if (typeDoc.value === 'CO1V') {
        control.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(18), CustomValidators.Numeric,
          CustomValidators.LengthByTypeDoc(typeField, fb)]);
      } else if (typeDoc.value === 'CO1C' || typeDoc.value === 'CO1T' || typeDoc.value === 'CO1L') {
        control.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(10), CustomValidators.Numeric,
          CustomValidators.LengthByTypeDoc(typeField, fb)]);
      } else if (typeDoc.value === 'CO1P') {
        control.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(15),
          CustomValidators.AlphaNumericWithOutWhiteSpace, 
          CustomValidators.LengthByTypeDoc(typeField, fb)]);
      } else if (typeDoc.value === 'CO1N') {
        control.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidators.Numeric,
          CustomValidators.LengthByTypeDoc(typeField, fb)]);
      } else {
        control.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(13), CustomValidators.Numeric,
          CustomValidators.LengthByTypeDoc(typeField, fb)]);
      }
      return null;
    };
  }

  static ValidateisWorkedAnotherCompany(typeField: string, numberField: string, fb: FormGroup) {
    const isWorkedInAnotherCompany = fb.get('WorkedInAnotherCompany');
    const typeDoc = fb.get(typeField);
    const numberDoc = fb.get(numberField);

    if (isWorkedInAnotherCompany.value === '0') {
      numberDoc.clearValidators();
      numberDoc.reset();
    } else if (isWorkedInAnotherCompany.value === '1') {
      if (typeDoc.value === 'CO1E' || typeDoc.value === 'CO1P') {
        numberDoc.setValidators([Validators.required,
          Validators.minLength(3), Validators.maxLength(18), CustomValidators.AlphaNumericWithOutWhiteSpace]);
      } else if (typeDoc.value === 'CO1V') {
        numberDoc.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(18), CustomValidators.Numeric]);
      } else {
        numberDoc.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(13), CustomValidators.Numeric]);
      }
    }
  }

  static NumberPhone(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (control.value.length === 1) {
      if (control.value !== '3') {
        control.setValue('');
        return null;
      }
    } else {
      if (control.value.length === 10) {
        if (!(/^3[0-9]\d{8}$/.test(control.value))) {
          control.setValue('');
          return null;
        }
      } else if (control.value.length === 4) {
        if (control.value.substr(3, 1) === '0') {
          control.setValue(control.value.substr(0, 3));
          return null;
        }
      }
    }
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((/[^0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^0-9]*/g, ''));
      return null;
    }
  }

  static MoreThanZero(control: AbstractControl) {
    if (control.value === '0') {
      control.setValue('');
      return null;
    }
  }

}
