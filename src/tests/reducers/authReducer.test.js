import {authReducer} from "../../reducers/authReducer";
import {types} from "../../types/types";

describe("Testing authReducer", () => {
    test("should login correctly", () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: "abc",
                displayName: "Raul"
            }
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid: "abc",
            name: "Raul"
        });
    });

    test("should logout correctly", () => {
        const initState = {uid: "abc", displayName: "Raul"};
        const action = {
            type: types.logout
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({});
    });

    test("should return the initialState if the action doesn't exist", () => {
        const initState = {uid: "abc", displayName: "Raul"};
        const action = {
            type: "asdjfñlajs"
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
    });
});
