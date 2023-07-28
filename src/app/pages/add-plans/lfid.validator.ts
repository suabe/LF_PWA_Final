import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ValidatorFn, FormGroup } from '@angular/forms';
  

//   export class LfidValidator {
//       static createValidator(dataServive: DataUsuarioService): AsyncValidatorFn {
//           return (control: AbstractControl): Observable<ValidationErrors> => {                            
//               return dataServive.checkLfIdExists(control.value).pipe(
//                   first(),map(user => user ?{ lfidExists: true }: null)
//               )
              
//           }
//       }
//   }

  export class PlanesValid {
    public atLeastOneValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

        let controls = control.controls;
        console.log(controls);
        if (controls) {
          let theOne = Object.keys(controls).findIndex(key => controls[key].value !== '');
          if (theOne === -1) {
            console.log(theOne);
            return {
              atLeastOneRequired: {
                text: 'At least one should be selected'
              }
            }
          }
        };
    
      }
  }