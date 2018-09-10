	var color = [" Hearts", " Diamonds", " Clubs", " Spades"];

	var numero = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

	var baraja = [];

	var mazo;

	var texto;

	var barajaJugador = [];

	var barajaBanca = [];

	var finJuego = false;

	var sumaBanc = 0;

	var sumaJugador = 0;

	var finDelJuego = false;


var resultados = document.getElementById("resultados"); //
var botonJugar = document.getElementById("boton-jugar"); //botó per a jugar
var botonCarta = document.getElementById("boton-carta"); //botó per a demanar carta
var botonPasar = document.getElementById("boton-parar"); //botó per passar
var mostrarCartas = document.getElementById("cartas-jugador");
var mostrarCartasBanca = document.getElementById("cartas-banca");
var mostrarPuntuacion = document.getElementById("puntuacion");
var mostrarPuntuacionBanca = document.getElementById("puntuacion-banca");
var text = "";

botonCarta.style.display = 'none';
botonPasar.style.display = 'none';


botonJugar.addEventListener('click', function(){ //si es clica botó jugar...
	color = [" Hearts", " Diamonds", " Clubs", " Spades"];

	numero = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

	baraja = [];

	mazo;

	texto;

	barajaJugador = [];

	barajaBanca = [];

	finJuego = false;

	sumaBanc = 0;

	sumaJugador = 0;
	
	finDelJuego = false;

	//buffer.clear();

	botonJugar.style.display = 'none';
	botonCarta.style.display = 'inline';  //apareixen els botóns de pasar o demanar carta
	botonPasar.style.display = 'inline';


	for (var i = 0; i < color.length; i++) { //es crea les cartes
		for (var a = 0; a < numero.length; a++) {
			var carta = { //cre la carta com a objecte amb numero i color
				numero: numero[a],
				color: color[i],
			}
			baraja.push(carta); //se afegeixen a la baralla com a objecte
		}
	}

	console.log(baraja);
	resultados.innerText="Cartas mezcladas";
	primeraMano(baraja, barajaJugador, barajaBanca); //repartiment de les 2 primeres cartes

	sumaJugador = sumaCartas(barajaJugador); //comprovar la primera suma del jugador
	mostrarPuntuacion.innerText=sumaJugador;
	sumaBanc = sumaCartas(barajaBanca); //comprovar suma cartes banca
	ganador(sumaJugador, sumaBanc);
	var texto = resultado(finJuego, sumaBanc, sumaJugador);
	resultados.innerText = texto;

});


botonCarta.addEventListener('click', function(){ //si quiere mas...
	finJuego = false;
	console.log("CARTA");
	mazo = generarCarta(baraja); //generar carta
	sumaJugador = jugarJugador(barajaJugador, mazo); //darle la carta al jugador
	mostrarCartaJugador(barajaJugador);
	finJuego = ganador(sumaJugador, sumaBanc);
	texto = resultado(finJuego, sumaBanc, sumaJugador);
	resultados.innerText = texto;

});

botonPasar.addEventListener('click', function(){
	finJuego = true;
	botonCarta.style.display = 'none';
	botonPasar.style.display = 'none';
	resultados.innerText = "Turno de la banca";
	finDelJuego = ganador(sumaJugador, sumaBanc);
	texto = resultado(finJuego, sumaBanc, sumaJugador);
	resultados.innerText = texto;

	while(!finDelJuego){
		mazo = generarCarta(baraja); //generar carta
		barajaBanca.push(mazo);//añadirla al mazo
		texto = mostrarCarta(barajaBanca); //recojer carta
		mostrarCartasBanca.innerText = texto; //mostrarla
		sumaBanc = jugarBanca(barajaBanca, mazo); //hacer la suma
		finDelJuego = ganador(sumaJugador, sumaBanc); 
		mostrarPuntuacionBanca.innerText = sumaBanc;
		texto = resultado(finJuego, sumaBanc, sumaJugador);
		resultados.innerText = texto;
	}

});


function pausa(){

     setTimeout(pausa, 5000);
}

function ganador(sumaP, sumaB){
	if(sumaP >= 21 || sumaB >= 21){
		return true;
	}else if(sumaB >= 17 || sumaB > sumaP){
		return true;
	}
	else{
		return false;
	}

}

function resultado(finJuego, sumaBanc, sumaJugador){
	var texto;
	if(finJuego == false){
		resultados.innerText= "Clica Carta para mas cartas, o Pasar para salir. Tienes: " + sumaJugador; //preguntar si quier emas o irse
		
	}else{
		if (sumaBanc == sumaJugador) {
			texto = "Empate";
			
		}else if(sumaBanc > 21 || sumaJugador > 21){
			if(sumaBanc >21 && sumaJugador < sumaBanc){
				texto = "Gana jugador";
			}else{
				text = "Gana banca";
			}
		}else if(sumaBanc > sumaJugador){
			texto = "Gana la banca";
		}else{
			texto = "Gana jugador";
		}
		botonCarta.style.display = 'none';
		botonPasar.style.display = 'none';
		botonJugar.style.display = 'inline';
	}

	return texto;
}

function mostrarCartaJugador(baraja){
	var texto = mostrarCarta(baraja);
	mostrarCartas.innerText=texto;
}

function jugarBanca(baraja, mazo){
	console.log(baraja);
	suma = sumaCartas(baraja); //hacer la suma
	console.log("Suma actual: " + suma);
	mostrarPuntuacionBanca.innerText=suma;
	return suma; //retoirnar suma
}

function jugarJugador(baraja, mazo){
	baraja.push(mazo); //añadirle la carta al mazo del jugador
	console.log(baraja);
	suma = sumaCartas(baraja); //hacer la suma
	console.log("Suma actual: " + suma);
	mostrarPuntuacion.innerText=suma;
	return suma; //retoirnar suma

}


function generarCarta(baraja){
	var carta = Math.round(Math.random()*baraja.length); //fewr numero aleatori per agafar una carta de la baralla
	var mazo = baraja[carta]; //agafar la carta
	baraja.splice(carta, 1); //eliminarla de la baralla
	//console.log(mazo);
	//console.log("1 - El jugador tiene: " + mostrarCarta(mazo));
	return mazo; //retornar la carta
}




function primeraMano(baraja, barajaJugador, barajaBanca){
	console.log("PRIMERA MANO");
	for (var i = 1; i <5 ; i++) {
		var mazo = generarCarta(baraja); //generar la carta
		if(i % 2 !== 0){ //si es el torn del jugador
			barajaJugador.push(mazo); //afegir la carta a la baralla del jugador
			//console.log("Player: ");
			//console.log(barajaJugador);
			mostrarCartaJugador(barajaJugador);
		}else{//si es el torn de la banca
			console.log("Banca: ");
			console.log(barajaBanca);

			barajaBanca.push(mazo); //afegir carta a la baralla de la banca
			if(i == 4){//si es la ultima carta...
				var texto = mostrarCarta(barajaBanca);
				mostrarCartasBanca.innerText = texto;

			}
		}
	}

}

function mostrarCarta(baraja){//recolleix a un array els valors de les cartes entrades
	var text = [];
	for (var i = 0; i < baraja.length; i++) {
		var muestra = baraja[i].numero + baraja[i].color;
		//console.log(mostrador + muestra);
		text += muestra + "\n";
		
	}
	return text;
}


function sumaCartas(baraja){
	var sumaTotal = 0;
	for (var i = 0; i < baraja.length; i++) {//comprovar todos los elementos del mazo
		var numero = baraja[i].numero;

		if(!isNaN(numero)){//si es un numero...
			sumaTotal = sumaTotal + numero;
			console.log("Suma: " + sumaTotal);
		}else{//si es J Q K As
			if(numero === "A"){//si es AS... mirar si será 11 u 1
				if(sumaTotal + 11 <=21){
					numero = 11;
				}else{
					numero = 1;
				}
			}else{
				numero = 10;
			}
			sumaTotal = sumaTotal+numero;//hacer suma
		}
	}

	return sumaTotal; //retornar reusltado
}



//console.log(baraja);