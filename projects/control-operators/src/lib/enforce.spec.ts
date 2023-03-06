import { UntypedFormControl, ValidatorFn, Validators } from "@angular/forms";
import { of, Subject } from "rxjs";
import { enforce } from "./enforce";

describe('enforce', () => {
    it('should apply validators when source emits truthy', () => {
        const control = new UntypedFormControl(null);
        of("truthy").pipe(enforce(control, [Validators.nullValidator])).subscribe();
        expect(control.hasValidator(Validators.nullValidator)).toBeTrue();
    })

    it('should remove validators after source emits falsey later', () => {
        const control = new UntypedFormControl(null);
        const source = new Subject<any>();
        const parameterized = (): ValidatorFn => (control) => null; // this is redundant but we check it anyway.
        const parameterized_instance = parameterized(); // if it fails, you have seriously broken something.
        source.pipe(enforce(control, [Validators.nullValidator, parameterized_instance])).subscribe();
        source.next("truthy");
        expect(control.hasValidator(Validators.nullValidator)).toBeTrue();
        expect(control.hasValidator(parameterized_instance)).withContext("identity check").toBeTrue();
        source.next(undefined);
        expect(control.hasValidator(Validators.nullValidator)).toBeFalse();
        expect(control.hasValidator(parameterized_instance)).withContext("identity check").toBeFalse();
    })
})
