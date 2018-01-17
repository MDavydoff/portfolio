var level1 = {
    preload: function () {
        game.load.image('arrowLeft', "img/arrowLeft.png");
        game.load.image('arrowRight', "img/arrowRight.png");
        game.load.image('arrowUp', "img/arrowUp.png");
        game.load.image('btnA', "img/shadedDark36.png");
        game.load.image('plat', "img/platform2.png");
        game.load.image('bullet', "img/bullet.png");
        game.load.image('bg_city', "img/bg_city.png");
        game.load.image('bullet_chest', "img/laserBlueBurst.png");
        game.load.spritesheet('player', "img/player1.png", 80, 80);
        game.load.spritesheet('enemies', "img/enemy.png", 79, 104);
    },
    player: null,
    enemies: null,
    enemies1: null,
    left: null,
    right: null,
    up: null,
    btnA: null,
    platback: null,
    platforms: null,
    platform: null,
    max: null,
    bullet: null,
    bullets: null,
    bulletTime: 0,
    bg_city: null,
    enemies_hp: 200,
    bullet_chest:null,
    facingLeft: false,
    facingRight: true,
    text: null,
    player_hp: 50,
    enemy_hp: 20,
    bullet_length: 20,
    enemiesSpawn: [710, 1000, 1500, 2000, 2500, 2700, 2800, 2900, 3000, 3200],
    platcoorsx: [710, 2660],
    platcoorsy: [300, 300],
    chest_coors:[200,1000,2500],
    update_interval: 4 * 60,
    create: function () {
        this.bg_city = game.add.sprite(-30, -300, 'bg_city');
        this.bg_city = game.add.sprite(1920, -300, 'bg_city');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 3370, 600);
        game.stage.backgroundColor = "#000000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(32, game.world.height - 250, 'player');
        this.player.scale.setTo(1.25, 1.25);
        this.platback = game.add.sprite(0, 600, 'plat');
        this.platback.anchor.setTo(0, 1);
        this.platform = game.add.sprite(1870, 0, 'plat');
        
        this.bullet_chest=game.add.group();
        this.bullet_chest.enableBody = true;
        this.bullet_chest.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 3; i++) {
            var b_c = this.bullet_chest.create(this.chest_coors[i],430, 'bullet_chest');
        }
        
        this.platform.scale.setTo(0.3, 16);
        
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 20; i++) {
            var b = this.bullets.create(0, 0, 'bullet');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
            b.scale.setTo(0.01, 0.01);
        }
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < this.platcoorsx.length; i++) {
            var p = this.platforms.create(this.platcoorsx[i], this.platcoorsy[i], 'plat');
            p.scale.setTo(2.35, 0.1);
            p.body.immovable = true;
        }
        game.physics.arcade.enable(this.player);
        this.platback.scale.setTo(80, 2);
        game.physics.arcade.enable(this.platback);
        this.platback.body.immovable = true;
        this.left = game.add.sprite(10, 505, 'arrowLeft');
        this.right = game.add.sprite(100, 505, 'arrowRight');
        this.btnA = game.add.sprite(500, 505, 'btnA');
        this.left.fixedToCamera = true;
        this.right.fixedToCamera = true;
        this.btnA.fixedToCamera = true;
        this.up = game.add.sprite(700, 505, 'arrowUp');
        this.up.fixedToCamera = true;
        game.camera.follow(this.player);
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.gravity.y = 300;
        this.player.animations.add('right', [8, 9, 10, 11, 12, 13], 10, true);
        this.player.animations.add('left', [40, 41, 42, 43, 44, 45], 10, true);
        this.player.animations.add('up', [4, 5, 6], 10, true);
        this.player.animations.add('shootright', [4, 5, 6], 10, true);
        this.player.animations.add('shootleft', [56, 57, 58], 10, true);
        this.player.animations.add('deathright', [24, 25, 26, 27, 28, 29, 30], 10, false);
        this.player.animations.add('deathleft', [48, 49, 50, 51, 52, 53, 54], 10, false);
        this.left.inputEnabled = true;
        this.left.events.onInputDown.add(this.moveleft);
        this.right.inputEnabled = true;
        this.right.events.onInputDown.add(this.moveright);
        this.btnA.inputEnabled = true;
        this.btnA.events.onInputDown.add(this.shoot);
        this.up.inputEnabled = true;
        this.up.events.onInputDown.add(this.moveup);
        this.right.events.onInputUp.add(this.stop);
        this.left.events.onInputUp.add(this.stop);
        this.btnA.events.onInputUp.add(this.stop);
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 10; i++) {
            var enemy = this.enemies.create(this.enemiesSpawn[i], 0, 'enemies', game.rnd.integerInRange(0, 36));
            enemy.body.collideWorldBounds = true;
            enemy.body.gravity.y = 50000;
            enemy.animations.add('righte', [8, 9, 10, 11, 12, 13], 5, true);
            enemy.animations.add('lefte', [1, 2, 3, 4, 5, 6], 5, true);
            enemy.autoCull = true;
            enemy.frame = 0;
        }
    },
    resetBullet: function (bullet) {
        bullet.kill();
    },
    moveleft: function () {
        level1.player.body.velocity.x = -300;
        level1.player.animations.play('left');
        level1.player.frame = 44;
        level1.facingLeft = true;
        level1.facingRight = false;
    },
    moveright: function () {
        level1.player.body.velocity.x = 300;
        level1.player.animations.play('right');
        level1.facingLeft = false;
        level1.facingRight = true;
    },
    moveup: function () {
        level1.player.body.velocity.y = -300;
        if (level1.facingLeft === true) {
            level1.player.frame = 40;
        }
        if (level1.facingRight === true) {
            level1.player.frame = 0;
        }
    },
    shoot: function () {
        if (level1.bullet_length > 0) {
            if (level1.facingRight === true) {
                level1.fireBulletRight();
            } else if (level1.facingLeft === true) {
                level1.fireBulletLeft();
            }
            level1.bullet_length--;
        }else{
            
        }
    },
    fireBulletRight: function () {
        if (game.time.now > level1.bulletTime) {
            level1.bullet = level1.bullets.getFirstExists(false);
            if (level1.bullet) {
                level1.bullet.reset(level1.player.x + 50, level1.player.y + 22);
                level1.bullet.body.velocity.x = 1000;
                level1.bulletTime = game.time.now + 150;
                level1.player.animations.play('shootright');
            }
        }
    },
    fireBulletLeft: function () {
        if (game.time.now > level1.bulletTime) {
            level1.bullet = level1.bullets.getFirstExists(false);
            if (level1.bullet) {
                level1.bullet.reset(level1.player.x + 10, level1.player.y + 22);
                level1.bullet.body.velocity.x = -1000;
                level1.bulletTime = game.time.now + 150;
                level1.player.animations.play('shootleft');
            }
        }
    },
    stop: function () {
        level1.player.body.velocity.setTo(0);
        level1.player.animations.stop();
        level1.player.frame = 0;
        if (level1.facingLeft === true) {
            level1.player.frame = 45;
        } else if (level1.facingRight === true) {
            level1.player.frame = 0;
        }
    },
    update: function () {
        game.physics.arcade.collide(this.player, this.platback);
        game.physics.arcade.collide(this.enemies, this.platback);
        game.physics.arcade.collide(this.bullet_chest, this.player, this.getBullets);
        game.physics.arcade.collide(this.enemies, this.platforms);
        game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.death, null, this);
        for (var i = 0; i < this.enemies.children.length; i++) {
            if (this.enemies.children[i].x - this.player.x <= 300) {
                game.physics.arcade.moveToObject(this.enemies.children[i], this.player, 60, 6000);
                this.enemyWalk();
            } else if (this.enemies.children[i].x - this.player.x >= 300) {
                this.enemyWalk.stop;
                game.physics.arcade.moveToObject(this.enemies.children[i], this.player, 0, 0);
                this.enemies.children[i].frame = 0;
            } else {

            }
        }
        if(this.enemies.children.length===0){
            game.state.start("victory_screen")
        }
    },
    getBullets:function(player,chest){
        chest.kill();
        level1.bullet_length+=20;
        level1.player_hp+=50;
        
    },
    enemyWalk: function () {
        for (var i = 0; i < this.enemies.children.length; i++) {
            if (level1.player.x - level1.enemies.children[i].x >= 0) {
                level1.enemies.children[i].animations.play("righte");
            }
            if (level1.player.x - level1.enemies.children[i].x <= 0) {
                level1.enemies.children[i].animations.play("lefte");
            }
        }
    },
    death: function (player, enemy) {
        level1.player_hp -= 20;
        if (level1.player_hp <= 0) {
            player.kill();
            alert("YOU DIED");
            this.left.inputEnabled = false;
            this.right.inputEnabled = false;
            this.btnA.inputEnabled = false;
            this.up.inputEnabled = false;
            game.state.start("menu")
        }
        player.x -= 50;
        enemy.x += 50;
        enemy.animations.stop();
        enemy.body.velocity.setTo(0);
        enemy.animations.stop();
        enemy.frame = 0;
    },
    collisionHandler: function (bullet, enemy) {
        bullet.kill();
        level1.enemy_hp -= 10;
        if (level1.enemy_hp === 0) {
            enemy.kill();
            level1.enemies.children.length--;
            level1.enemy_hp = 20;
        }
        if (enemy.animations.currentAnim.name == "lefte") {
            enemy.x += 50;
        }
        if (enemy.animations.currentAnim.name == "righte") {
            enemy.x -= 50;
        }
    },
    render: function () {
        game.debug.text("HEALTH: " + level1.player_hp, 32, 32);
        game.debug.text("BULLETS: " + level1.bullet_length, 32, 64);
    }
};
