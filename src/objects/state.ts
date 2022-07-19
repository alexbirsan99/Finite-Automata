import { Colors } from "./colors";
import StateLink from "./state-link";


export default class State {

    diamater: number = 90;

    x: number;

    y: number;

    links: StateLink[] = [];

    isInitialState: boolean;

    isFinalState: boolean;

    circle: any;

    stateName: string;

    p5: any;

    arrowSize = 15;

    color:any = Colors.WHITE;

    constructor(p5: any, x: number, y: number, stateName: string, isInitialState: boolean, isFinalState: boolean) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.stateName = stateName;
        this.isInitialState = isInitialState;
        this.isFinalState = isFinalState;
    }

    draw() {

        return [

            // desenarea state-ului
            this.p5.fill(this.color), 
            this.p5.stroke(Colors.BLACK),
            this.p5.strokeWeight(2),
            this.p5.circle(this.x, this.y, this.diamater),

            // daca e stare initiala sau finala, traseaza un cerc concentric
            this.isInitialState || this.isFinalState ? this.p5.circle(this.x, this.y, this.diamater / 1.2) : null,

            // daca este stare initiala, trasam indicatorul
            this.isInitialState ? this.buildInitialStateIndicator() : null,

            // trasarea textului
            this.p5.strokeWeight(1),
            this.p5.textSize(32),
            this.p5.fill(Colors.BLACK),
            this.p5.text('q', this.x - 16, this.y + 10),
            this.p5.textSize(16),
            this.p5.text(this.stateName, this.x + 4, this.y + 16),
            this.p5.noFill(),
        ];
    }

    // verificare daca mouse-ul e deasupra state-ului
    private isAbove(mouseX: number, mouseY: number) {
        return (
            mouseX > this.x - this.diamater / 2 &&
            mouseX < this.x + this.diamater / 2 &&
            mouseY > this.y - this.diamater / 2 &&
            mouseY < this.y + this.diamater / 2
        );
    }

    private buildInitialStateIndicator() {
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
            this.p5.fill(Colors.BLACK),

            // creare varful sagetii
            this.p5.triangle(arrowFirstPointCoord.x, arrowFirstPointCoord.y, arrowSecondPointCoord.x, arrowSecondPointCoord.y, arrowThirdPointCoord.x, arrowThirdPointCoord.y),
            this.p5.noFill(),
        ]
    }

    public getNumberOfLinkLine(): number {
        let numberOfLinkLines = 0;
        for (let i = 0; i < this.links.length; i++) {
            if (!this.links[i].curved && !this.links[i].selfLink) {
                numberOfLinkLines++;
            }
        }
        return numberOfLinkLines;
    }

    public onClick() {
        if(this.isAbove(this.p5.mouseX, this.p5.mouseY)) {
            this.color = Colors.GREEN;
        }
    }

    public onDrag() {
        if(this.isAbove(this.p5.mouseX, this.p5.mouseY)) {
            this.x = this.p5.mouseX;
            this.y = this.p5.mouseY;
        } else {
            this.color = Colors.WHITE;
        }
    }

    public onRelease() {
        if(this.isAbove(this.p5.mouseX, this.p5.mouseY)) {
            this.color = Colors.WHITE;
        }
    }
}