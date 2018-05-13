var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var img = new Image();
var ID;
var frameRateMonster = 900;
var frameRateWeapon = 50;

//OBJECT SPACESHIP


var spaceShip  = {
    vie: 3,
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
        img.src = "space-invader.jpg";
    },
};
spaceShip.draw();


//OBJECT MONSTER


var monster  = {
    number: 30,
    x: canvas.width*0.2,
    y: canvas.height*0.07,
    direction: 1,
    tabMonster:[],
    draw: function () {
        var tabLength = this.tabMonster.length;
        var tabTest = this.tabMonster;
        img.onload = function() {
            for (var i=0; i<tabLength;i++){
                ctx.drawImage(img, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40);
            }
        };
        img.src = "mechant1.jpg";
    },
};


//INITIALSIATION LISTE MONSTER

for(var j=0; j<2; j++){
    for (var i=0; i<10;i++){
        monster.tabMonster.push({x: monster.x+i*canvas.width*0.06, y:monster.y+j*canvas.height*0.08, vie:1});
        if (j==0) {
            monster.tabMonster[i].vie=2;
        }
    }
}
console.log(monster.tabMonster);
monster.draw();


//OBJET MISSILE


var weapon ={
    number:1000,
    x:spaceShip.x,
    y:spaceShip.y-canvas.height*0.05,
    tabWeapon: [],
    draw: function () {
        var xb = this.x;
        var yb = this.y;
        img.onload = function() {
            ctx.drawImage(img, 90, 0, 220, 383, xb, yb, 10, 40);
        };
        img.src = "SpaceInvadersLaser.png";
    }
    
    /*drawMonsterWeapon: function () {
        var xb = this.x;
        var yb = this.y;
        img.onload = function() {
            ctx.drawImage(img, 90, 0, 220, 383, xb, yb, 10, 40);
        };
        img.src = "SpaceInvadersLaser.png";
    }*/
    
}
weapon.draw();



//LOOP MONSTRE


(function updateMonster() {
    
        for (var i=0; i<monster.tabMonster.length;i++){
            ctx.clearRect(monster.tabMonster[i].x, monster.tabMonster[i].y, 65, 40);
        }
    
    if(monster.direction==1){
        
        if(monster.tabMonster[0].x<canvas.width*0.35){
            
            for(var j=0; j<monster.tabMonster.length; j++){
                monster.tabMonster[j].x+=canvas.width*0.03;
            }
            
        } else{
            
            monster.direction=-1;
            for(var j=0; j<monster.tabMonster.length; j++){
                monster.tabMonster[j].y+=canvas.height*0.05;
            }
        }
    }
    
    else if(monster.direction==-1){
        
        if(monster.tabMonster[0].x>canvas.width*0.07){
            
            for(var j=0; j<monster.tabMonster.length; j++){
                monster.tabMonster[j].x-=canvas.width*0.03;
            }
            
        } else{
            
            monster.direction=1;
            for(var j=0; j<monster.tabMonster.length; j++){
                monster.tabMonster[j].y+=canvas.height*0.05;
            }
        }
    }
    monster.draw();
    ID = setTimeout(updateMonster, frameRateMonster);
    /*if (spaceShip.game==0){
        clearTimeout(ID);
    }*/
})();



//CHECK IF WEAPON IS UNDER EDGE

function checkEdge(number){
    if(weapon.tabWeapon[number].y<0){
        ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
        weapon.tabWeapon.splice(number,1);
    }
}

//FUNCTION LOOP COLLAPSE MONSTRE WITH WEAPON


function checkCollapse(number){
    for(var i=0; i<monster.tabMonster.length; i++){
        if(weapon.tabWeapon[number].y<=monster.tabMonster[i].y){
            if(((weapon.tabWeapon[number].x)<=(monster.tabMonster[i].x+canvas.width*0.05))&&((weapon.tabWeapon[number].x)>=(monster.tabMonster[i].x))){
                ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                weapon.tabWeapon.splice(number,1);
                monster.tabMonster[i].vie--;
                //ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                //ctx.clearRect(monster.tabMonster[i].x, monster.tabMonster[i].y, 65, 40);
                if(monster.tabMonster[i].vie==0){
                    ctx.clearRect(monster.tabMonster[i].x, monster.tabMonster[i].y, 65, 40);
                    monster.tabMonster.splice(i,1);
                }
            }
        }
    }
}

//FUNCTION LOOP WEAPON

(function updateWeapon() {
    img.onload = function() {
        for(var a=0; a<weapon.tabWeapon.length; a++){
            ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
            weapon.tabWeapon[a].y-=canvas.height*0.05;
            ctx.drawImage(img, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
            checkCollapse(a);
            checkEdge(a);
        }
    };
    img.src = "SpaceInvadersLaser.png";
    ID = setTimeout(updateWeapon, frameRateWeapon);
})();


//FUNCTION LOOP WEAPON MONSTER


(function updateWeaponMonster() {
    img.onload = function() {
        for(var a=0; a<weapon.tabWeapon.length; a++){
            ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
            weapon.tabWeapon[a].y-=canvas.height*0.05;
            ctx.drawImage(img, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
            //checkCollapse(a);
            //checkEdge(a);
        }
    };
    img.src = "SpaceInvadersLaser.png";
    ID = setTimeout(updateWeaponMonster, frameRateWeapon);
})();

function fire() {
    
    
           weapon.y=(spaceShip.y-canvas.height*0.05);
        weapon.x=spaceShip.x;
        weapon.tabWeapon.push({x:weapon.x, y:weapon.y});
}


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
        


        if (displaying_HS==false) {
            displaying_HS = true;
            var highscore_area = document.createElement("div");
            gameElement.appendChild(highscore_area);
            highscore_area.setAttribute("class","highscore_class");

        
        
            highscore_area.innerHTML = "<h2> HighScore <br> Pseudo / Score </h2>";
        
            for(var i=0;i<this.high_score_list.length;i++) 
            {
                highscore_area.innerHTML += this.high_score_list[i];
                highscore_area.innerHTML += "<br> <br>";
            }
        }
        else {
            
                gameElement.removeChild(gameElement.lastChild);
            displaying_HS= false;
            
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

// login area

var login = {
    
    
    pseudo : "hey",
    
    display : function () {
     var login_form = document.createElement("form");
        login_form.setAttribute("class","login_class");
        login_form.setAttribute("name","form_name");
        console.log(login_form);
        
    var login_label = document.createElement("label");
        login_form.appendChild(login_label);
        login_label.innerHTML = "Enter your Pseudo : ";
        
        
        
        
        login_form.addEventListener('submit', function(event){event.preventDefault();});
        
        
    var login_input = document.createElement("input");
        login_input.setAttribute("name","login_value");
        login_input.setAttribute("type", "text");
        login_input.setAttribute("color","#3CBC8D");
        login_input.setAttribute("class","login_value");
        login_form.appendChild(login_input);
        
        
        
    var login_btn = document.createElement("button");
        login_btn.setAttribute("class","login_btn_class");
        login_btn.innerHTML = "Confirm Pseudo";
        login_btn.setAttribute("onclick","login.setlogin()");
        login_form.appendChild(login_btn);
        
        
        gameElement.appendChild(login_form);

        
},
    
 
       setlogin : function () {
        
        this.pseudo = document.form_name.login_value.value;
        gameElement.removeChild(gameElement.lastChild);
        
        var login_display = document.createElement("div");
        login_display.setAttribute("id","pseudo_display");
        gameElement.appendChild(login_display);
           login_display.innerHTML = " Player : " + this.pseudo;
           
        
           
        
    } 
}






if (window.DeviceOrientationEvent) 
{
    window.addEventListener("deviceorientation", function () 
    {
        processGyro(event.alpha, event.beta, event.gamma); 
        
    }, true);
} 


function processGyro(alpha,beta,gamma)
{
	
    
    document.getElementById("intro_text").innerHTML=canvas.width;
        if (beta > 2) {
  
            
            
            if (spaceShip.x - canvas.width*((beta / 1000)*3) > 0 ) {
                
              ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
       spaceShip.x-=canvas.width*((beta / 1000)*3) ;
        spaceShip.draw(); 
            }
     
            
        //weapon.draw();
    } 
    else if (beta < -2){
        
         if (spaceShip.x + canvas.width*((beta / 1000)*3) < window.width * 0,8 ) {
        
        ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
        spaceShip.x+= canvas.width*((Math.abs(beta) / 1000)*3);
        spaceShip.draw();
             
         }
    
        //weapon.draw();
    }
    
}

