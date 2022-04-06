const pizarra = document.querySelector("#ahorcado");
pizarra.width = (0.75*window.innerWidth);
pizarra.height = 900;
var pincel = pizarra.getContext("2d");


pincel.lineWidth = 5;
pincel.lineCap = "round";
pincel.fillStyle = "#464646";
pincel.strokeStyle = "#464646";
pincel.font = `bold 3vw courier, sans-serif`;
pincel.save();

function dibujarLetraCorrecta(palabraSorteada, letraPresionada,letrasAcertadas) {
  let vw = window.innerWidth;
  console.log(vw);
  let startX = 260;
  let startY = 680;
  pincel.restore();
  for (let i = 0; i < palabraSorteada.length; i++) {
    if (palabraSorteada[i] == letraPresionada) {
      dibujarLetra(startX, startY, letraPresionada,"#464646");
      startX += 60;
      letrasAcertadas.push(letraPresionada);
    } else {
      startX += 60;
    }

  }
  if (letrasAcertadas.length == palabraSorteada.length){
    imprimirMensaje("Felicidades! Ha ganado la partida!","h2",mensaje,"msj__victoria");
    console.log("partida ganada");
    document.body.removeEventListener("onkeydown",keydownHandler,false);
  };
}



function dibujarLetraIncorrecta(letraPresionada, contador) {
  let startX = 60;
  let startY = 800;
  if (contador > 0) {
    startX = startX + contador * 100;
    dibujarLetra(startX, startY, letraPresionada,"red");
  } else {
    dibujarLetra(startX, startY, letraPresionada,"red");
  }

}

function mostrarGuiones(palabraSorteada) {
  pincel.strokeStyle = "#e76f51";
  let cantGuiones = palabraSorteada.length;
  let startX = 260;
  let startY = 700;
  let x = 300;
  for (let i = 0; i < cantGuiones; i++) {
    dibujarLinea(startX, startY, x, startY);
    startX += 60;
    x += 60;

  }
}

function dibujarAhorcado(letrasErradas) {

  switch (letrasErradas) {
    case 0:
      dibujarLinea(60, 700, 230, 700);
      break;
    case 1:
      dibujarLinea(170, 700, 170, 300);
      break;
    case 2:
      dibujarLinea(170, 300, 370, 300);
      break;
    case 3:
      dibujarLinea(370, 300, 370, 350);
      break;
    case 4:
      dibujarCirc(370, 385, 30);
      break;
    case 5:
      dibujarLinea(370, 420, 370, 520);
      break;
    case 6:
      dibujarLinea(370, 440, 320, 510);
      dibujarLinea(370, 440, 420, 510);
      break;
    case 7:
      dibujarLinea(370, 520, 300, 600);
      dibujarLinea(370, 520, 430, 600);
    default:
      break;
  }
}

function dibujarLetra(x, y, letra, color) {

  pincel.beginPath();
  pincel.fillStyle= color;
  pincel.fillText(letra, x, y);

}

function dibujarLinea(startX, startY, x, y) {
  pincel.strokeStyle= "#464646";
  pincel.beginPath();
  pincel.moveTo(startX, startY);
  pincel.lineTo(x, y);
  pincel.stroke();
}



function dibujarCirc(x, y, radio) {
  pincel.strokeStyle= "#464646";
  pincel.beginPath();
  pincel.arc(x, y, radio, 0, 2 * Math.PI);
  pincel.stroke();
}