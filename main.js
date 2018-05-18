var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var img_space_ship = new Image();

var img_monster = new Image();

var img_weapon = new Image();

var img_monster_2 = new Image();

var img_monster_3 = new Image();


var high_score_list = [];


var bool = 1;
var frameRateMonster = 800;
var frameRateWeapon = 100;
var frameRateWeaponMonster = 220;
var positionSpaceShipIniX = [];
var ammo_delay =3000;
var ammo_amount = 2 ;
var max_ammo = 15;


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
};
spaceShip.draw();


//OBJECT MONSTER


var monster  = {
    niveau : 1,
    number: 30,
    x: canvas.width*0.2,
    y: canvas.height*0.07,
    direction: 1,
    tabMonster:[],
    tabMonsterNiv2: [],
    tabMonsterNiv3: [],
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
};


//INITIALSIATION OF MONSTER LIST 

for(var j=0; j<2; j++){
    for (var i=0; i<10;i++){
        monster.tabMonster.push({x: monster.x+i*canvas.width*0.06, y:monster.y+j*canvas.height*0.08, vie:1});
        monster.tabMonsterNiv2.push({x: monster.x+i*canvas.width*0.06, y:monster.y+j*canvas.height*0.08, vie:2});
        monster.tabMonsterNiv3.push({x: monster.x+i*canvas.width*0.06, y:monster.y+j*canvas.height*0.08, vie:3});
        if (monster.niveau == 3){
            
        }
        if (j==0) {
            monster.tabMonster[i].vie=2;
        }
    }
}
if (monster.niveau == 3){
    for (var i=0; i<10;i++){
        monster.tabMonsterNiv3.push({x: monster.x+i*canvas.width*0.06, y:monster.y+2*canvas.height*0.08, vie:3});
    }
}
console.log(monster.tabMonster);
monster.draw();



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


var weapon ={
    number:1000,
    xM:monster.tabMonster[Math.floor(Math.random()*monster.tabMonster.length)].x,
    yM:monster.tabMonster[Math.floor(Math.random()*monster.tabMonster.length)].y,
    x:spaceShip.x,
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
    }
    
}
//weapon.drawMonsterWeapon();

//LOOP MONSTRE


function updateMonster() {
    
    var listeMonster = level();
    
        for (var i=0; i<listeMonster.length;i++){
            ctx.clearRect(listeMonster[i].x, listeMonster[i].y, 65, 40);
        }
    
    if(monster.direction==1){
        
        if(listeMonster[0].x<canvas.width*0.35){
            
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
    
    monster_move_ID = setTimeout(updateMonster, frameRateMonster);
    /*if (spaceShip.game==0){
        clearTimeout(ID);
    }*/
}



//CHECK IF WEAPON IS UNDER EDGE

function checkEdge(number){
    if(weapon.tabWeapon[number].y<0){
        ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
        weapon.tabWeapon.splice(number,1);
    }
}

//FUNCTION LOOP COLLAPSE MONSTRE WITH WEAPON


function checkCollapse(number){
    
    var listeMonster = level();
    
    for(var i=0; i<listeMonster.length; i++){
        if(weapon.tabWeapon[number].y <= listeMonster[i].y){
            if(((weapon.tabWeapon[number].x)<=(listeMonster[i].x+canvas.width*0.05))&&((weapon.tabWeapon[number].x)>=(listeMonster[i].x))){
                touch.play();
                ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                weapon.tabWeapon.splice(number,1);
                listeMonster[i].vie--;
                game.increase_score(5);
                //ctx.clearRect(weapon.tabWeapon[number].x, weapon.tabWeapon[number].y, 10, 40);
                //ctx.clearRect(monster.tabMonster[i].x, monster.tabMonster[i].y, 65, 40);
                if(listeMonster[i].vie==0){
                    ctx.clearRect(listeMonster[i].x, listeMonster[i].y, 65, 40);
                    listeMonster.splice(i,1);
                    game.increase_score(10);
                }
                if (listeMonster.length == 0) {
                    monster.niveau++;
                    spaceShip.vie = 3;
                    
                }
            }
        }
    }
}



function checkCollapseShip(number){
    if(weapon.tabWeaponMonster[number].y >= canvas.height*0.77){
        if(((weapon.tabWeaponMonster[number].x)<=(spaceShip.x+canvas.width*0.05))&&((weapon.tabWeaponMonster[number].x)>=(monster.tabMonster[i].x))){
            ctx.clearRect(weapon.tabWeaponMonster[number].x, weapon.tabWeaponMonster[number].y, 10, 40);
            weapon.tabWeaponMonster.splice(number,1);
            spaceShip.vie--;
            if(spaceShip.vie==0){
                /*ctx.clearRect(monster.tabMonster[i].x, monster.tabMonster[i].y, 65, 40);
                monster.tabMonster.splice(i,1);*/
                alert("game over");
            }
        }
    }
}

// TRAJECTOIRE MISSILE

function trajectoire(number) {
    var pas;
    var quotient;
    //console.log(positionSpaceShipIniX);
    if (spaceShip.direction == -1){
        
        if (weapon.tabWeaponMonster[number].weaponAlreadyTaken == 1) {
            
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/0.03;
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire-canvas.width*0.06)/quotient;
            return(pas);
        } else {
            quotient = (canvas.height*0.8-weapon.tabWeaponMonster[number].yTrajectoire)/0.03;
            pas = (positionSpaceShipIniX[number] - weapon.tabWeaponMonster[number].xTrajectoire)/quotient;
            return(pas);
        }
    }
    
    else if (spaceShip.direction == +1){
        
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
        for(var a=0; a<weapon.tabWeapon.length; a++){
            ctx.clearRect(weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
            weapon.tabWeapon[a].y-=canvas.height*0.05;
            ctx.drawImage(img_weapon, 90, 0, 220, 383, weapon.tabWeapon[a].x, weapon.tabWeapon[a].y, 10, 40);
            checkCollapse(a);
            checkEdge(a);
        }
    };
    img_weapon.src = "img/SpaceInvadersLaser_spaceship.png";
     weapon_ID = setTimeout(updateWeapon, frameRateWeapon); // set the framerate of the user weapon
}
 



function new_ammo () {
    
    
    if (game.ammo < max_ammo) 
        {
             game.ammo =game.ammo +ammo_amount;
    ammoElement.innerHTML = "Ammo : "+game.ammo;
    new_ammo_ID = setTimeout(new_ammo,ammo_delay);
            
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
        }
    };
    img_weapon.src = "img/SpaceInvadersLaser.png";
    IDWeaponM = setTimeout(updateWeaponMonster, frameRateWeaponMonster);
}

function fire() {
    
    if ( game.running != false) {
        
        if (game.ammo > 0) {
            weapon.y=(spaceShip.y-canvas.height*0.05);
            weapon.x=spaceShip.x;
             weapon.tabWeapon.push({x:weapon.x, y:weapon.y, xTrajectoire: weapon.x});
            game.ammo--;
            console.log(game.ammo);
            ammoElement.innerHTML = " Ammo : "+game.ammo;
            ammo_bar.setAttribute("value",game.ammo);
            
        }

    }
}











// login object

