
// Object defining all the function next to the game
var game = {
    
     
    // Store the name and score of the player at the end of the game
     pseudo : "",
    high_score_this_game : {
        
        pseudo : "UNKNOW",
        score : "0",   
    },
    

    running : false ,       // Boolean remember if the game is running or not
    HS_onscreeen : false,   // remember if we actually displaying HighScore
    login_set : false,      // remember if the login is set or no
    
    score :0,               // Actual score of the player
    
    ammo : 15,
    bigAmmo : 0,
    level : 1,
    
    
    
/*************************************/
/*          High score function       */
/************************************/
    
    // Load the highscore from the localStorage
    load_high_score : function  () {
    
    high_score_list = localStorage.saved_high_score && JSON.parse(localStorage.saved_high_score);
},
    
    // Save the highscore on the local storage
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
        
            // display the highscore
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
            
            
            document.getElementById("pseudo_display").innerHTML = " Player : " + this.pseudo;
            this.change_state();
            
        }
    },
    
    
/**************************************/
/*          Level Score function      */
/*************************************/
    
    // Increase the score 
    increase_score : function (point) 
    {
        this.score += point ;
        scoreElement.innerHTML = " Score :"+ this.score;
        
    },
    
     
    // Winning function 
    win : function () {
        
        var display_winning = document.createElement("div"); // Create a new div area
        
        display_winning.setAttribute("id","win_screen");
        gameElement.appendChild(display_winning);
        
        // Display the winning screen
        display_winning.innerHTML = "<h1> Congrat's  ! <br> You destroy all the invaders  </h1>";
        display_winning.innerHTML += "<br> <h3> Your score is : "+this.score +" </h3> ";
        
        this.high_score_this_game.pseudo = login.pseudo;
        this.high_score_this_game.score = this.score;
        
        console.log(this.high_score_this_game);
        console.log(high_score_list);
        high_score_list.unshift(this.high_score_this_game);
        this.save_high_score();
        
        
        
    },
    
    // Lose function
    lose : function () {
        
        game.pause();
        var set = false;
        this.high_score_this_game.pseudo = this.pseudo;
        this.high_score_this_game.score = this.score;
        alert("hey");
       /* for ( var i =0 ;i< 10 ; i++) 
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
                
                this.save_high_score; */
        
        
        var display_lose = document.createElement("div"); // Create a new div area
        alert("hey");
        display_lose.setAttribute("id","win_screen");
        gameElement.appendChild(display_lose);
        
        // Display the winning screen
        display_lose.innerHTML = "<h1> Game Over <br> Invaders destroyed your spaceship </h1>";
        display_lose.innerHTML += "<br> <h3> Your score is : "+this.score +" </h3> ";
        
        
         var play_again_btn = document.createElement("button");
        play_again_btn.setAttribute("id","play_again");
        play_again_btn.innerHTML = "Play Again";
        play_again_btn.setAttribute("onclick","game.show_high_score");
        gameElement.appendChild(play_again_btn);
        
    },
    
/*****************************************/
/*              State function            */
/****************************************/
    
    // Pause the game
    pause : function () {
    
        //Pause all the timers
    clearTimeout(weapon_ID);
    clearTimeout(monster_weapon_ID );
    clearTimeout(monster_move_ID );
    clearTimeout(new_ammo_ID);
    clearTimeout(IDWeaponM);
    clearTimeout(timer_big_weapon_ID);
    
        
  state_btn.style.backgroundColor = "#ffcc00"; // Change the color of the statge button
        
    state_btn.innerHTML="Resume Game"; // CHange what the button display
        this.running = false; // Remember that the game is not running
},
    
    
    // Resume the game
    resume : function () {
        
        // Resume all the timers
        weapon_ID = setTimeout(updateWeapon, frameRateWeapon); 
        monster_weapon_ID = setTimeout(updateWeaponMonster, frameRateWeapon);
        monster_move_ID = setTimeout(updateMonster, frameRateMonster);
        new_ammo_ID = setTimeout(new_ammo,ammo_delay);
        IDWeaponM = setTimeout(updateWeaponMonster, frameRateWeaponMonster);
         timer_big_weapon_ID = setTimeout(timerBigWeapon, 20000);
        // Change the color of the button
        state_btn.style.backgroundColor = "#00F020"; 
        
        // Change whqt is displaying
        state_btn.innerHTML = "Pause Game";
        
        
        // set the game running
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
    
    
    
        // first fonciton call by the game
    start : function () {
        
        // Be shure that the game did not work when the user put his pseudo
  
       this.pause();
                // Draw the spacesip and the monster in the back of the login area
        spaceShip.draw();
        
        this.load_high_score();
        
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
        login_btn.setAttribute("id","login_btn");
        login_btn.innerHTML = "Confirm Pseudo";
        login_btn.setAttribute("onclick","game.setlogin()");
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
           this.login_set=true;
           // Launch the game
           this.resume ();
    }
    
    
}

// Login object
 


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







// Function that move the spaceShip with the orientation of the phone
function processGyro(alpha,beta,gamma)
{
        if (beta > 1.5) { // Only move if it's up than 1.5 for alloow the user to not move the spaceship when the phone is not exactly at beta 0
            if (spaceShip.x - canvas.width*((beta / 1000)*1.1) > 0 ) { // Check if the spaceship will not be outside the bound of the game
                spaceShip.direction=-1;  // Give the direction of the spaceship
              ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272); // Clear the last spaceship position
       spaceShip.x-=canvas.width*((beta / 1000)*1.1) ;
        spaceShip.draw(); 
            }
    } 
    else if (beta < -1.5){
        
         if (spaceShip.x + canvas.width*(( Math.abs(beta) / 1000)*1.1) < ((canvas.width *0.92) )) {
        spaceShip.direction=1;
        ctx.clearRect(spaceShip.x, spaceShip.y, 293, 272);
        spaceShip.x+= canvas.width*((Math.abs(beta) / 1000)*1.1);
        spaceShip.draw();
             
         }
    }
    
}


