import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { MonoTypeOperatorFunction } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * Applies validators to a control for each truthy emission, removes them otherwise.
 * 
 * This operator works by reference. When targeting the same control in different pipes
 * with identical validators, if one pipe is true and the other is false, then the
 * operator functions will race, leading to unexpected behavior.
 * 
 * This is mitigated by wrapping your validators in a {@link Validators.compose},
 * with a drawback: {@link AbstractControl.hasValidator} won't work as expected.
 *  
 * @param control - target to apply validators
 * @param validators - the validator functions to apply/remove
 * @returns operator function
 */
export function enforce(control: AbstractControl, validators: ValidatorFn[]): MonoTypeOperatorFunction<any> {
    return input => input.pipe(
        tap(active => active ? control.addValidators(validators) : control.removeValidators(validators)),
    )
}
