import { UntypedFormControl, ValidatorFn } from "@angular/forms";
import { validValues } from "./valid-values";


describe('validValues', () => {
    it('should only emit values when the form control is valid', () => {
        let valid = true;
        const validator: ValidatorFn = (control) => control.value == 'invalid value' ? {invalid: true} : null;
        const control = new UntypedFormControl("", {validators: [validator]});
        const spy = jasmine.createSpy('subscriber');
        validValues(control).subscribe(spy);
        
        control.setValue("valid value");
        expect(control.valid).withContext('test assumption').toBeTrue();
        expect(spy).toHaveBeenCalledWith("valid value");

        control.setValue("invalid value");
        expect(control.valid).withContext('test assumption').toBeFalse();
        expect(spy).not.toHaveBeenCalledWith("invalid value");
    })
})
