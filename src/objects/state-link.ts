import State from "./state";


export default class StateLink {

    fromState: State;

    toState: State;

    p5: any;

    arrowSize = 20;

    curved: boolean;

    constructor(p5: any, fromState: State, toState: State, curved: boolean) {
        this.fromState = fromState;
        this.toState = toState;
        this.p5 = p5;
        this.curved = curved;
    }


    draw() {
        let fromStateCoords = {
            x: this.fromState.x,
            y: this.fromState.y,
        };
        let toStateCoords = {
            x: this.toState.x,
            y: this.toState.y,
        };



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
            // creare linie
            this.p5.strokeWeight(3),
            this.curved === false ?
                this.buildLine(fromStateCoords, toStateCoords, arrowFirstPointCoord, arrowSecondPointCoord, arrowThirdPointCoord) :
                this.buildCurve(fromStateCoords, toStateCoords, arrowFirstPointCoord, arrowSecondPointCoord, arrowThirdPointCoord),
            this.p5.strokeWeight(1),
        ];
    }

    calculateAngleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    buildLine(fromStateCoords: any, toStateCoords: any, arrowFirstPointCoord:any, arrowSecondPointCoord:any, arrowThirdPointCoord:any) {
        const theta = this.calculateAngleBetweenTwoPoints(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y);

        return [            
            // creare arrow si colorarea cu negru a acesteia
            this.p5.fill('black'),
            // transpunere punct de rotatie
            this.p5.push(),
            this.p5.translate((toStateCoords.x + fromStateCoords.x) / 2, (toStateCoords.y + fromStateCoords.y) / 2),
            // rotire varf sageata
            this.p5.rotate(theta),
            // creare varful sagetii
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.pop(),



            this.p5.noFill(),
            this.p5.line(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y),
        ]
    }


    buildCurve(fromStateCoords: any, toStateCoords: any, arrowFirstPointCoord:any, arrowSecondPointCoord:any, arrowThirdPointCoord:any) {
        const theta = this.calculateAngleBetweenTwoPoints(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y);

        return [            
            // creare arrow si colorarea cu negru a acesteia
            this.p5.stroke('red'),
            this.p5.fill('red'),
            // transpunere punct de rotatie
            this.p5.push(),
            this.p5.translate((toStateCoords.x + fromStateCoords.x) / 2, (toStateCoords.y + fromStateCoords.y) / 2),
            // rotire varf sageata
            this.p5.rotate(theta),
            // creare varful sagetii
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.pop(),

            this.p5.line(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y),
            this.p5.noFill(),
            this.p5.stroke('black'),
        ]
    }
}