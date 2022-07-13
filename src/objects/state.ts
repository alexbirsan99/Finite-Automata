

export default class State {

    diamater: number = 90;

    x: number;

    y: number;

    noLinksExit:number = 0;

    noLinksEnter:number = 0;

    isInitialState: boolean;

    isFinalState: boolean;

    collideOffset = 90;

    circle: any;

    stateName: string;

    p5: any;

    arrowSize = 15;

    constructor(p5: any, x: number, y: number, stateName: string, isInitialState: boolean, isFinalState: boolean) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.stateName = stateName;
        this.isInitialState = isInitialState;
        this.isFinalState = isFinalState;
    }

    draw(color?: string) {
        return [
            //color ? [this.p5.stroke(color), this.p5.strokeWeight(3)] : [this.p5.stroke('black'), this.p5.strokeWeight(1)],
            color ? [this.p5.fill(color), this.p5.stroke(color)] : [this.p5.fill('white'), this.p5.stroke('black')],
            //this.p5.fill('white'),
            this.p5.strokeWeight(2),
            this.p5.circle(this.x, this.y, this.diamater),

            // daca e stare initiala sau finala, traseaza un cerc dublu
            this.isInitialState || this.isFinalState ? this.p5.circle(this.x, this.y, this.diamater / 1.2) : null,

            // daca este stare initiala, trasam indicatorul
            this.isInitialState ? this.buildInitialStateIndicator() : null,

            this.p5.strokeWeight(1),
            this.p5.textSize(32),
            this.p5.fill('black'),
            this.p5.text('q', this.x - 16, this.y + 10),
            this.p5.textSize(16),
            this.p5.text(this.stateName, this.x + 4, this.y + 16),
            this.p5.noFill(),
        ];
    }

    // verificare daca mouse-ul e deasupra state-ului
    isAbove(mouseX: number, mouseY: number) {
        return (
            mouseX > this.x - this.diamater / 2 &&
            mouseX < this.x + this.diamater / 2 &&
            mouseY > this.y - this.diamater / 2 &&
            mouseY < this.y + this.diamater / 2
        );
    }



    calculateAngleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    buildInitialStateIndicator() {
        const length = 60;


        const indicatorStartCoords = {
            x: this.x - (this.diamater / 2),
            y: this.y
        }

        const indicatorEndCoords = {
            x: this.x - (this.diamater / 2) - length,
            y: this.y
        };


        let arrowFirstPointCoord = {
            x: indicatorStartCoords.x - this.arrowSize / 2,
            y: indicatorStartCoords.y + this.arrowSize / 2
        };

        let arrowSecondPointCoord = {
            x: indicatorStartCoords.x - this.arrowSize / 2,
            y: indicatorStartCoords.y - this.arrowSize / 2
        }
        let arrowThirdPointCoord = {
            x: indicatorStartCoords.x,
            y: indicatorStartCoords.y
        }

        return [

            this.p5.line(indicatorStartCoords.x, indicatorStartCoords.y, indicatorEndCoords.x, indicatorEndCoords.y),

            // creare arrow si colorarea cu negru a acesteia
            this.p5.fill('black'),
            // creare varful sagetii
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.noFill(),
        ]
    }
}