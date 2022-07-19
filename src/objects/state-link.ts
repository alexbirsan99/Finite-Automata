import State from "./state";


export default class StateLink {

    fromState: State;

    toState: State;

    p5: any;

    arrowSize = 25;

    fontSize = 26;

    selfLink:boolean;

    linkName: string;

    curved:boolean;

    TEXT_SIZE:number = 20;

    constructor(p5: any, fromState: State, toState: State, linkName: string) {
        this.fromState = fromState;
        this.toState = toState;
        this.p5 = p5;
        this.linkName = linkName;
        this.selfLink = toState === fromState;
        this.curved = this.toState.getNumberOfLinkLine() >= 1;
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
            y: 0 + this.arrowSize / 2.5
        };

        let arrowSecondPointCoord = {
            x: 0 - this.arrowSize / 2,
            y: 0 - this.arrowSize / 2.5
        }
        let arrowThirdPointCoord = {
            x: 0,
            y: 0
        }

        return [
            // creare linie
            this.p5.strokeWeight(2),
            this.curved === false && this.selfLink === false ?
                this.buildLine(fromStateCoords, toStateCoords, arrowFirstPointCoord, arrowSecondPointCoord, arrowThirdPointCoord) :
                this.buildCurve(fromStateCoords, toStateCoords, arrowFirstPointCoord, arrowSecondPointCoord, arrowThirdPointCoord),
            this.p5.strokeWeight(1),
        ];
    }

    calculateAngleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    buildLine(fromStateCoords: any, toStateCoords: any, arrowFirstPointCoord: any, arrowSecondPointCoord: any, arrowThirdPointCoord: any) {
        const theta = this.calculateAngleBetweenTwoPoints(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y);

        return [

            this.p5.line(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y),


            // creare arrow si colorarea cu negru a acesteia
            this.p5.fill('black'),

            // transpunere punct de rotatie
            this.p5.push(),
            this.p5.translate((toStateCoords.x + fromStateCoords.x) / 2, (toStateCoords.y + fromStateCoords.y) / 2),

            // nume state link
            this.p5.strokeWeight(0),
            this.p5.fill('black'),

            // rotire varf sageata
            this.p5.rotate(theta),

            // nume state
            this.p5.textSize(this.TEXT_SIZE),
            this.p5.text(this.linkName, -this.TEXT_SIZE / 2, -this.arrowSize),


            // creare varful sagetii
            this.p5.fill('#adb5bd'),
            this.p5.strokeWeight(2),
            this.p5.stroke('#6c757d'),
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.noFill(),
            this.p5.pop(),
            this.p5.noFill()
        ]
    }


    buildCurve(fromStateCoords: any, toStateCoords: any, arrowFirstPointCoord: any, arrowSecondPointCoord: any, arrowThirdPointCoord: any) {
        const theta = this.calculateAngleBetweenTwoPoints(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y);

        let distance, firstControlPoint, arrowCenter, curve, curveCenter;

        // verificam daca state-ul are legatura cu el insusi
        if (this.selfLink) {

            // variabile pentru cazul in care state-ul are legatura cu el insusi

            distance = 100; // diametrul folosit

            curveCenter = {
                x: (fromStateCoords.x + toStateCoords.x) / 2,
                y: fromStateCoords.y + distance
            };

            firstControlPoint = {
                x: curveCenter.x,
                y: curveCenter.y
            };
            arrowCenter = {
                x: 5,
                y: -2 * Math.sin(Math.PI / 2)
            };
            curve = [
                this.p5.push(),
                this.p5.translate(curveCenter.x, curveCenter.y),
                this.p5.ellipse(0, -(distance / 2), distance / 1.7, distance),
                this.p5.pop(),
            ];

        } else {

            // variabile pentru cazul in care state-ul n-are legatura cu el insusi

            distance = this.p5.dist(fromStateCoords.x, fromStateCoords.y, toStateCoords.x, toStateCoords.y); // diametrul arcului

            let distanceScaleDownFactor = 4;

            let arcDiameter = distance - (0.8 * this.toState.diamater);

            curveCenter = {
                x: (fromStateCoords.x + toStateCoords.x) / 2,
                y: (fromStateCoords.y + toStateCoords.y) / 2
            };

            firstControlPoint = {
                x: curveCenter.x + this.arrowSize / 2,
                y: curveCenter.y
            };

            arrowCenter = {
                x: arcDiameter / 2 * Math.cos(Math.PI / 2),
                y: -(arcDiameter / distanceScaleDownFactor) / 2 * Math.sin(Math.PI / 2)
            };

            curve = [
                this.p5.push(),
                this.p5.translate(curveCenter.x, curveCenter.y),
                this.p5.rotate(theta),
                //this.p5.arc(0, 0, diameter, diameter / diameterScaleDownFactor, Math.PI, 2 * Math.PI),
                this.p5.arc(0, 0, arcDiameter, arcDiameter / distanceScaleDownFactor, Math.PI, 2 * Math.PI),
                this.p5.pop(),
            ];

        }


        arrowFirstPointCoord.x = arrowCenter.x + arrowFirstPointCoord.x;
        arrowFirstPointCoord.y = arrowCenter.y + arrowFirstPointCoord.y;

        arrowSecondPointCoord.x = arrowCenter.x + arrowSecondPointCoord.x;
        arrowSecondPointCoord.y = arrowCenter.y + arrowSecondPointCoord.y;

        arrowThirdPointCoord.x = arrowCenter.x + arrowThirdPointCoord.x;
        arrowThirdPointCoord.y = arrowCenter.y + arrowThirdPointCoord.y;

        return [

            /*this.p5.push(),
            this.p5.translate(firstControlPoint.x, firstControlPoint.y),
            this.p5.rotate(theta),
            this.p5.ellipse(0, 0, diameter, 80),
            this.p5.point(80 * Math.cos(Math.PI / 2), -80 * Math.sin(Math.PI/2)),
            this.p5.pop(),*/

            curve,


            this.p5.push(),
            this.p5.translate(curveCenter.x, curveCenter.y),
            this.p5.rotate(theta),
            this.p5.fill('#adb5bd'),
            this.p5.strokeWeight(2),
            this.p5.stroke('#6c757d'),
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.noFill(),

            // nume state link
            this.p5.strokeWeight(0),
            this.p5.fill('black'),
            this.p5.textSize(this.TEXT_SIZE),
            this.p5.text(this.linkName, -this.TEXT_SIZE / 2, arrowCenter.y - this.arrowSize),
            this.p5.pop()
        ]
    }
}