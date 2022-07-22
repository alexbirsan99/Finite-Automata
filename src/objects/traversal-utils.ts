import State from "./state";

export abstract class TraversalUtils {

    static #currentTraversedState:State;

    public static setCurrentTraversedState(traversedState:State) {
        this.#currentTraversedState = traversedState;
    }


    public static clearCurrentTraversedState() {
        this.#currentTraversedState = null as unknown as State;
    }

    public static getCurrentTraversedState():State {
        return this.#currentTraversedState;
    }

}