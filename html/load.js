var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('background', 'assets/bg1.jpg');//bg game
        this.game.load.image('menu', 'assets/bg.jpg');//bg menu, change please
        this.game.load.spritesheet('bird','assets/alas_v2.png',240,248,3); 
        this.game.load.spritesheet('pipe','assets/mikasa_sprite.png',113,127,3);  
        //this.game.load.image('pipe', 'assets/mikasa1.png');
		this.game.load.image('pipe1', 'assets/taiga.png');  
        this.game.load.audio('jump', 'assets/jump.wav');
	},

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
		
    }
};