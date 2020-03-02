class GameStage extends createjs.Stage {
    constructor(canvas_name) {
        super(canvas_name);

        this.camera = { x: 0, y: 0, w: 0, h: 0 };
        this.cameraTarget = null;

        this.on('tick', this.everyFrame, this);
    }

    everyFrame() {

        this.sortChildren(this.ySortFunction);
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

    layerSortFunction(obj1, obj2, options) {
        if (obj1.layer < obj2.layer) { return 1; }
        if (obj1.layer > obj2.layer) { return -1; }
        return 0;
    }

    ySortFunction(obj1, obj2, options) {
        let xy1 = obj1.collisionCenter;
        let xy2 = obj2.collisionCenter;
        if (xy1 && xy2) {
            if (xy1.y > xy2.y) { return 1; }
            if (xy1.y < xy2.y) { return -1; }
        }
        return 0;
    }

}
