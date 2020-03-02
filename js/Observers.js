class CollisionObserver extends createjs.Container {
    constructor(stage) {
        super();

        this.objArray = stage.children;

        this.on('tick', this.everyFrame, this);
    }

    everyFrame() {

        this.collisionObserve(this.objArray);

    }

    collisionObserve(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].isMoveObject != true) {
                continue;
            }
            for (let j = i + 1; j < array.length; j++) {
                if (array[j].isMoveObject != true) {
                    continue;
                }
                let obj1_col = Func.convert_col_rect(array[i]);
                let obj2_col = Func.convert_col_rect(array[j]);
                if (Func.check_collision(obj1_col, obj2_col)) {
                    //console.log("collision.");
                    if (array[i].stable == false) {
                        array[i].slide_collision(obj2_col);
                        array[i].on_collision(array[j]);
                    }
                    if (array[j].stable == false) {
                        array[j].slide_collision(obj1_col);
                        array[j].on_collision(array[i]);
                    }

                }
            }
        }
    }
}