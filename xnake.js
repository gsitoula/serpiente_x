$(document).ready(function(){

	//canvas
	var canvas = $("#mi_canvas")[0];
	var ctx = canvas.getContext("2d");
	var ancho = $("#mi_canvas").width();
	var alto = $("#mi_canvas").height();


//mapeo de teclas	
$(document).keydown(function(v){
	var tecla = v.which;
	if(tecla == "37" && dir != "der") dir = "izq";
	else if (tecla == "38" && dir != "abj") dir = "arr";
	else if (tecla == "39" && dir != "izq") dir = "der";
	else if (tecla == "40" && dir != "arr" ) dir = "abj"})


	//variables	
	var cel = 10;//tamaño de las celdas, 10pixeles
	var dir;//dirección del jugador
	var comida;//morfi
	var puntos;//ganancia neta
	var jugador_array;//jugador(un array)


//función de iniciación

	function init(){

	dir = "der";//la serpiente se movera hacia la derecha al comenzar 	
	crear_jugador();//crea jugador
	crear_comida();//crea comida
	puntos = 0;//puntos
	
	
	//loop del juego, con la función de refresh rate
	if(typeof game_loop != "undefined") 
		clearInterval(game_loop);
		game_loop = setInterval(pintar, refresh())
	}

init();



//función que crea la comida en un lugar aleatorio
function crear_comida(){
 		//crea comida
	comida = {

		x:Math.round(Math.random()*(ancho-cel)/cel),
		y:Math.round(Math.random()*(alto-cel)/cel),
	};	
}


//función que crea al jugador
function crear_jugador(){
	var serpiente = 4;//largo
	jugador_array = [];//array vacio
	for(var i = serpiente-1; i>=0; i--)
	{
		jugador_array.push({x: i, y:0});
	}
}


//funcion de pintado
function pintar(){
	//relleno de canvas
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,ancho,alto);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,ancho,alto);

	var gx = jugador_array[0].x;
	var gy = jugador_array[0].y;

	if(dir == "der") gx++;
	else if (dir == "izq") gx--;
	else if (dir == "arr") gy--;
	else if (dir == "abj") gy++;

	if (gx == -1 || 
		gx == ancho/cel || 
		gy == -1 || 
		gy == alto/cel || 
		sion_check(gx, gy, jugador_array)){

		init();
		return;
	}
	if(gx == comida.x && gy == comida.y){

		var cola = {x: gx, y: gy};
		puntos+=100;
		crear_comida();
	}
	else {
		var cola = jugador_array.pop();
		cola.x = gx; cola.y = gy;
	}

	jugador_array.unshift(cola);

	for(var i= 0; i < jugador_array.length; i++){

		var z = jugador_array[i];
		pintar_celda(z.x,z.y);
	}

	pintar_celda(comida.x,comida.y);

	var pun = "Puntos: " + puntos;
	ctx.fillText(pun,150,alto-5);

}

//colores de las celda
 	function pintar_celda(x,y){

	ctx.fillStyle = "#00FF00";//color de llenado
	ctx.fillRect(x*cel,y*cel,cel,cel);
	ctx.strokeStyle = "#003300";//color de borde
	ctx.strokeRect(x*cel,y*cel,cel,cel);


}

//funcion de colisión
function sion_check(x, y, array){

	for(var i = 0; i < array.length; i++){

		if(array[i].x == x && array[i].y == y)
			return true;
	}
	return false;
}
/*funcion de refresh rate
estoy buscando la forma de lograr que al sumar puntos aumente la velocidad
del juego y por consiguiente su dificultad*/
function refresh (valor){
		if(puntos < 100){
			var def = 60;
			valor = def;
		}
		if(puntos >= 200){
			var def = 0;
			valor = def;
		}
		return valor;
	}	









})