import State from "./state";
import StateLink from "./state-link";


export abstract class Utils {

    static MAXIMUM_LINKS = 6;

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

    public static generateLinks(states: State[], p5:any): StateLink[] {
        var stateLinks:StateLink[] = [];
        var statesShuffled:State[] = this.shuffle(states); 
        for(let i = 0; i < states.length; i++) {
            /**
             * TODO
             * noOfLinks poate sa fie mai mare decat numarul de state-uri disponibile - gresit
             * trebuie facuta o functie pentru care sa calculeze state-urile disponibile
             * daca e mai mica decat MAXIMUM_LINKS, atunci nr de state-uri disponibile, va fi noul numar de state-uri maxime
             * cand calculam nr de state-uri disponibile, luam in calcul si state-ul insusi
             */
            let numberOfPossibleLinks = states.length - states[i].noLinksExit;
            let maximumLinks = numberOfPossibleLinks < this.MAXIMUM_LINKS ? numberOfPossibleLinks + 1 : this.MAXIMUM_LINKS;
            let noOfLinks = Math.floor(this.clampNumber(Math.random() * maximumLinks, 2, maximumLinks - 1))
            for(let j = 0; j < noOfLinks; j++) {
                let toStateIndex = Math.floor(Math.random() * statesShuffled.length);
                let newStateLink = new StateLink(p5, states[i], statesShuffled[toStateIndex], j % 2 === 0 ? 'a' : 'b');
                if(!this.stateLinkExists(stateLinks, newStateLink)) {
                    stateLinks.push(newStateLink);
                } else {
                    j--;
                }
            }
        }
        console.log(stateLinks);
        return stateLinks;
    }

    public static stateLinkExists(stateLinks:StateLink[], stateLink:StateLink) {
        for(let i = 0; i < stateLinks.length; i++) {
            if(stateLinks[i].fromState === stateLink.fromState && stateLinks[i].toState === stateLink.toState) {
                console.log(stateLinks[i]);
                console.log(stateLink);
                return true;
            }
        }
        return false;
    }

    public static generateStates(noOfStates:number, p5Var:any): State[] {
        var states:State[] = [];
        for (let i = 0; i < noOfStates; i++) {
            states.push(new State(p5Var, 300 + (200 * i), 200, i.toString(), i === 0, i === noOfStates - 1));
        }
        return states;
    }

}