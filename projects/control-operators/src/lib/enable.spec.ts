import { UntypedFormControl } from "@angular/forms";
import { of } from "rxjs";
import { disableControl, enableControl } from "./enable";

describe('enableControl', () => {
    it('should enable the control when source emits truthy', () => {
        const control = new UntypedFormControl({value: null, disabled: true});
        expect(control.enabled).toBeFalse();
        of("truthy").pipe(enableControl(control)).subscribe();
        expect(control.enabled).toBeTrue();
    })

    it('should disable the control when source emits falsey', () => {
        const control = new UntypedFormControl();
        of(undefined).pipe(enableControl(control)).subscribe();
        expect(control.enabled).toBeFalse();
    })
})

describe('disableControl', () => {
    it('should disable the control when source emits truthy', () => {
        const control = new UntypedFormControl();
        of("truthy").pipe(disableControl(control)).subscribe();
        expect(control.enabled).toBeFalse();
    })

    it('should enable the control when source emits falsey', () => {
        const control = new UntypedFormControl({value: null, disabled: true});
        expect(control.enabled).toBeFalse();
        of(undefined).pipe(disableControl(control)).subscribe();
        expect(control.enabled).toBeTrue();
    })
})
