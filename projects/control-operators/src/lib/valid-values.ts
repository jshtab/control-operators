import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Return observable containing only valid values from the given control.
 * @param control target control
 * @returns changes in value which are valid
 */
export function validValues(control: AbstractControl): Observable<any> {
    return control.valueChanges.pipe(
        filter(_ => control.status == 'VALID')
    )
}
