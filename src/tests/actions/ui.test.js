import {
    finishLoading,
    removeError,
    setError,
    startLoading
} from "../../actions/ui";

import {types} from "../../types/types";

describe("Testing ui actions", () => {
    test("All the actions should work correctly", () => {
        const action = setError("help!!");
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(action).toEqual({
            type: types.uiSetError,
            payload: "help!!"
        });

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });

        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });

        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
    });
});
