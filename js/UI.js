class TextWindow extends createjs.Container{
    constructor(w, h, x=0, y=0) {
        super();

        //this.visible = false;

        this.transfar(x,y);

        let shape = new createjs.Shape();
        shape.graphics.beginFill('blue');
        shape.graphics.drawRect(0, 0, w, h);
        this.addChild(shape);
        this.shape = shape;
    }
    transfar(x, y) {
        this.x = x;
        this.y = y;
    }
    setShape(w, h) {
        this.shape.graphics.drawRect(0, 0, w, h);
    }
    open() {
        this.visible = true;
    }
    close() {
        this.visible = false;
    }
}

class UIManager extends createjs.Container {
    constructor() {
        super();
        this.textWindow = [];

        // let shape = new createjs.Shape();
        // shape.graphics.beginFill('blue');
        // shape.graphics.drawRect(100, 0, 2000, 1000);
        // this.addChild(shape);
        // this.shape = shape;
    }

    startTalk(pos1) {
        console.log("startConversation");
        let tw = new TextWindow(120,60, pos1.x, pos1.y - 60);
        this.addChild(tw);
        this.textWindow.push(tw);

    }
}