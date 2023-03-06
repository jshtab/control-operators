import { AbstractControl } from "@angular/forms";
import { MonoTypeOperatorFunction } from "rxjs";
import { tap } from "rxjs/operators";


/**
 * Enables control for every truthy value, disables it otherwise.
 * @see {@link disableControl} for inverse
 * @param control - target to enable or disable
 * @param opts - enable/disable options
 * @returns operator function
 */
export function enableControl(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<any> {
    return input => input.pipe(
        tap(active => active ? control.enable(opts) : control.disable(opts)),
    )
}

/**
 * Disables control for every truthy value, enables it otherwise.
 * @see {@link enableControl} for inverse
 * @param control - target to enable or disable
 * @param opts - enable/disable options
 * @returns operator function
 */
export function disableControl(control: AbstractControl, opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
}): MonoTypeOperatorFunction<any> {
    return input => input.pipe(
        tap(active => active ? control.disable(opts) : control.enable(opts)),
    )
}
