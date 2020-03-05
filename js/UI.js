class TextWindow {
    constructor(w, h) {

        this.visible = false;

        let shape = new createjs.Shape();
        shape.graphics.beginFill('white');
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

class UIManager {
    constructor() {

    }

    startConversation() {

    }
}