

export default class State {

    diamater:number = 90;

    x:number;

    y:number;

    collideOffset = 90;

    circle:any;

    stateName:string;

    p5:any;

    constructor(p5:any, x:number, y:number, stateName:string) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.stateName = stateName;
    }

    draw(color?:string) {
        return [
            //color ? [this.p5.stroke(color), this.p5.strokeWeight(3)] : [this.p5.stroke('black'), this.p5.strokeWeight(1)],
            color ? [this.p5.fill(color), this.p5.stroke(color)] : [this.p5.fill('white'), this.p5.stroke('black')],
            //this.p5.fill('white'),
            this.p5.strokeWeight(3),
            this.p5.circle(this.x,this.y, this.diamater),
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
    isAbove(mouseX:number, mouseY:number) {
        return (
            mouseX > this.x - this.diamater / 2 &&
            mouseX < this.x + this.diamater / 2 &&
            mouseY > this.y - this.diamater / 2 &&
            mouseY < this.y + this.diamater / 2 
        );
    }

}