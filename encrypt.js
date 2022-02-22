const inputEnc = document.querySelector("#input-encriptar");
const botonEnc = document.querySelector("#btn-encriptar");
const botonDesenc = document.querySelector("#btn-desencriptar");
const output = document.querySelector("#mostrar-copiar");
const botonCopiar = document.querySelector("#btn-copiar");
const metodoEnc = {
  "a": "ai",
  "e": "enter",
  "i": "imes",
  "o": "ober",
  "u": "ufat",
};
const metodoDesenc = {
  "ai": "a",
  "enter": "e",
  "imes": "i",
  "ober": "o",
  "ufat": "u",
};

botonEnc.addEventListener("click", () => {
  let texto = inputEnc.value;
  if (validarReglas(texto)) {
    let textoEnc = encriptar(texto);
    imprimirMensaje(textoEnc, output);
    inputEnc.value = "";

  } else {
    alert("El texto ingresado no cumple con las reglas");
    inputEnc.value = "";

  };

});

botonDesenc.addEventListener("click", () => {
  let textoEnc = inputEnc.value;
  if (validarReglas(textoEnc)) {
    let textoDesenc = textoEnc.allReplace(metodoDesenc);
    imprimirMensaje(textoDesenc, output);
    inputEnc.value = "";

  } else {
    alert("El texto ingresado no cumple con las reglas");
    inputEnc.value = "";
  };


});

botonCopiar.addEventListener("click", () => {
  output.select();
  let textoAcopiar = output.value;
  navigator.clipboard.writeText(textoAcopiar);
});

function validarReglas(string) {
  let expReg = new RegExp(/^[a-z\s]+$/);
  console.log(expReg.test(string));
  return expReg.test(string);
};

String.prototype.allReplace = function (obj) {
  var retStr = this;
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    console.log(retStr);
  }
  return retStr;
};

function imprimirMensaje(string, output) {
  output.value = string;

};

function encriptar(string) {
  let trimString = string.trim();
  let textoEnc = "";
  for (let i = 0; i < trimString.length; i++) {
    if (trimString[i] == "a") {
      textoEnc += "ai";
    } else if (trimString[i] == "e") {
      textoEnc += "enter";

    } else if (trimString[i] == "i") {
      textoEnc += "imes";

    } else if (trimString[i] == "o") {
      textoEnc += "ober";
    } else if (trimString[i] == "u") {
      textoEnc += "ufat";
    } else {
      textoEnc += trimString[i];
    }

  }
  return textoEnc;
}