import State from "./state";


export default class StateLink {

    fromState:State;

    toState:State;

    p5:any;

    arrowSize = 20;

    constructor(p5:any, fromState:State, toState:State) {
        this.fromState = fromState;
        this.toState = toState;
        this.p5 = p5;
    }


    draw() {
        let fromStateCoords = {
            x: this.fromState.x + this.fromState.diamater / 2,
            y: this.fromState.y,
        };
        let toStateCoords = {
            x: this.toState.x - this.toState.diamater / 2,
            y: this.toState.y,
        };

        const theta = this.calculateAngleBetweenTwoPoints(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y);

        let arrowFirstPointCoord = {
            x: 0 - this.arrowSize / 2,
            y: 0 + this.arrowSize / 2
        };

        let arrowSecondPointCoord = {
            x: 0 - this.arrowSize / 2,
            y: 0 - this.arrowSize / 2
        }
        let arrowThirdPointCoord = {
            x: 0,
            y: 0
        }

        return [
            // creare arrow si colorarea cu negru a acesteia
            this.p5.fill('black'),
            this.p5.push(),
            // transpunere punct de rotatie
            this.p5.translate(toStateCoords.x, toStateCoords.y),
            // rotire varf sageata
            this.p5.rotate(theta),
            // creare varful sagetii
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.pop(),
            this.p5.noFill(),
            // creare linie
            this.p5.line(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y)
        ];
    }

    calculateAngleBetweenTwoPoints(x1:number,y1:number,x2:number,y2:number) {
        return Math.atan2(y2 - y1, x2 - x1);
    }
}