class Func {
    static check_close(x1, y1, x2, y2, d){
    if(x1 < x2+d && x1 > x2-d && y1 < y2+d && y1 > y2-d){
        return true;
    }else{
        return false;
    }
    }
    static check_collision(obj1, obj2){
    if(obj1.x+obj1.w > obj2.x && obj1.x < obj2.x+obj2.w){
        if(obj1.y+obj1.h > obj2.y && obj1.y < obj2.y+obj2.h){
        return true;
        }
    }
    return false;
    }
    static convert_col_rect(obj){ /** @param obj have [.x .y .w .h .col_rect] */
    let col = {
        x: obj.x + obj.col_rect.x,
        y: obj.y + obj.col_rect.y,
        w: obj.col_rect.w,
        h: obj.col_rect.h
    }
    return col
    }
    /**
     * @fn
     * 座標pが座標qのどちら側(上下左右)にあるか調べる
     * @param p Vector2
     * @param q Vector2
     * @return string : right/left/up/down
     */
    static which_side_point(p, q){
    let deltax = q.x-p.x;
    let deltay = q.y-p.y;
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
        return "left"
        }else{
        return "right"
        }
    }else{
        if(deltay > 0){
        return "up"
        }else{
        return "down"
        }
    }
    }
    static which_side_rect(a, b){ //* @param a, b : MoveObject(have .x .y .w .h)
    let dict = {
        left: a.x + a.w - (b.x),
        right: b.x + b.w - (a.x),
        up: a.y + a.h - (b.y),
        down: b.y + b.h - (a.y)
    }
    let min = Infinity;
    let ans = "null.";
    for(let key in dict){
        if(dict[key] >= 0 && dict[key] < min){
        min = dict[key];
        ans = key;
        }
    }
    return ans;
    }
}

class Vector2{
    constructor(x, y){
    this.x = x;
    this.y = y;
    }
    static zero(){
    zero = new Vector2(0.0, 0.0);
    return zero;
    }
}