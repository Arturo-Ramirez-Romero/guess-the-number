let numeroSecreto = 0;
let intentos = 0;
let listaNumSorteados = [];
let numMax = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroUsuario  = parseInt(document.getElementById('valorUsuario').value); // funcion solo para buscar por ID, agregamos el atributo de ID
    if ( numeroUsuario === numeroSecreto) {
        // El usuario acertó
        asignarTextoElemento('p',`¡Acertaste el número secreto en ${intentos} ${intentos > 1 ? 'intentos!' : 'intento!'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Solo necesita 1 parámetro el remove
    } else {
        // El usuario no acertó
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; // otra forma para el ID y se usa pa capturar y borrar
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numMax)+1;
    console.log (numeroGenerado);
    console.log (listaNumSorteados);
    // Si ya sorteamos todos los números (para evitar recursividad)
    if (listaNumSorteados.length == numMax){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles ¡Felicidades!');
        asignarTextoElemento('h1','GAME OVER');
        document.getElementById('verificar').setAttribute('disabled','true');
    } else {
        // Si el número generado está incluido en la lista
        if (listaNumSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumSorteados.push(numeroGenerado);
            return numeroGenerado;
    }
    }
    
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numMax}`);
    numeroSecreto = generarNumeroSecreto();
    //console.log (numeroSecreto);
    intentos = 1;
}

function reiniciar() {
    // Limpiar la caja
    limpiarCaja();
    // Indicamos mensaje de intervalo de números
    // Generar el número aleatorio
    // Inicializar el número de intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled','true'); // set necesita 2 parámetros
}

condicionesIniciales();