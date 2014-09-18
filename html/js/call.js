function activa(){
    document.getElementById("gameDiv").style.visibility = 'visible'; 
    document.getElementById("titulo").style.visibility = 'visible'; 
    document.getElementById("previo").style.visibility = 'hidden'; 
}

function load(){
	document.getElementById("gameDiv").style.visibility = 'hidden'; 
    document.getElementById("titulo").style.visibility = 'hidden';
    document.getElementById("previo").style.visibility = 'visible';
}