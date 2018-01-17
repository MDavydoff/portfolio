var victory_screen = {
    preload: function () {

    },
    text:null,
    play:null,
    create: function () {
        game.stage.backgroundColor = "#000000";
        this.text=game.add.text(20, 40, "CONGRATULATIONS!", { font: "74px Arial Black", fill: "#ba6b00" });
        this.text.stroke = "#640000";
        this.text.strokeThickness = 16;
        this.text.setShadow(2, 2, "#333333", 2, false, false);
        this.text=game.add.text(300, 440, "PLAY AGAIN", { font: "40px Arial Black", fill: "#000000" });
        this.text.stroke = "#2b00e2";
        this.text.strokeThickness = 16;
        this.text.setShadow(2, 2, "#333333", 2, false, false);
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(this.play_func);
    },
    update: function () {
    },
    play_func:function(){
        game.state.start("lev1");
    }
};