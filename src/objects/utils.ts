import State from "./state";
import StateLink from "./state-link";


export abstract class Utils {

    private static selectedState:State;

    private static MAXIMUM_LINKS = 6;

    private static initialDrawCoordinates = {
        x:200,
        y:400
    }

    public static clampNumber(num:number, a:number, b:number) {
        return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    }

    public static shuffle(arr:any) {
        let currentIndex = arr.length;
        while(currentIndex !== 0) {
            let random = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            let aux = arr[currentIndex];
            arr[currentIndex] = arr[random];
            arr[random] = aux; 
        }
        return arr;
    }

    public static buildLinks(states: State[], p5:any) {
        var statesShuffled:State[] = this.shuffle(states); 
        for(let i = 0; i < states.length; i++) {
            /**
             * TODO
             * noOfLinks poate sa fie mai mare decat numarul de state-uri disponibile - gresit
             * trebuie facuta o functie pentru care sa calculeze state-urile disponibile
             * daca e mai mica decat MAXIMUM_LINKS, atunci nr de state-uri disponibile, va fi noul numar de state-uri maxime
             * cand calculam nr de state-uri disponibile, luam in calcul si state-ul insusi
             */
            let numberOfPossibleLinks = states.length - states[i].links.length;
            let maximumLinks = numberOfPossibleLinks < this.MAXIMUM_LINKS ? numberOfPossibleLinks + 1 : this.MAXIMUM_LINKS;
            let noOfLinks = Math.floor(this.clampNumber(Math.random() * maximumLinks, 2, maximumLinks - 1))
            for(let j = 0; j < noOfLinks; j++) {
                let toStateIndex = Math.floor(Math.random() * statesShuffled.length);
                let newStateLink = new StateLink(p5, states[i], statesShuffled[toStateIndex], j % 2 === 0 ? 'a' : 'b');
                if(!this.stateLinkExists(states, newStateLink)) {
                    states[i].links.push(newStateLink);
                } else {
                    j--;
                }
            }
        }
    }

    public static stateLinkExists(states:State[], stateLink:StateLink) {
        for(let i = 0; i < states.length; i++) {
            let stateLinks = states[i].links;
            for(let j = 0; j < stateLinks.length; j++) {
                if(stateLinks[j].fromState === stateLink.fromState && stateLinks[j].toState === stateLink.toState) {
                    return true;
                }
            }
        }
        return false;
    }

    public static generateStates(noOfStates:number, p5Var:any): State[] {
        var states:State[] = [];
        var drawCoordinates = JSON.parse(JSON.stringify(this.initialDrawCoordinates));
        for (let i = 0; i < noOfStates; i++) {
            drawCoordinates.x = this.initialDrawCoordinates.x + (200 * i);
            states.push(new State(p5Var, drawCoordinates.x, drawCoordinates.y, i.toString(), i === 0, i === noOfStates - 1));
        }
        return states;
    }

    public static calculateAngleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    public static setSelectedState(state:State) {
        this.selectedState = state;
    }

    public static clearSelectedState() {
        this.selectedState = null as unknown as State;
    }

    public static getSelectedState():State {
        return this.selectedState;
    }
}