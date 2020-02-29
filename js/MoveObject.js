class MoveObject extends createjs.Container {
    constructor(w = 30, h = 30) {
        super();
        this.w = w;
        this.h = h;
        this.isMoveObject = true;
        this.speed = 3.0;
        this.vx = 0;
        this.vy = 0;
        this.dest_control = false;
        this.dest_x = 0;
        this.dest_y = 0;
        this.trigger = false; //当たり判定のみかどうか
        this.stable = true; //静止オブジェクトかどうか
        this.col_rect = { x: 0, y: 0, w: w, h: h }; //
        this.direction = "right";
        this.layer = 0;

        let shape = new createjs.Shape();
        shape.graphics.beginFill('white');
        shape.graphics.drawRect(0, 0, w, h);
        this.addChild(shape); // 表示リストに追加

        // メンバーフィールドに保存
        this.shape = shape;

        let data = {
            images: [],
            frames: { width: 0, height: 0 }
        };
        let ss = new createjs.SpriteSheet(data);
        this.sprite = new createjs.Sprite(ss);

        // 更新イベントを定義
        this.on('tick', this.update, this);
    }

    update() {
        if (this.dest_control == true) {
            this.set_velocity_to_destination();
        }

        if (Func.check_close(this.x + this.col_rect.x + this.col_rect.w / 2, this.y + this.col_rect.y + this.col_rect.h / 2, this.dest_x, this.dest_y, this.speed)) {
            this.vx = 0;
            this.vy = 0;
            this.go_anime("stand");
        }

        if (this.vx > 0) {
            this.change_direction("right");
        } else if (this.vx < 0) {
            this.change_direction("left");
        }
        this.x += this.vx;
        this.y += this.vy;
    }

    transfar(x, y) {
        this.x = x;
        this.y = y;
    }

    init_sprite(sprite, col_rect) {
        this.col_rect = col_rect;
        sprite.regX = this.w / 2;
        sprite.regY = this.h / 2;
        this.addChild(sprite);
        this.sprite = sprite;
        //this.change_shape(this.col_rect); //当たり判定表示
        this.removeChild(this.shape);   //当たり判定非表示
    }

    change_shape(rect) { //rect have .x .y .w .h
        this.removeChild(this.shape);
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill('white');
        this.shape.graphics.drawRect(rect.x, rect.y, rect.w, rect.h);
        this.addChild(this.shape); // 表示リストに追加
    }

    go_anime(anime_name) {
        if (this.sprite.currentAnimation != anime_name) {
            this.sprite.gotoAndPlay(anime_name);
        }
    }

    set_destination(_dest_x, _dest_y) {
        this.dest_x = _dest_x;
        this.dest_y = _dest_y;
        this.go_anime("walk");
    }
    set_velocity_to_destination() {
        let angle = Math.atan2(
            this.dest_y - (this.y + this.col_rect.y + this.col_rect.h / 2),
            this.dest_x - (this.x + this.col_rect.x + this.col_rect.w / 2)
        );
        this.vx = this.speed * Math.cos(angle);
        this.vy = this.speed * Math.sin(angle);
    }

    on_collision(c_obj) { //c_obj:衝突相手(Move_Object型)

    }
    slide_collision(c_obj) {
        if (this.trigger == false) {
            let col = Func.convert_col_rect(this);
            let side = Func.which_side_rect(col, c_obj);
            if (side == "right") {
                this.x = c_obj.x + c_obj.w - (this.col_rect.x);
            } else if (side == "left") {
                this.x = c_obj.x - col.w - (this.col_rect.x);
            } else if (side == "down") {
                this.y = c_obj.y + c_obj.h - (this.col_rect.y);
            } else if (side == "up") {
                this.y = c_obj.y - col.h - (this.col_rect.y);
            } else {
                console.log("myError: which_side? -> no side.");
            }
        }
    }

    change_direction(direction) {
        this.direction = direction;
        if (this.direction == "right") {
            this.sprite.scaleX = 1;
        } else if (this.direction == "left") {
            this.sprite.scaleX = -1;
        }
    }

    change_layer(layer) {
        this.layer = layer;
    }
}

//----------------------------------------------------------------
//--------MovePoint-----------------------------------------------
//----------------------------------------------------------------
class MovePoint extends createjs.Shape {
    constructor() {
        super();

        this.graphics.beginStroke("white");
        this.graphics.setStrokeStyle(5);
        this.graphics.drawCircle(0, 0, 40);
    }

    transfar(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}
