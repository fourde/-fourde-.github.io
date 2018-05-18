

var game = {
    
     
    
    high_score_this_game : {
        
        pseudo : "UNKNOW",
        score : "0",
        
    },
    
    
    running : false ,
    HS_onscreeen : false,
    login_set : false,
    score :0,
    ammo : 15,
    level : 1,
    
    
    
/*************************************/
/*          High score function       */
/************************************/
    load_high_score : function  () {
    
    high_score_list = localStorage.saved_high_score && JSON.parse(localStorage.saved_high_score);
},
    
    save_high_score : function () {
        
        localStorage.setItem("saved_high_score",JSON.stringify(high_score_list));
        
        
    },
    // Show the high score on the screen
    show_high_score : function () {
        
        
           
        // if the screen is not actully displayed
        if (this.HS_onscreeen==false) {
            
            
            this.HS_onscreeen = true; // flag set if actually display
            this.pause(); // pause the game
            
            // create the highscore area div
            var highscore_area = document.createElement("div");
            gameElement.appendChild(highscore_area); // put it as child of the game area
            highscore_area.setAttribute("class","highscore_class"); // set his atributes
            highscore_area.setAttribute("id","highscore_area");
            highscore_area.setAttribute("name","highscore_area");

        
            // title
            highscore_area.innerHTML = "<h2> HighScore <br> Pseudo / Score </h2>";
        
            
            for(var i=0;i<high_score_list.length;i++) 
            {
                highscore_area.innerHTML += high_score_list[i].pseudo;
                highscore_area.innerHTML += "         " + high_score_list[i].score;
                highscore_area.innerHTML += "<br> <br>";
            }
        }
        else {  
                var highscore_area = document.getElementById("highscore_area");
                gameElement.removeChild(highscore_area);
            this.HS_onscreeen= false;
            
            
            document.getElementById("pseudo_display").innerHTML = " Player : " + login.pseudo;
            this.change_state();
            
        }
    },
    
    
/**************************************/
/*          Level Score function      */
/*************************************/
    
    increase_score : function (point) 
    {
        this.score += point ;
        scoreElement.innerHTML = " Score :"+ this.score;
        
    },
    
    
    check_level : function ()
    {
    if (monster.tabMonster.length==0) 
        {
            this.level++;
        }
        
    },
    
    change_level : function () 
    {
        
    },
    
    
    win : function () {
        
        var display_winning = document.createElement("div");
        
        display_winning.setAttribute("id","win_screen");
        gameElement.appendChild(display_winning);
        
        display_winning.innerHTML = "<h1> Congrat's  ! <br> You destroy all the invaders  </h1>";
        display_winning.innerHTML += "<br> <h3> Your score is : "+this.score +" </h3> ";
        
        this.high_score_this_game.pseudo = login.pseudo;
        this.high_score_this_game.score = this.score;
        
        console.log(this.high_score_this_game);
        console.log(high_score_list);
        high_score_list.unshift(this.high_score_this_game);
        this.save_high_score();
        
        
        
    },
    
    lose : function () {
        
        var set = false;
        this.high_score_this_game.pseudo = login.pseudo;
        this.high_score_this_game.score = this.score;
        alert("hey");
        for ( var i =0 ;i< 10 ; i++) 
            {
                if(high_score_list[i].score < this.high_score_this_game.score)
                    {
                        alert(i);   
                        high_score_list.splice(i-1,0,this.high_score_this_game);
                        set = true;
                    }
            }
        
         if (set == false) 
                {
                    alert ("false");
                    if (high_score_list.length <10 )
                        {
                            alert("push");
                            high_score_list.push(this.high_score_this_game);
                        }
                }
                
                this.save_high_score;
        
        
    },
    
/*****************************************/
/*              State function            */
/****************************************/
    
    // Pause the game
    pause : function () {
    
        //vPause all the timers
    clearTimeout(weapon_ID);
    clearTimeout(monster_weapon_ID );
    clearTimeout(monster_move_ID );
    clearTimeout(new_ammo_ID);
    clearTimeout(IDWeaponM);
    
        
        window.addEventListener("deviceorientation", function () 
    {
        processGyro(event.alpha, event.beta, event.gamma); 
        
    }, false);
        
  state_btn.style.backgroundColor = "#ffcc00"; 
        
    state_btn.innerHTML="Resume Game";
        this.running = false;
},
    
    resume : function () {
        
        weapon_ID = setTimeout(updateWeapon, frameRateWeapon); // set the framerate of the user weapon
        monster_weapon_ID = setTimeout(updateWeaponMonster, frameRateWeapon);
        monster_move_ID = setTimeout(updateMonster, frameRateMonster);
        new_ammo_ID = setTimeout(new_ammo,ammo_delay);
        IDWeaponM = setTimeout(updateWeaponMonster, frameRateWeaponMonster);
    
        
    window.addEventListener("deviceorientation", function () 
    {
        processGyro(event.alpha, event.beta, event.gamma); 
        
    }, true);
        
        state_btn.style.backgroundColor = "#00F020"; 
        state_btn.innerHTML = "Pause Game";
        
        
        
        
        this.running=true;
    
    },
        
    // Changing the state of the game
    change_state : function () {
    
            //Don't work if the player didn't put his login or if the game display the high_score
        if ((this.login_set == false) || (this.HS_onscreeen==true)){
        } else {
        
                // if the game is actually in pause, resume it 
            if ( this.running == false) 
            {
        
                game.resume();
            }
            else if  ( this.running == true) // if the game run, put it in pause
            {
                game.pause();
            }
        }
},
    
}


var login = {
    
    
    pseudo : "",
    
    // first fonciton call by the game
    display : function () {
        
        // Be shure that the game did not work when the user put his pseudo
       game.pause();
        // Create the form for the pseudo of the player
     var login_form = document.createElement("form");
        login_form.setAttribute("class","login_class");
        login_form.setAttribute("name","form_name");
        login_form.setAttribute("id","login_form");
        console.log(login_form);
        
        // Add a label to the form
    var login_label = document.createElement("label");
        login_form.appendChild(login_label);
        login_label.innerHTML = "Enter your Pseudo : ";
        
        
        
        // be shure that we don't reset the web page when we submit the form
        login_form.addEventListener('submit', function(event){event.preventDefault();});
        
        // Create the input for the pseudo of the player
    var login_input = document.createElement("input");
        login_input.setAttribute("name","login_value");
        login_input.setAttribute("type", "text");
        login_input.setAttribute("color","#3CBC8D");
        login_input.setAttribute("class","login_value");
        login_form.appendChild(login_input);
        
        
        // Create the submit buttun
    var login_btn = document.createElement("button");
        login_btn.setAttribute("class","login_btn_class");
        login_btn.innerHTML = "Confirm Pseudo";
        login_btn.setAttribute("onclick","login.setlogin()");
        login_form.appendChild(login_btn);
        
        
    var welcome = document.createElement("div");
        welcome.setAttribute("id","welcome");
        welcome.setAttribute("top","0%");
        welcome.setAttribute("id","welcome");
        welcome.innerHTML= "<h4> Welcome <br> to <br> SpaceJU 2018 </h4>";
        
    
        
        
        
        // add the welcome
        gameElement.appendChild(welcome);
        // add the form to the game area
        gameElement.appendChild(login_form);

        // Draw the spacesip and the monster in the back of the login area
        spaceShip.draw();
        
        game.load_high_score();
        
},
        // take the value write on the form 
       setlogin : function () {
        
        this.pseudo = document.form_name.login_value.value;
           
        // remove the child for stop showing the form
        gameElement.removeChild(login_form);
        gameElement.removeChild(welcome);
        
       
           // Write the pseudo on the top of the sreen
         document.getElementById("pseudo_display").innerHTML = " Player : " + this.pseudo;
           
           // remember that the pseudo is set
           game.login_set=true;
           // Launch the game
           game.resume ();
    } 
}   


// Moving function 


document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        spaceShip.direction=-1;
        ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
        spaceShip.x-=canvas.width*0.03 ;
        spaceShip.draw();
        //weapon.draw();
    } 
    else if (event.key === "ArrowRight"){
        
        
        if (spaceShip.x + canvas.width*0.03 < canvas.width ) {
                spaceShip.direction=1;
              ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
        spaceShip.x+= canvas.width*0.03;
        spaceShip.draw();
            console.log(spaceShip.x);
            }
    }
    else if (event.key === "ArrowDown"){
        
        fire();
    }
    
    
 
});





if (window.DeviceOrientationEvent) 
{
    window.addEventListener("deviceorientation", function () 
    {
        processGyro(event.alpha, event.beta, event.gamma); 
        
    }, true);
} 


function processGyro(alpha,beta,gamma)
{
	
   
        if (beta > 1.5) {
  
            
            
            if (spaceShip.x - canvas.width*((beta / 1000)*1.1) > 0 ) {
                spaceShip.direction=-1;
              ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
       spaceShip.x-=canvas.width*((beta / 1000)*1.1) ;
        spaceShip.draw(); 
            }
     
            
        //weapon.draw();
    } 
    else if (beta < -1.5){
        
         if (spaceShip.x + canvas.width*(( Math.abs(beta) / 1000)*1.1) < ((canvas.width *0.92) )) {
        spaceShip.direction=1;
        ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
        spaceShip.x+= canvas.width*((Math.abs(beta) / 1000)*1.1);
        spaceShip.draw();
             
         }
    
        //weapon.draw();
    }
    
}


