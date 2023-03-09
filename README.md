# Control Operators

RxJS operators for Angular form controls that simply adding side-effects to reactive forms.

## Installation

For **Angular 14-15**, use the latest version of the package from npm. This will include type support.
```sh
npm install ngx-control-operators
```

For **Angular 12 to 14**, use version 1 explicitly when installing. This version does not include type support.
```sh
npm install ngx-control-operators@1
```

Both versions are supported as of March 2023 and features from the latest version will be backported to the 1.x branch.

## Usage

Use it like the `rxjs/operators` package, just import the operator you want and use it in a pipe.

```ts
import { disableControl } from "ngx-control-operators"

this.guestCount.valueChanges.pipe(
    map((val) => val < 10),
    disableControl(this.largePartyOptions)
).subscribe()

```


# Operators

## enableControl / disableControl

[enableControl]: #enablecontrol--disablecontrol
[disableControl]: #enablecontrol--disablecontrol
[tap]: https://rxjs.dev/api/operators/tap

Enables or disables a FormControl whenever the source observable emits something truthy. Re-emits the value untouched, just like [tap].

### Example

```ts
import { Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import { disableControl } from "ngx-control-operators";

const control = new FormControl("");
const whetherToDisable = new Subject<boolean>();

whetherToDisable.pipe(
    disableControl(control)
).subscribe();

console.log(control.disabled); // false
whetherToDisable.next(true);
console.log(control.disabled); // true
```

## applyValidators

[applyValidators]: #applyvalidators
[enforce]: #applyvalidators
[addValidators]: https://angular.io/api/forms/AbstractControl#addValidators
[removeValidators]: https://angular.io/api/forms/AbstractControl#removeValidators

Whenever the source observable emits something truthy, add the given validators to the given control. When it emits falsy, remove them. Works with the same rules as [addValidators]/[removeValidators].

This method used to be called `enforce`, either works.

### Example

```ts
import { Subject } from "rxjs";
import { applyValidators } from "ngx-control-operators";
import { FormControl, Validators } from "@angular/forms";

const control = new FormControl("");
const whetherToApply = new Subject<boolean>();

whetherToApply.pipe(
    applyValidators(control, [Validators.required])
).subscribe()

console.log(control.valid); // true
whetherToApply.next(true);
control.updateValueAndValidity();
console.log(control.valid); // false
```

### Validator Fighting

Because [addValidators] and [removeValidators] work by reference, using [applyValidators] with the *same validator* reference on the *same control* can cause unexpected behavior.

```ts
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { applyValidators } from "ngx-control-operators";
import { FormControl, Validators } from "@angular/forms";

const control = new FormControl("");
const whetherToApply = new Subject<boolean>();

whetherToApply.pipe( // required if true
    applyValidators(control, [Validators.required])
).subscribe()

whetherToApply.pipe( // required if false
    map(value => !value),
    applyValidators(control, [Validators.required])
).subscribe()

console.log(control.valid); // true
whetherToApply.next(true);
// first pipe adds Validators.required
// second pipe gets false and removes Validators.required
control.updateValueAndValidity();
console.log(control.valid); // true
```

If a validator relies on multiple conditions, combine them into one observable so they don't race.

```ts
const control = new FormControl("");

const conditionA = new Subject<boolean>();
const conditionB = conditionA.pipe(
    map(value => !value)
);

combineLatest([conditionA, conditionB]).pipe(
    map(([a, b]) => a || b),
    applyValidators(control, [Validators.required])
).subscribe()

console.log(control.valid); // true
conditionA.next(true);
control.updateValueAndValidity();
console.log(control.valid); // false
```

## validValues

[validValues]: #validvalues
[valueChanges]: https://angular.io/api/forms/AbstractControl#valueChanges

Creates an observable of all valid [valueChanges] from the given control.

### Example

```ts
import { FormControl, Validators } from "@angular/forms";
import { validValues } from "ngx-control-operators";

const control = new FormControl<string|null>(null, {validators: [Validators.required]});

validValues(control).subscribe(console.log);

control.setValue("");         // (no log)
console.log(control.valid)    // false
control.setValue("something") // "something"
console.log(control.valid)    // true
control.setValue("");         // (no log)
```

