/* Client-Side Programing Project */

/************************************************/
        /********** SPACE JU **************/
/************************************************/

// Emilien Levefre
// Ulysse Fourquin

// Jonkoping University
// 2018


/* The code mainly work around several object, the game object which stock all the variables like ammo amount or pseudo of the player, and is use for display evrything around the game canvas
And the Monster / Weapon / SpaceShip objects which stand for all the in game action, like move the invaders or fire with the spaceship
*/

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
// variable which meant an image

var img_space_ship = new Image();

var img_monster = new Image();

var img_weapon = new Image();

var img_weapon_big = new Image();

var img_monster_2 = new Image();

var img_monster_3 = new Image();

var img_space_ship_hit = new Image();


// diferrente variable

var high_score_list = [];
var counterBigWeaponTimer = 0; // a counter to know when we can use the big weapon
var frameRateMonster = 1000; // used is settimeout in function updatemonster
var frameRateWeapon = 90; // used is settimeout in function updateweapon
var frameRateWeaponMonster = 220; // used is settimeout in function updateweapon
var positionSpaceShipIniX = [];
var ammo_delay =3000; 
var ammo_amount = 2 ; // initialise the number of ammo
var max_ammo = 15;
var counter_touch = 0; // counter to know when the space ship have to blink


var touch = new Audio("touch.mp3");

// variable used for the html

var gameElement = document.getElementById("game_area");
var state_btn = document.getElementById("state_btn");
var scoreElement = document.getElementById("score_display");
var ammoElement = document.getElementById("ammo_display");
var ammo_bar = document.getElementById("ammo_bar");
var special_ammo_bar = document.getElementById("special_ammo_bar");
var special_btn = document.getElementById("special_fire");


ammo_bar.setAttribute("max",max_ammo);
special_ammo_bar.setAttribute("max",15);
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
    vie: 3, // life of the ship
    game: 1, // to know if we lose the game
    x: canvas.width*0.5, // initialisation of the coordinates space ship
    y: canvas.height*0.8,
    direction: 1, // direction of the space ship
    
    draw: function () {
        var xb = this.x;
        var yb = this.y;
        img_space_ship.onload = function() {
            ctx.drawImage(img_space_ship, 0, 60, 293, 272, xb, yb, 65, 40);
        };
        img_space_ship.src = "img/space-invader.png";
    },
    
    erased: function (){  // function the just clear the canvas but not to delete the list
        ctx.clearRect(this.x, this.y, 65, 40);
    },
};
spaceShip.draw();


//OBJECT MONSTER


var monster  = {
    niveau : 1, // level of difficulties of the game
    number: 30, // number of monster
    x: canvas.width*0.16, // initialisation of coordinates of the first monster
    y: canvas.height*0.07,
    direction: 1, // direction of the monster
    tabMonster:[], // list of monster for the first level
    tabMonsterNiv2: [], // list of monster for the second level
    tabMonsterNiv3: [], // list of monster for the third level
    
    initialisation: function() { // function to initialise the list of the monster in order to to display them on the canvas. The list is different with the level
        for(var j=0; j<2; j++){
            for (var i=0; i<10;i++){
                this.tabMonster.push({x: this.x+i*canvas.width*0.07, y:this.y+j*canvas.height*0.08, vie:1}); // one monster shift with others
                this.tabMonsterNiv2.push({x: this.x+i*canvas.width*0.07, y:this.y+j*canvas.height*0.08, vie:2}); // one monster shift with others
                this.tabMonsterNiv3.push({x: this.x+i*canvas.width*0.07, y:this.y+j*canvas.height*0.08, vie:3}); // one monster shift with others
                if (this.niveau == 3){

                }
                if (j==0) {
                    this.tabMonster[i].vie=2;
                }
            }
        }
        if (this.niveau == 3){
            for (var i=0; i<10;i++){
                this.tabMonsterNiv3.push({x: this.x+i*canvas.width*0.06, y:this.y+2*canvas.height*0.08, vie:3}); // if the level is 3, the life of the monster biger, 3 life
            }
        }
    },
    
    draw: function () { // the function draw the monster on the canvas, according to the level of the game. 
        
        var listeMonster = level(); // some variable used just after. I use them because problem can appear with the function onload
        var tabLength = listeMonster.length;
        var tabTest = listeMonster;
        
        img_monster.onload = function() {
            for (var i=0; i<tabLength;i++){
                ctx.drawImage(img_monster, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40); // Draw the image thanks to the coordinates of the list of the monster
                
                if( tabTest[i].vie == 2 ) {
                    ctx.drawImage(img_monster_2, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40); // Draw the image thanks to the coordinates of the list of the monster
                }
                if( tabTest[i].vie == 3 ) {
                    ctx.drawImage(img_monster_3, 0, 60, 1600, 950, tabTest[i].x, tabTest[i].y, 65, 40); // Draw the image thanks to the coordinates of the list of the monster
                }
            }
        };
        img_monster.src = "img/mechant1.png";
        img_monster_2.src = "img/mechant2.png";
        img_monster_3.src = "img/mechant3.png";
    },
    
    erased: function (){  // function the just clear the canvas but not to delete the list
        
        var listeMonster = level();
    
        for (var i=0; i<listeMonster.length;i++){
            ctx.clearRect(listeMonster[i].x, listeMonster[i].y, 65, 40);
        }
        
    }
};
monster.initialisation();


//DISPLAY NUMBER OF LIFE OF THE SHIP


function spaceShipVie () { // function to display at the top right of the canvas the number of life of the ship
    img_space_ship.onload = function() {
        ctx.clearRect(canvas.width*0.73, canvas.height*0.01, 300, 25);
        for (var i =0; i<spaceShip.vie; i++) {
            ctx.drawImage(img_space_ship, 0, 60, 293, 272, canvas.width*(0.90-i*0.05), canvas.height*0.01, 45, 25); // Just draw mini ship
        }
    };
    img_space_ship.src = "img/space-invader.png";
}
spaceShipVie();



//FUNCTION LEVEL

function level(){ // This function, very usefull, allow the use the different list of monster according to the level
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

//OBJET WEAPON


var weapon = {
    
    number:1000,
    xM:monster.tabMonster[Math.floor(Math.random()*monster.tabMonster.length)].x, // initialise the coordinate of the monster's weapon randomly
    yM:monster.tabMonster[Math.floor(Math.random()*monster.tabMonster.length)].y,
    x:spaceShip.x+canvas.height*0.01, // initialisation the weapon of the ship with the coordinates of the ship
    y:spaceShip.y-canvas.height*0.05,
    tabWeapon: [], // list of the coordinates of the weapon of the ship
    tabWeaponMonster: [], // list of the coordinates of the weapon of the monster
    
    draw: function () { // the function draw the weapon on the canvas
        
        var xb = this.x; // some variable used just after. I use them because problem can appear with the function onload
        var yb = this.y;
        img_weapon.onload = function() { // to draw the weapon on the canvas
            ctx.drawImage(img_weapon, 90, 0, 220, 383, xb, yb, 10, 40); 
        };
        img_weapon.src = "img/SpaceInvadersLaser.png";
    },
    
    drawMonsterWeapon: function () {
        var xb = this.xM; // some variable used just after. I use them because problem can appear with the function onload
        var yb = this.yM;
        img_weapon.onload = function() { // to draw the weapon on the canvas
            ctx.drawImage(img_weapon, 90, 0, 220, 383, xb, yb, 10, 10);
        };
        img_weapon.src = "img/SpaceInvadersLaser.png";
    },
    
    erased: function (){ // function the just clear the canvas but not to delete the list
    
        for (var i=0; i<this.tabWeapon; i++){
            ctx.clearRect(this.tabWeapon[i].x, this.tabWeapon[i].y, 10, 40);
        }
        
        for (var i=0; i<this.tabWeaponMonster; i++){
            ctx.clearRect(this.tabWeaponMonster[i].x, this.tabWeaponMonster[i].y, 10, 10);
        }
        
    },
    
};


//FUNCTION CLEAR

function clearGame () { // clear the display of the game during a pause for instance
    weapon.erased();
    spaceShip.erased();
    monster.erased();
}


//LOOP MONSTRE


function updateMonster() {
    
    var listeMonster = level(); // variable which record the actually list of monster, beacause the level can change
    
        for (var i=0; i<listeMonster.length;i++){ // Begin in clearing all the monster and then... move them
            ctx.clearRect(listeMonster[i].x, listeMonster[i].y, 65, 40);
        }
    
    if(monster.direction==1){ // Just to know the direction of all the monster
        
        if(listeMonster[0].x<canvas.width*0.25){ //If monster not out of the map
            
            for(var j=0; j<listeMonster.length; j++){ 
                listeMonster[j].x+=canvas.width*0.03; // motion of the monster to the right : We just increase the coordinates into the list
            }
            
        } else{ //If monster out of the map
            
            monster.direction=-1; // let's go the other sight
            for(var j=0; j<listeMonster.length; j++){
                listeMonster[j].y+=canvas.height*0.05; // motion of the monster to the down
            }
        }
    }
    
    else if(monster.direction==-1){ // quite same statement than previously
        
        if(listeMonster[0].x>canvas.width*0.11){
            
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
    monster.draw(); // display the monster
    
    weapon.yM=(listeMonster[Math.floor(Math.random()*listeMonster.length)].y+canvas.height*0.02); // Choose randomly a monster who'll begin a new shot and record his coordinates
    
    weapon.xM=listeMonster[Math.floor(Math.random()*listeMonster.length)].x;

    weapon.tabWeaponMonster.push({x:weapon.xM, y:weapon.yM, xTrajectoire: weapon.xM, yTrajectoire: weapon.yM, weaponAlreadyTaken: 0, pas:0.03}); // Push these coordinates into the list of                                                                                                                                              //weapon of the monster
    
    positionSpaceShipIniX.push(spaceShip.x); // This list will alow us to remember the position of the ship while the monster is shooting. This is usefull during the function trajectoire                                            //appeal
    
    if (checkCollapseNoWeapon()) { // If a monster touch the ship
        game.lose();
    }
    
    monster_move_ID = setTimeout(updateMonster, frameRateMonster); // motion of all the monster at each time
}


//COLOR IF COLLAPSE SPACESHIP


function colorSpaceShip() { // When the ship is hit, he will blink between green and red
    
    img_space_ship_hit.onload = function() {
        ctx.drawImage(img_space_ship_hit, 0, 60, 293, 272, spaceShip.x, spaceShip.y, 65, 40);
    };
    img_space_ship_hit.src = "img/space-invader_touch.png";
    counter_touch++;
    color_spaceShip_hit_ID = setTimeout(colorSpaceShip, 150); // a short settimeout to allow a short blink
    
    if (counter_touch == 12) {
        counter_touch=0;
        clearTimeout(color_spaceShip_hit_ID);
    }
}


//FUNCTION TIMER BIG WEAPON


function timerBigWeapon() {
    counterBigWeaponTimer++;
    if(game.bigAmmo==0) {
    timer_big_weapon_ID = setTimeout(timerBigWeapon, 1000);
    }
    if(game.bigAmmo==1)
        {
           clearTimeout(timer_big_weapon_ID); 
        }
    special_ammo_bar.setAttribute("value",counterBigWeaponTimer);
    if (counterBigWeaponTimer == 15) {
        special_btn.style.background = "#00F020";
        game.bigAmmo = 1;
        counterBigWeaponTimer = 0;
        clearTimeout(timer_big_weapon_ID);
    }
}
timerBigWeapon();


//CHECK IF WEAPON IS OUT OF EDGE


function checkEdge(number){
    if(weapon.tabWeapon[number].y<0){ //If the weapon of the ship is out of the map...
        ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40); // ...we clear it...
        weapon.tabWeapon.splice(number,1); //.. and delete the weapon's coordinates from the list.
    }
}


//CHECK IF WEAPON MONSTER IS OUT EDGE 


function checkEdgeWeaponMonster(number){
    if(weapon.tabWeaponMonster[number].y >= canvas.height*0.95){ //If the weapon of monster is out of the map...
        ctx.clearRect(weapon.tabWeaponMonster[number].x, weapon.tabWeaponMonster[number].y, 10, 10); // ...we clear it...
        weapon.tabWeaponMonster.splice(number,1);//.. and delete the weapon's coordinates from the list.
        positionSpaceShipIniX.splice(number,1);//.. and delete the spaceShip's coordinates from the list which is used in the function trajectoire.
    }
}




//FUNCTION ERASE


function erase(list){ // This function is used in the function checkCollapse. If a spaceship's weapon hit a monster, we just clear the monster on the canvas
    for(var i=0; i<list.length; i++){
        if(list[i].vie <= 0){ // If the monster hasn't anymore life
            ctx.clearRect(list[i].x, list[i].y, 65, 40);
            list.splice(i,1); // We delete the monster from his list
            game.increase_score(10); // increase the score
        }
        if (list.length == 0) { // if there isn't anymore monster, next level
            if (monster.niveau == 3){ // If win
                game.win();
            }
            monster.niveau++;
            spaceShip.vie = 3;        
        }
    }
}


//COLLAPSE MONTER WITH SPACESHIP


function checkCollapseNoWeapon () { // function to know if the monster have reach the spaceShip
    
    var listeMonster = level();
    
    for(var i=0; i<listeMonster.length; i++){
        if ((listeMonster[i].y >= spaceShip.y+canvas.height*0.02)) { // if the coordinates of one of the monster
            if (listeMonster[i].x >= spaceShip.x-canvas.width*0.02) {// are the same than the monster
                return (true)
            }
        } else {
            return(false)
        }
    }
}


//FUNCTION LOOP COLLAPSE MONSTER WITH WEAPON


function checkCollapse(number){
    
    var listeMonster = level(); // variable which record the actually list of monster, beacause the level can change and then the list too, monster are different with the level
    var boolBigOne = 0; // boolean to know if the spaceship's weapon is a big or a small
    
    for(var i=0; i<listeMonster.length; i++){
        
        if(weapon.tabWeapon[number].y <= listeMonster[i].y){ 
            if(((weapon.tabWeapon[number].x)<=(listeMonster[i].x+canvas.width*0.05))&&((weapon.tabWeapon[number].x)>=(listeMonster[i].x-canvas.width*0.01))){ //If the coordinates of the                                                                                                                                   //weapon are quite the  same than the monster...
                touch.play();
                navigator.vibrate(1000);
                
                if (weapon.tabWeapon[number].bigOne == 1) { // If it's the big weapon...
                    boolBigOne = 1;
                    for(var j=0; j<listeMonster.length; j++){ // Another loop to know which monster will be hit by the big weapon. The next first if will meant the height of the weapon
                                                              //and the seconde one meant his width
                        if (((listeMonster[j].y) >= (weapon.tabWeapon[number].y - canvas.height*0.1)) && ((listeMonster[j].y) <= (weapon.tabWeapon[number].y + canvas.height*0.1))){
                            if (((listeMonster[j].x) <= (weapon.tabWeapon[number].x + canvas.width*0.09)) && ((listeMonster[j].x) >= (weapon.tabWeapon[number].x - canvas.width*0.09))){
                                listeMonster[j].vie--; //decrease the life of the monster hit
                                listeMonster[j].vie--;
                            }
                        }
                    }
                    ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40); // clear their display from de canvas
                    
                } else { // if it's a normal weapon
                    ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                    weapon.tabWeapon.splice(number,1); // delete the weapon from his list
                    listeMonster[i].vie--; // decrease the life of the monster hit
                    erase(listeMonster); // clear the canvas
                }
                game.increase_score(5);
            }
        }
    }
    erase(listeMonster);
    if (boolBigOne == 1) {
        weapon.tabWeapon.splice(number,1); // delete the weapon from his list
        erase(listeMonster); //clear the canvas
    }
}

//FUNCTION COLLASPSE WEAPON ENNEMY WITH SHIP

function checkCollapseShip(number){ // check to know if a weapon ennemy will hit the ship
    
    if((weapon.tabWeaponMonster[number].y+canvas.height*0.03 >= spaceShip.y) && (weapon.tabWeaponMonster[number].y+canvas.height*0.03 <= spaceShip.y+canvas.height*0.06)){
        if(((weapon.tabWeaponMonster[number].x)<=(spaceShip.x+canvas.width*0.04))&&((weapon.tabWeaponMonster[number].x)>=(spaceShip.x))){//If the coordinates of the weapon are quite the                                                                                                                                    //same than the ship...
            
            ctx.clearRect(weapon.tabWeaponMonster[number].x, weapon.tabWeaponMonster[number].y, 10, 10); // just clear the weapon of the monster after hit
            colorSpaceShip(); // blink of the ship
            weapon.tabWeaponMonster.splice(number,1); // delete the weapon from his list
            positionSpaceShipIniX.splice(number,1);
            spaceShip.vie--; // decrease the life of the ship
            spaceShipVie(); // erased one ship at the top right of the canvas
            
            if(spaceShip.vie==0){ // if the ship don't have enough life, end of the game
                game.lose();
                clearGame();
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
            return(weapon.tabWeaponMonster[number].pas); // If it is, return the previous "step" --> pas
            
        } else { // If not, it's beacause it's a new shoot, also create a new "step".
            
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/(canvas.height*0.03); //The quotient is the number of time for the weapon of the monster went at the 
                                                                                                              //same y than the spaceship.
            
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire - canvas.width*0.06)/quotient; // we can also no the "step" of the weapon thanks to the                                                                                                                        //quotient.
            weapon.tabWeaponMonster[number].pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire-canvas.width*0.06)/quotient;
            
            return(pas);
        }
    }
    
    else if (spaceShip.direction == +1){ // The same way with the right side
        
        if (weapon.tabWeaponMonster[number].weaponAlreadyTaken == 1) { //quite same statement than before
            return(weapon.tabWeaponMonster[number].pas);
        } else {
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/(canvas.height*0.03);
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire + canvas.width*0.06)/quotient;
            weapon.tabWeaponMonster[number].pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire+canvas.width*0.06)/quotient;
            return(pas);
        }
    }
}



//FUNCTION LOOP WEAPON



function updateWeapon() { // function appealed with a short settimeout. This one is for weapon of the ship
    img_weapon.onload = function() {
        for(var a=0; a < weapon.tabWeapon.length; a++){ // a loop to see inside the list of the weapon of the ship. Inside this liste, there are the coordinates of each weapon who has been                                                 //shoot by the user
            
            if (weapon.tabWeapon[a].bigOne == 1) {
                ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40); // clear the previous weapon before a new display of the weapon of the ship
                weapon.tabWeapon[a].y-=canvas.height*0.02; // increase the move of the big weapon
                ctx.drawImage(img_weapon_big, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);  // display of the new motion
                checkCollapse(a); // check to see if there is collapse between the weapon and the monster
                
            } else {
                ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40); // clear before a new display
                weapon.tabWeapon[a].y-=canvas.height*0.05; // increase the move of the weapon
                ctx.drawImage(img_weapon, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40); // display of the new motion of the weapon
                checkCollapse(a); // check to see if there is collapse between the weapon and the monster
            }
            checkEdge(a); // check to see if the weapon is out of the canvas
        }
    };
    img_weapon.src = "img/SpaceInvadersLaser_spaceship.png";
    img_weapon_big.src = "img/SpaceInvadersLaser_spaceship_big.png";
    monster.draw(); // just draw the monster 
    spaceShip.draw(); // and ship to avoid supperposition
    weapon_ID = setTimeout(updateWeapon, frameRateWeapon); // set the framerate of the user weapon
}
 

//FUNCTION FOR AMMO


function new_ammo () {
    
    new_ammo_ID = setTimeout(new_ammo,ammo_delay);
    //console.log("okay");
    if (game.ammo < max_ammo) 
        {
             game.ammo =game.ammo +ammo_amount;
    ammoElement.innerHTML = "Ammo : "+game.ammo;
            ammo_bar.setAttribute("value",game.ammo);
        }

}


//FUNCTION LOOP WEAPON MONSTER



function updateWeaponMonster() { // function appealed with a short settimeout. This one is for weapon of monster
    img_weapon.onload = function() {
        for(var a=0; a<weapon.tabWeaponMonster.length; a++){ // a loop to see inside the list of the weapon of the ship. Inside this liste, there are the coordinates of each weapon who has                                                      // been shoot by the monster
            ctx.clearRect(weapon.tabWeaponMonster[a].x, weapon.tabWeaponMonster[a].y, 10, 10); // clear the previous weapon before a new display of the weapon of the monster
            weapon.tabWeaponMonster[a].y+=canvas.height*0.03; // increase the move of the monster's weapon
            weapon.tabWeaponMonster[a].x+=trajectoire(a); // increase the move of the monster's weapon. but contrary to the weapon of the ship's weapon which is straight, this weapon can                                                 //move to the right and the left in the same time that it is going downstair
            
            weapon.tabWeaponMonster[a].weaponAlreadyTaken=1; // This data is used to know if weapon is already shot or if it's a first shot by a monster. In this case, we have to calculate 
                                                             // a new "step" which is use the motion of the weapon to right or the left.
            
            ctx.drawImage(img_weapon, 90, 0, 220, 383, weapon.tabWeaponMonster[a].x, weapon.tabWeaponMonster[a].y, 10, 10); // clear the previous weapon before a new display of the weapon                                                                                                                 //of the monster
            checkCollapseShip(a); // Check if the monster hit the ship
            checkEdgeWeaponMonster(a);  // Check if the monster shot a weapon which is out of the canvas
        }
    };
    img_weapon.src = "img/SpaceInvadersLaser.png";
    monster.draw();
    IDWeaponM = setTimeout(updateWeaponMonster, frameRateWeaponMonster); 
}


// FUNCTION FIRE


function fire() { // When the user puch the button the send a weapon
    
    if ( game.running != false) { // is the player is playing
        
        if (game.ammo > 0) { // if there is ammo yet
            weapon.y=(spaceShip.y-canvas.height*0.05); // initialisation the coordinates of the weapon by the coordinates of the spaceship
            weapon.x=spaceShip.x+canvas.height*0.017;
            weapon.tabWeapon.push({x:weapon.x, y:weapon.y, xTrajectoire: weapon.x, bigOne:0}); // push these coordinates into the list of ship's weapon
            game.ammo--; // decrease the ammo
            ammoElement.innerHTML = " Ammo : "+game.ammo; // display the number of ammo
            ammo_bar.setAttribute("value",game.ammo);
        }
    }
}


//FUNCTION FIRE FOR THE BIG ONE


function fireBigOne () {
    if ( game.running != false) {
        if (game.bigAmmo > 0) {
            weapon.y=(spaceShip.y-canvas.height*0.05);
            weapon.x=spaceShip.x+canvas.height*0.017;
            weapon.tabWeapon.push({x:weapon.x, y:weapon.y, xTrajectoire: weapon.x, bigOne:1});
            game.bigAmmo = 0;
             timer_big_weapon_ID = setTimeout(timerBigWeapon, 1000);
            special_btn.style.background = "blue";
            
            
        }
    }
}