import { AbstractControl, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Return observable containing only valid values from the given control.
 * @param control target control
 * @returns changes in value which are valid
 */
export function validValues<T>(control: FormControl<T>): Observable<T>;
export function validValues<T>(control: AbstractControl<T>): Observable<T> {
    return control.valueChanges.pipe(
        filter(_ => control.status == 'VALID')
    )
}
