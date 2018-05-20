var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


var img_space_ship = new Image();

var img_monster = new Image();

var img_weapon = new Image();

var img_weapon_big = new Image();

var img_monster_2 = new Image();

var img_monster_3 = new Image();

var img_space_ship_hit = new Image();


var high_score_list = [];
var bool = 1;
var counterBigWeaponTimer = 0;
var frameRateMonster = 1000;
var frameRateWeapon = 90;
var frameRateWeaponMonster = 220;
var positionSpaceShipIniX = [];
var ammo_delay =3000;
var ammo_amount = 2 ;
var max_ammo = 15;
var counter_touch = 0;


var touch = new Audio("touch.mp3");

var gameElement = document.getElementById("game_area");
var state_btn = document.getElementById("state_btn");
var scoreElement = document.getElementById("score_display");
var ammoElement = document.getElementById("ammo_display");
var ammo_bar = document.getElementById("ammo_bar");

ammo_bar.setAttribute("max",max_ammo);

// Interval variables
var weapon_ID;
var monster_weapon_ID;
var monster_move_ID;
var IDWeaponM;
var new_ammo_ID;
var color_spaceShip_hit_ID;
var timer_big_weapon_ID;

// Init the orientation controller
if (window.DeviceOrientationEvent) 
{
    window.addEventListener("deviceorientation", function () 
    {
        processGyro(event.alpha, event.beta, event.gamma); 
        
    }, true);
} 

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
        img_space_ship.onload = function() {
            ctx.drawImage(img_space_ship, 0, 60, 293, 272, xb, yb, 65, 40);
        };
        img_space_ship.src = "img/space-invader.png";
    },
    
    erased: function (){
        ctx.clearRect(this.x, this.y, 65, 40);
    },
};
spaceShip.draw();


//OBJECT MONSTER


var monster  = {
    niveau : 1,
    number: 30,
    x: canvas.width*0.24,
    y: canvas.height*0.07,
    direction: 1,
    tabMonster:[],
    tabMonsterNiv2: [],
    tabMonsterNiv3: [],
    
    initialisation: function() {
        for(var j=0; j<2; j++){
            for (var i=0; i<10;i++){
                this.tabMonster.push({x: this.x+i*canvas.width*0.07, y:this.y+j*canvas.height*0.08, vie:1});
                this.tabMonsterNiv2.push({x: this.x+i*canvas.width*0.07, y:this.y+j*canvas.height*0.08, vie:2});
                this.tabMonsterNiv3.push({x: this.x+i*canvas.width*0.07, y:this.y+j*canvas.height*0.08, vie:3});
                if (this.niveau == 3){

                }
                if (j==0) {
                    this.tabMonster[i].vie=2;
                }
            }
        }
        if (this.niveau == 3){
            for (var i=0; i<10;i++){
                this.tabMonsterNiv3.push({x: this.x+i*canvas.width*0.06, y:this.y+2*canvas.height*0.08, vie:3});
            }
        }
    },
    
    draw: function () {
        var listeMonster = level();
        var tabLength = listeMonster.length;
        var tabTest = listeMonster;
        
        img_monster.onload = function() {
            for (var i=0; i<tabLength;i++){
                ctx.drawImage(img_monster, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40);
                
                if( tabTest[i].vie == 2 ) {
                    ctx.drawImage(img_monster_2, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40);
                }
                if( tabTest[i].vie == 3 ) {
                    ctx.drawImage(img_monster_3, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40);
                }
            }
        };
        img_monster.src = "img/mechant1.png";
        img_monster_2.src = "img/mechant2.png";
        img_monster_3.src = "img/mechant3.png";
    },
    
    erased: function (){
        
        var listeMonster = level();
    
        for (var i=0; i<listeMonster.length;i++){
            ctx.clearRect(listeMonster[i].x, listeMonster[i].y, 65, 40);
        }
        
    }
};
monster.initialisation();


//DISPLAY NUMBER OF LIFE OF THE SHIP


function spaceShipVie () {
    img_space_ship.onload = function() {
        ctx.clearRect(canvas.width*0.90, canvas.height*0.01, 150, 25);
        for (var i =0; i<spaceShip.vie; i++) {
            ctx.drawImage(img_space_ship, 0, 60, 293, 272, canvas.width*(0.96-i*0.03), canvas.height*0.01, 45, 25);
        }
    };
    img_space_ship.src = "img/space-invader.png";
}
spaceShipVie();



//FUNCTION LEVEL

function level(){
    if (monster.niveau == 1) {
        return (monster.tabMonster);
    }
    else if (monster.niveau == 2) {
        return (monster.tabMonsterNiv2);
    }
    else if (monster.niveau == 3) {
        return (monster.tabMonsterNiv3);
    }
}

//OBJET MISSILE


var weapon = {
    
    number:1000,
    xM:monster.tabMonster[Math.floor(Math.random()*monster.tabMonster.length)].x,
    yM:monster.tabMonster[Math.floor(Math.random()*monster.tabMonster.length)].y,
    x:spaceShip.x+canvas.height*0.01,
    y:spaceShip.y-canvas.height*0.05,
    tabWeapon: [],
    tabWeaponMonster: [],
    
    draw: function () {
        var xb = this.x;
        var yb = this.y;
        img_weapon.onload = function() {
            ctx.drawImage(img_weapon, 90, 0, 220, 383, xb, yb, 10, 40);
        };
        img_weapon.src = "img/SpaceInvadersLaser.png";
    },
    
    drawMonsterWeapon: function () {
        var xb = this.xM;
        var yb = this.yM;
        img_weapon.onload = function() {
            ctx.drawImage(img_weapon, 90, 0, 220, 383, xb, yb, 10, 40);
        };
        img_weapon.src = "img/SpaceInvadersLaser.png";
    },
    
    erased: function (){
    
        for (var i=0; i<this.tabWeapon; i++){
            ctx.clearRect(this.tabWeapon[i].x, this.tabWeapon[i].y, 10, 40);
        }
        
        for (var i=0; i<this.tabWeaponMonster; i++){
            ctx.clearRect(this.tabWeaponMonster[i].x, this.tabWeaponMonster[i].y, 10, 40);
        }
        
    },
    
};


//FUNCTION CLEAR

function clearGame () {
    weapon.erased();
    spaceShip.erased();
    monster.erased();
}


//LOOP MONSTRE


function updateMonster() {
    
    var listeMonster = level();
    
        for (var i=0; i<listeMonster.length;i++){
            ctx.clearRect(listeMonster[i].x, listeMonster[i].y, 65, 40);
        }
    
    if(monster.direction==1){
        
        if(listeMonster[0].x<canvas.width*0.27){
            
            for(var j=0; j<listeMonster.length; j++){
                listeMonster[j].x+=canvas.width*0.03;
            }
            
        } else{
            
            monster.direction=-1;
            for(var j=0; j<listeMonster.length; j++){
                listeMonster[j].y+=canvas.height*0.05;
            }
        }
    }
    
    else if(monster.direction==-1){
        
        if(listeMonster[0].x>canvas.width*0.07){
            
            for(var j=0; j<listeMonster.length; j++){
                listeMonster[j].x-=canvas.width*0.03;
            }
            
        } else{
            
            monster.direction=1;
            for(var j=0; j<listeMonster.length; j++){
                listeMonster[j].y+=canvas.height*0.05;
            }
        }
        
        
    }
    monster.draw();
    
    weapon.yM=(listeMonster[Math.floor(Math.random()*listeMonster.length)].y+canvas.height*0.02);
    
    weapon.xM=listeMonster[Math.floor(Math.random()*listeMonster.length)].x;
    
    weapon.tabWeaponMonster.push({x:weapon.xM, y:weapon.yM, xTrajectoire: weapon.xM, yTrajectoire: weapon.yM, weaponAlreadyTaken: 1});
    
    positionSpaceShipIniX.push(spaceShip.x);    
    
    if (checkCollapseNoWeapon()) {
        alert("game over");
    }
    
    monster_move_ID = setTimeout(updateMonster, frameRateMonster);
    /*if (spaceShip.game==0){
        clearTimeout(ID);
    }*/
}


//COLOR IF COLLAPSE SPACESHIP

function colorSpaceShip() {
    img_space_ship_hit.onload = function() {
            ctx.drawImage(img_space_ship_hit, 0, 60, 293, 272, spaceShip.x, spaceShip.y, 65, 40);
    };
    img_space_ship_hit.src = "img/space-invader_touch.png";
    counter_touch++;
    color_spaceShip_hit_ID = setTimeout(colorSpaceShip, 150);
    
    
    
    if (counter_touch == 12) {
        counter_touch=0;
        clearTimeout(color_spaceShip_hit_ID);
    }
}

//FUNCTION TIMER BIG WEAPON

function timerBigWeapon() {
    counterBigWeaponTimer++;
    timer_big_weapon_ID = setTimeout(timerBigWeapon, 1500);
    if (counterBigWeaponTimer == 20) {
        game.bigAmmo = 1;
        counterBigWeaponTimer = 0;
    }
}
timerBigWeapon();


//CHECK IF WEAPON IS UNDER EDGE

function checkEdge(number){
    if(weapon.tabWeapon[number].y<0){
        ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
        weapon.tabWeapon.splice(number,1);
    }
}


//CHECK IF WEAPON MONSTER IS UNDER EDGE 

function checkEdgeWeaponMonster(number){
    if(weapon.tabWeaponMonster[number].y >= canvas.height*0.9){
        ctx.clearRect(weapon.tabWeaponMonster[number].x, weapon.tabWeaponMonster[number].y, 10, 40);
        weapon.tabWeaponMonster.splice(number,1);
    }
}




//FUNCTION ERASE

function erase(list){
    for(var i=0; i<list.length; i++){
        if(list[i].vie <= 0){
            ctx.clearRect(list[i].x, list[i].y, 65, 40);
            list.splice(i,1);
            game.increase_score(10);
        }
        if (list.length == 0) {
            monster.niveau++;
            spaceShip.vie = 3;        
        }
    }
}

//COLLAPSE MONTER WITH SPACESHIP

function checkCollapseNoWeapon () {
    
    var listeMonster = level();
    
    for(var i=0; i<listeMonster.length; i++){
        if ((listeMonster[i].y >= spaceShip.y)) {
            if (listeMonster[i].x >= spaceShip.x-canvas.width*0.02) {
                return (true)
            }
        } else {
            return(false)
        }
    }
}


//FUNCTION LOOP COLLAPSE MONSTRE WITH WEAPON


function checkCollapse(number){
    
    var listeMonster = level();
    var boolBigOne = 0;
    
    for(var i=0; i<listeMonster.length; i++){
        
        if(weapon.tabWeapon[number].y <= listeMonster[i].y){
            if(((weapon.tabWeapon[number].x)<=(listeMonster[i].x+canvas.width*0.05))&&((weapon.tabWeapon[number].x)>=(listeMonster[i].x))){
                touch.play();
                
                if (weapon.tabWeapon[number].bigOne == 1) {
                    boolBigOne = 1;
                    for(var j=0; j<listeMonster.length; j++){
                        if (((listeMonster[j].y) >= (weapon.tabWeapon[number].y - canvas.height*0.1)) && ((listeMonster[j].y) <= (weapon.tabWeapon[number].y + canvas.height*0.1))){
                            if (((listeMonster[j].x) <= (weapon.tabWeapon[number].x + canvas.width*0.09)) && ((listeMonster[j].x) >= (weapon.tabWeapon[number].x - canvas.width*0.09))){
                                listeMonster[j].vie--;
                                listeMonster[j].vie--;
                            }
                        }
                    }
                    ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                } else {
                    ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                    weapon.tabWeapon.splice(number,1);
                    listeMonster[i].vie--;
                    erase(listeMonster);
                }
                game.increase_score(5);
            }
        }
    }
    erase(listeMonster);
    if (boolBigOne == 1) {
        weapon.tabWeapon.splice(number,1);
        erase(listeMonster);
    }
}

//FUNCTION COLLASPSE WEAPON ENNEMY WITH SHIP

function checkCollapseShip(number){
    if(weapon.tabWeaponMonster[number].y >= spaceShip.y-canvas.height*0.03){
        if(((weapon.tabWeaponMonster[number].x)<=(spaceShip.x+canvas.width*0.04))&&((weapon.tabWeaponMonster[number].x)>=(spaceShip.x))){
            ctx.clearRect(weapon.tabWeaponMonster[number].x, weapon.tabWeaponMonster[number].y, 10, 40);
            colorSpaceShip();
            weapon.tabWeaponMonster.splice(number,1);
            spaceShip.vie--;
            spaceShipVie();
            if(spaceShip.vie==0){
                alert("game over");
                game.lose();
            }
        }
    }
}



// TRAJECTOIRE MISSILE MONSTER

function trajectoire(number) { // The goal of this function is to send a missile by a monster in anticipate the motion of the spaceship
    var pas;
    var quotient;
    if (spaceShip.direction == -1){ // if the ship is gonna go to the left, the monster shot to the left of the spaceship
        
        if (weapon.tabWeaponMonster[number].weaponAlreadyTaken == 1) { // Check if the missile is already send down by the monster
            
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/0.03;
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire-canvas.width*0.06)/quotient;
            return(pas);
        } else {
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/0.03;
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire)/quotient;
            return(pas);
        }
    }
    
    else if (spaceShip.direction == +1){ // The same way with the right side
        
        if (weapon.tabWeaponMonster[number].weaponAlreadyTaken == 1) {
        
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/0.03;
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire+canvas.width*0.06)/quotient;
            return(pas);
        } else {
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/0.03;
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire)/quotient;
            return(pas);
        }
    }
}



//FUNCTION LOOP WEAPON

function updateWeapon() {
    img_weapon.onload = function() {
        for(var a=0; a < weapon.tabWeapon.length; a++){
            if (weapon.tabWeapon[a].bigOne == 1) {
                ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
                weapon.tabWeapon[a].y-=canvas.height*0.02;
                ctx.drawImage(img_weapon_big, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
                checkCollapse(a);
                
            } else {
                ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
                weapon.tabWeapon[a].y-=canvas.height*0.05;
                ctx.drawImage(img_weapon, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
                checkCollapse(a);
            }
            checkEdge(a);
        }
    };
    img_weapon.src = "img/SpaceInvadersLaser_spaceship.png";
    img_weapon_big.src = "img/SpaceInvadersLaser_spaceship_big.png";
    weapon_ID = setTimeout(updateWeapon, frameRateWeapon); // set the framerate of the user weapon
    monster.draw();
    spaceShip.draw();
}
 



function new_ammo () {
    
    new_ammo_ID = setTimeout(new_ammo,ammo_delay);
    console.log("okay");
    if (game.ammo < max_ammo) 
        {
             game.ammo =game.ammo +ammo_amount;
    ammoElement.innerHTML = "Ammo : "+game.ammo;
            ammo_bar.setAttribute("value",game.ammo);
        }

}

//FUNCTION LOOP WEAPON MONSTER



function updateWeaponMonster() {
    img_weapon.onload = function() {
        for(var a=0; a<weapon.tabWeaponMonster.length; a++){
            ctx.clearRect(weapon.tabWeaponMonster[a].x, weapon.tabWeaponMonster[a].y, 10, 40);
            weapon.tabWeaponMonster[a].y+=canvas.height*0.03;
            weapon.tabWeaponMonster[a].x+=canvas.width*trajectoire(a);
            weapon.tabWeaponMonster[a].weaponAlreadyTaken=0;
            ctx.drawImage(img_weapon, 90, 0, 220, 383, weapon.tabWeaponMonster[a].x, weapon.tabWeaponMonster[a].y, 10, 40);
            checkCollapseShip(a);
            checkEdgeWeaponMonster(a);
        }
    };
    img_weapon.src = "img/SpaceInvadersLaser.png";
    IDWeaponM = setTimeout(updateWeaponMonster, frameRateWeaponMonster);
    monster.draw();
}

function fire() {
    
    if ( game.running != false) {
        
        if (game.ammo > 0) {
            weapon.y=(spaceShip.y-canvas.height*0.05);
            weapon.x=spaceShip.x+canvas.height*0.017;
            weapon.tabWeapon.push({x:weapon.x, y:weapon.y, xTrajectoire: weapon.x, bigOne:0});
            game.ammo--;
            console.log(game.ammo);
            ammoElement.innerHTML = " Ammo : "+game.ammo;
            ammo_bar.setAttribute("value",game.ammo);
        }
    }
}

function fireBigOne () {
    if ( game.running != false) {
        if (game.ammo > 0) {
            weapon.y=(spaceShip.y-canvas.height*0.05);
            weapon.x=spaceShip.x+canvas.height*0.017;
            weapon.tabWeapon.push({x:weapon.x, y:weapon.y, xTrajectoire: weapon.x, bigOne:1});
            game.bigAmmo = 0;
        }
    }
}
