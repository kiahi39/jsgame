
// 読み込みが終わってから初期化
window.addEventListener("load", init);

function init() {
    // ステージを作成
    let stage = new createjs.Stage("myCanvas");

    // リサイズイベントを検知してリサイズ処理を実行
    window.addEventListener("resize", handleResize);
    handleResize(); // 起動時にもリサイズしておく

    // リサイズ処理
    function handleResize(event) {

        // Canvas要素の大きさを画面幅・高さに合わせる
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;

        // // Retina対応
        // if (window.devicePixelRatio) {
        //   const canvas = document.getElementById("myCanvas");
        //   canvas.width *= devicePixelRatio;
        //   canvas.height *= devicePixelRatio;
        //   canvas.style.width = String(canvas.width / devicePixelRatio) + "px";
        //   canvas.style.height = String(canvas.height / devicePixelRatio) + "px";
        //   stage.scaleX = stage.scaleY = window.devicePixelRatio;
        // }

        // 画面更新する
        stage.update();
    }

    // タッチ操作をサポートしているブラウザーならば
    if (createjs.Touch.isSupported() == true) {
        // タッチ操作を有効にします。
        createjs.Touch.enable(stage)
    }

    //オブジェクトの作成

    // 全画面を覆う入力パネル
    let rect = new createjs.Shape();
    rect.graphics.beginFill("gray").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(rect);

    let game_stage = new GameStage("myCanvas");
    stage.addChild(game_stage);

    let move_point = new MovePoint(30, 30);
    game_stage.addChild(move_point);

    let object_a = new MoveObject(256, 384);
    let data = {
        images: ["img/CityWalkGirl_walk_v2x2.png"],
        frames: [
            // x, y, width, height, imageIndex*, regX*, regY*
            [0, 0, 256, 384],
            [256, 0, 256, 384],
            [256 * 2, 0, 256, 384],
            [256 * 3, 0, 256, 384],
            [256 * 4, 0, 256, 384]
        ],
        framerate: 4,
        animations: {
            stand: 0,
            walk: {
                frames: [1, 2, 3, 4],
                next: "walk",
                speed: 1
            }
        }
    };
    let ss = new createjs.SpriteSheet(data);
    let sprite = new createjs.Sprite(ss);
    let col_rect = { x: -32, y: 96, w: 64, h: 64 };
    object_a.init_sprite(sprite, col_rect);
    object_a.dest_control = true;
    object_a.layer = -10;
    object_a.stable = false;
    game_stage.addChild(object_a);
    game_stage.cameraTarget = object_a;

    let wall1 = new MoveObject(1000, 100);
    wall1.transfar(-500, -500);
    game_stage.addChild(wall1);

    let wall2 = new MoveObject(1000, 100);
    wall2.transfar(-500, 500);
    game_stage.addChild(wall2);

    let wall3 = new MoveObject(100, 1000);
    wall3.transfar(-500, -500);
    game_stage.addChild(wall3);

    let wall4 = new MoveObject(300, 200);
    wall4.transfar(100, 0);
    game_stage.addChild(wall4);

    // tick イベントを登録する

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
        // 画面を更新する
        stage.update(event);
    }

    // 各種マウスイベントを登録する
    rect.addEventListener("click", handleRectClick);

    //背景クリックイベント
    function handleRectClick(event) {
        move_point.transfar(game_stage.camera.x + stage.mouseX, game_stage.camera.y + stage.mouseY);
        object_a.set_destination(game_stage.camera.x + stage.mouseX, game_stage.camera.y + stage.mouseY);
    }

} //init()ここまで

/**方針メモなど
 *
 * 衝突 slice_collisionの優先度 staticで判断/重さの比重
 * 座標ずれ col_rect方式からずらし表示(本来の.x.yをcol_rect.x.yにする)
 * Spriteは.x .yも.col_rectも中心基準となった。
 * ライブラリとしての制作 (クラス設計 / 命名規則)
 * たしかにライブラリ制作はためになるが、開発を進めることが本来の目的。
 * 守る：クラス設計 // 妥協：自分が分かればいい。他人は使いにくくても仕方ない。
 *
 * アニメバグ 向き  レイヤー
 *
 * 音 奥行 ドット絵 カメラ！
 * 初期distination
 * 保存 cookie セッション
 * 壁で停止 速度を成分ごとに消す
 * 別ファイル化
 * テキスト UI ウィンドウ
 * 画面サイズ 縦画面
 *
 */