import { enforce, applyValidators } from "../public-api";

describe("ngx-control-operators", () => {
    it("should provide an alias to 'enforce' called 'applyValidators'", () => {
        expect(applyValidators).toEqual(enforce)
    })
});
