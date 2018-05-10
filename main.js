// starfield part 
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var img = new Image();
var ID;
var frameRate = 800;
// game part







var spaceShip  = {
    game: 1,
    x: canvas.width*0.5,
    y: canvas.height*0.8,
    direction: 1,
    draw: function () {
        var xb = this.x;
        var yb = this.y;
        img.onload = function() {
            ctx.drawImage(img, 0, 60, 293, 272, xb, yb, 65, 40);
        };
        img.src = "space-invader.png";
    },
};
spaceShip.draw();


var monster  = {
    number: 30,
    x: canvas.width*0.2,
    y: canvas.height*0.07,
    direction: 1,
    draw: function () {
        var num = this.number/3;
        var xb = this.x;
        var yb = this.y;
        //var t = 
        img.onload = function() {
            for(var j=0; j<3; j++){
                for (var i=0; i<num;i++){
                    ctx.drawImage(img, 0, 60, 1600, 950, xb+i*canvas.width*0.06, yb+j*canvas.height*0.08, 65, 40);
                }
            }
        };
        img.src = "mechant1.png";
    },
};
monster.draw();




(function updateMonster() {
    for(var j=0; j<3; j++){
        for (var i=0; i<((monster.number)/3);i++){
            ctx.clearRect(monster.x+i*canvas.width*0.06, monster.y+j*canvas.height*0.08, 65, 40);
        }
    }
    if(monster.direction==1){
        if(monster.x<canvas.width*0.4){
            monster.x+=canvas.width*0.07;
        } else{
            monster.y+=canvas.height*0.05;
            monster.direction=-1;
        }
    }
    else if(monster.direction==-1){
        if(monster.x>canvas.width*0.05){
            monster.x-=canvas.width*0.07;
        } else{
            monster.y+=canvas.height*0.05;
            monster.direction=1;
        }
    }
    monster.draw();
    ID = setTimeout(updateMonster, frameRate);
    /*if (spaceShip.game==0){
        clearTimeout(ID);
    }*/
})();




var gameElement = document.getElementById("game_area");
var game = {
    
     high_score_list : ["Kevin CHieze", "Kevin chieze", "celine ponton", "Guillaume Valette","Adele Bert","Jean-Yves"],
    
    
    load_high_score : function  () {
    
    this.high_score_list = localStorage.saved_high_score && JSON.parse(localStorage.saved_high_score);
},
    
    save_high_score : function () {
        
        localStorage.setItem("saved_high_score",JSON.stringify(this.high_score_list));
        
        
    },
    
    show_high_score : function () {
        
        var highscore_area = document.createElement("div");
        gameElement.appendChild(highscore_area);
        highscore_area.setAttribute("class","highscore_class");
        
        
        highscore_area.innerHTML = "<h2> HighScore <br> Pseudo / Score </h2>";
        
        for(var i=0;i<this.high_score_list.length;i++) 
            {
                highscore_area.innerHTML += this.high_score_list[i];
                highscore_area.innerHTML += "<br> <br>";
            }
        
        
        
        
        
        
        
        
    },
    
    
    

    
}

var Starfield =  {
	fps : 60,
	canvas : null,
    width :0,
    heigth : 0,
	minVelocity : 10,
	maxVelocity : 300,
	nb_stars : 200,
    star_size : 3,
    stars : 0,
	intervalId : 0,
    
    
    //init the starfield
                            /// a finir de modifier ////
    
    initialise : function (div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.onresize = function(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
    }

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
},


    // Start the skyfall
  
    start  : function  () {

	//	Create the stars.
	var buff_stars = [];
     
     //Create the define number of star
	for(var i=0; i<this.nb_stars; i++) {
		buff_stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*this.star_size+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
        //put the buffer on the object
	this.stars = buff_stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps); 
},
    
    update : function() {
        
        
	var dt = 1 / this.fps;

	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;
		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if(star.y > this.height) {
			this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
            (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}
},

    
    draw : function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
    ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars.
	ctx.fillStyle = '#ffffff';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
}
    

}


function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.velocity = velocity;
	this.size = size;
}

window.onload="draw()";

function draw () {
    alert("Tchoin");
    /*var game_canva = document.getElementById("game_canvas");
    var ctx = game_canva.getContext("2d");
    
    ctx.fillText("tchoin tchoincthcoin");
    ctx.fillStyle('#000000');
     */

    
}


function high_score_display () {
    
    
    
   // alert("ouiii");
    var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

    ctx.font="30px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="center"; 
    ctx.textAlign="center";
ctx.fillText("hey ho lets go", canvas.width / 2, canvas.height/2);  
    
    
    
}