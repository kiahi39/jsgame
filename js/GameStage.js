class GameStage extends createjs.Stage {
    constructor(canvas_name) {
        super(canvas_name);

        this.camera = { x: 0, y: 0, w: 0, h: 0 };
        this.cameraTarget = null;

        this.on('tick', this.everyFrame, this);
    }

    everyFrame() {

        this.collisionObserve();
        this.sortChildren(this.layerSortFunction);

        this.scrollCamera();

    }

    scrollCamera() {
        this.camera.w = this.parent.canvas.width;
        this.camera.h = this.parent.canvas.height;

        this.camera.x = lerp(this.camera.x, this.cameraTarget.x - this.camera.w / 2, 0.05);
        this.camera.y = lerp(this.camera.y, this.cameraTarget.y - this.camera.h / 2, 0.05);

        this.x = -1 * this.camera.x;
        this.y = -1 * this.camera.y;
    }

    collisionObserve() {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].isMoveObject != true) {
                continue;
            }
            for (let j = i + 1; j < this.children.length; j++) {
                if (this.children[j].isMoveObject != true) {
                    continue;
                }
                let obj1_col = Func.convert_col_rect(this.children[i]);
                let obj2_col = Func.convert_col_rect(this.children[j]);
                if (Func.check_collision(obj1_col, obj2_col)) {
                    console.log("collision.");
                    if (this.children[i].stable == false) {
                        this.children[i].slide_collision(obj2_col);
                    }
                    if (this.children[j].stable == false) {
                        this.children[j].slide_collision(obj1_col);
                    }
                    this.children[i].on_collision(this.children[j]);
                    this.children[j].on_collision(this.children[i]);
                }
            }
        }
    }

    layerSortFunction(obj1, obj2, options) {
        if (obj1.layer < obj2.layer) { return 1; }
        if (obj1.layer > obj2.layer) { return -1; }
        return 0;
    }

}