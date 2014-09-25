var play_state = {

    create: function() { 
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 
        
        //add background
        this.bg= this.game.add.tileSprite(0, 0, this.game.stage.bounds.width, game.cache.getImage('background').height, 'background');

        this.pipes = this.game.add.group();
        
        /**/var pipe_array=['pipe','pipe1'];
            
        for(var i=0; i<20;i++)
        {
            var p = Math.floor(Math.random() * 2);
            this.pipes.createMultiple(1,pipe_array[p]);
            console.log(p);
        }/**/
        
        
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        this.bird = this.game.add.sprite(100, 245, 'bird');
		this.bird.scale.x = 0.5; // set the size/scale of the width
        this.bird.scale.y = 0.5;
        this.bird.animations.add('jumping',[2,1,0],6,false);
        this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(-0.2, 0.5);
        
        

        // No 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#bebebe" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');

    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restart_game(); 

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this); 
        this.bg.tilePosition.x -= 1;
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
		this.bird.animations.play('jumping');
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        console.log(pipe);
        if(pipe.key=='pipe')
        {
            console.log("mikasa");
            pipe.animations.add('move',[0,1,2,1,0],4,true);
            pipe.animations.play('move');

        }
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
        
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*4)+1;

        /*for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.add_one_pipe(400, i*60+10); */
		 for (var i = 0; i < 1; i++){
            var posyPipe = Math.abs(Math.random() * 400);
			if (i != hole && i != hole + 1) 
		    	this.add_one_pipe(1024, posyPipe);  
        }  

        // No 'this.score', but just 'score'
        score += 1; 
        this.label_score.content = score;  
    }
};