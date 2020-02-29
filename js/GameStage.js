class GameStage extends createjs.Stage {
    constructor(canvas_name) {
    super(canvas_name);

    this.on('tick', this.everyFrame, this);
    }

    everyFrame(){
    
    this.collisionObserve();
    this.sortChildren(this.layerSortFunction);
    
    }

    collisionObserve() {
    for(let i=0; i<this.children.length; i++){
        if(this.children[i].isMoveObject != true){
        continue;
        }
        for(let j=i+1; j<this.children.length; j++){
        if(this.children[j].isMoveObject != true){
            continue;
        }
        let obj1_col = Func.convert_col_rect(this.children[i]);
        let obj2_col = Func.convert_col_rect(this.children[j]);
        if(Func.check_collision(obj1_col, obj2_col)){
            console.log("collision.");
            if(this.children[i].stable==false){
            this.children[i].slide_collision(obj2_col);
            }
            if(this.children[j].stable==false){
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