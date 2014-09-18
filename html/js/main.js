// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(1024, 600, Phaser.auto, 'gameDiv');
       // this.loadAnimation();

// Create our 'main' state that will contain the game
var mainState = {

    	preload: function() {  
		// Change the background color of the game
		game.stage.backgroundColor = '#71c5cf';

		// Load the bird sprite
		//game.load.image('bird', 'assets/character1.png'); 
        game.load.spritesheet('bird','assets/animation_v1.png',240,248,3);
		
		//Load the pipe
		//game.load.image('pipe', 'assets/mikasa1.png');
        //game.load.image('pipe1', 'assets/taiga.png');
	    //game.load.image('pipe', 'assets/pipe.png');
            
        /**Esta funcion llama al sprite del obstaculo*/
        game.load.spritesheet('pipe','assets/mikasa sheet.png',101,127,3);    
            
		this.pipes = game.add.group(); // Create a group  
		this.pipes.enableBody = true;  // Add physics to the group  
		//this.pipes.createMultiple(3, 'pipe'); // Create 20 pipes 
        //this.pipes.createMultiple(3, 'pipe1');
        this.pipes.createMultiple(10, 'pipe');
            
	},
    
   	create: function() {  
		// Set the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
        
		// Display the bird on the screen
		this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.scale.x = 0.5; // set the size/scale of the width
        this.bird.scale.y = 0.5;
        this.bird.animations.add('jumping',[0,2,1,2,1,2],6,false);
        
		// Add gravity to the bird to make it fall
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;  

		// Call the 'jump' function when the spacekey is hit
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);     
		
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
		
		this.score = 0;  
		this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" }); 
	},

    update: function() {  
		// If the bird is out of the world (too high or too low), call the 'restartGame' function
		if (this.bird.inWorld == false){
            this.restartGame();
        }
		game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
	},
    
    /*Pretendo que esta funcion ejecute desde el inicio e indefinidamente el movimiento*/
    loadAnimation: function(){
        while(0<1){
             
        }    
    },
	
	addOnePipe: function(x, y) {  
	    // Get the first dead pipe of our group
	    var pipe = this.pipes.getFirstDead();

	    // Set the new position of the pipe
	    pipe.reset(x, y);

	    // Add velocity to the pipe to make it move left
	    pipe.body.velocity.x = -200; 

	    // Kill the pipe when it's no longer visible 
	    pipe.checkWorldBounds = true;
	    pipe.outOfBoundsKill = true;
	},
	
	addRowOfPipes: function() {  
	    // Pick where the hole will be
	    var hole = Math.floor(Math.random() * 4) + 1;

	    // Add the 6 pipes 
	    for (var i = 0; i < 1; i++){
            var posyPipe = Math.abs(Math.random() * 400);
		if (i != hole && i != hole + 1) 
		    this.addOnePipe(1024, posyPipe);  
        }
            this.score += 1;  
	    this.labelScore.text = this.score; 
        
	},
		
	// Make the bird jump 
	jump: function() {  
		// Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
        this.bird.animations.play('jumping');
	},

	// Restart the game
	restartGame: function() {  
		// Start the 'main' state, which restarts the game
		game.state.start('main');
        document.getElementById("gameDiv").style.visibility = 'hidden'; 
        document.getElementById("titulo").style.visibility = 'hidden';
        document.getElementById("previo").style.visibility = 'visible';
	},
    
    /*pauseGame: function(){
        game.state.pauseGame();
    }*/
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');