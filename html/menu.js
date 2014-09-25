var menu_state = {  
    create: function() {
        // Call the 'start' function when pressing the spacebar
        
		//this.game.add.images("imagen1");
		this.game.add.sprite(0, 0, 'menu');
		
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this); 

        // Defining variables
        var style = { font: "50px Arial", fill: "#1F32F1" };
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y-50, "Presionar Espacio para empezar", style);
        text.anchor.setTo(0.5, 0.5); 

        // If the user already played
        if (score > 0) {
            // Display its score
            var score_label = this.game.add.text(x, y+50, "puntaje: " + score, style);
            score_label.anchor.setTo(0.5, 0.5); 
        }
    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};