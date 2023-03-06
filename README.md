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
