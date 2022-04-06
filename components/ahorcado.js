const btnIniciarJuego = document.querySelector("#iniciar-juego");
const inputNuevaPalabra = document.querySelector("#input-nueva-palabra");
const btnNuevaPalabra = document.querySelector("#nueva-palabra");
const mensaje = document.querySelector(".mensaje");
const btnSurrender = document.querySelector("#surrender");
const btnNuevoJuego = document.querySelector("#jugar-nuevo");

var listaPalabras = ["caracol", "almeja", "tiburon", "hipocampo", "ballena", "pinguino", "calamar", "orca", "jirafa", "hipopotamo", "rinoceronte", "leopardo", "aguila", "elefante", "zebra", "canguro", "antilope", "hiena", "buitre", "carpincho", "yacare", "ciervo", "yaguarete"];

var esLetraLower = false;
var letraPresionada = "";
var letrasErradas = [];
var letrasAcertadas = [];
var palabraAleatoria = "";
btnSurrender.addEventListener("click",()=>{
  if (!mensaje.innerHTML){
    document.body.removeEventListener("keydown", keydownHandler,false);
    mostrarPalabraCorrecta(palabraAleatoria);
  }
});
btnIniciarJuego.addEventListener("click", e => {
  e.preventDefault();
  letraPresionada = "";
  letrasErradas = [];
  letrasAcertadas = [];
  irACanvas();
  mensaje.innerHTML= "";
  pincel.clearRect(0, 0, pizarra.width, pizarra.height);
  palabraAleatoria = sortearPalabra();
  console.log(palabraAleatoria);
  mostrarGuiones(palabraAleatoria);
  document.body.addEventListener("keydown",keydownHandler,false);
});

btnNuevaPalabra.addEventListener("click", () => {
  let nuevaPalabra = inputNuevaPalabra.value;
  let nuevaPalabraTrim = nuevaPalabra.trim();
  let palabraPermitida = chequearPalabra(nuevaPalabraTrim);
  if (palabraPermitida) {
    listaPalabras.push(nuevaPalabraTrim);
  } else {
    alert("No se admiten palabras escritas con caracteres especiales. Cantidad máxima de caracteres: 14");
  }
});

btnNuevoJuego.addEventListener("click",()=>{
  letraPresionada = "";
  letrasErradas = [];
  letrasAcertadas = [];
  mensaje.innerHTML= "";
  pincel.clearRect(0, 0, pizarra.width, pizarra.height);
  palabraAleatoria = sortearPalabra();
  console.log(palabraAleatoria);
  mostrarGuiones(palabraAleatoria);
  document.body.addEventListener("keydown",keydownHandler,false);
});

function chequearPalabra(palabra) {
  let expresionControl = new RegExp(/^[a-z\u00f1]{2,14}$/);
  if (expresionControl.test(palabra)) {
    return true;
  } else {
    return false;
  }
}

function sortearPalabra() {
  let cantPalabras = listaPalabras.length;
  let indiceAleatorio = Math.floor(Math.random() * cantPalabras);
  let palabraAleatoria = listaPalabras[indiceAleatorio];
  return palabraAleatoria;
}

function irACanvas() {
  window.scrollTo({
    top: 750,
    left: 0,
    behavior: 'smooth'
  });
}

function imprimirMensaje(string, tag, contenedor,clase) {
  let mensajeTag = document.createElement(tag);
  mensajeTag.innerHTML = string;
  mensajeTag.classList.add(clase);
  //mensajeTag.classList.add(clase);
  contenedor.appendChild(mensajeTag);

}

function mostrarPalabraCorrecta(palabraSorteada){
  let startX = 260;
  let startY = 680;
  pincel.fillStyle = "#464646";
  for (let i = 0; i < palabraSorteada.length; i++) {
      dibujarLetra(startX, startY, palabraSorteada[i]);
      startX += 60;
      
  }
  imprimirMensaje("Partida perdida.Pulse el botón JUGAR para intentar nuevamente"
          ,"h2",mensaje,"msj__derrota");
}  


function keydownHandler(e){
  e.stopPropagation();
  let uniCod = e.key.charCodeAt();
  if(mensaje.innerHTML==""){
  if (uniCod >= 97 && uniCod <= 122) {
    letraPresionada = e.key;
    if (!letrasAcertadas.includes(letraPresionada) && (!letrasErradas.includes(letraPresionada))) {
      if (palabraAleatoria.includes(letraPresionada)) {
        dibujarLetraCorrecta(palabraAleatoria, letraPresionada,letrasAcertadas);
        
      } else {
        dibujarLetraIncorrecta(letraPresionada, letrasErradas.length);
        dibujarAhorcado(letrasErradas.length);
        letrasErradas.push(letraPresionada);
        if (letrasErradas.length == 8) {
          imprimirMensaje("Partida perdida.Pulse el botón Iniciar juego para intentar nuevamente"
          ,"h2",mensaje,"msj__derrota");
          console.log("partida perdida");
          document.removeEventListener("onkeydown",keydownHandler,false);
        } 
      }
    } else {
      alert("ya presionó esa letra");
      }
    }
  }
}







// .includes(letraPresionada)