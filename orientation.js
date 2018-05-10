if (window.DeviceOrientationEvent) 
{
    window.addEventListener("deviceorientation", function () 
    {
        processGyro(event.alpha, event.beta, event.gamma);  
    }, true);
} 


function processGyro(alpha,beta,gamma)
{
	document.getElementById("alpha").innerHTML=alpha;
	document.getElementById("beta").innerHTML=beta;
	document.getElementById("gamma").innerHTML =gamma;
}