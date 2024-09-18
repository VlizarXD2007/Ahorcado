const palabras = ["juegos", "automovil", "cartas", "pared", "ahorcado","muñeco","calor","frio"];
let palabraSecreta = '';
let errores = 0;
let letrasCorrectas = [];
let letrasIncorrectas = [];

function elegirPalabra() {
    const indice = Math.floor(Math.random() * palabras.length);
    palabraSecreta = palabras[indice];
}

function mostrarPalabra() {
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = '';
    palabraSecreta.split('').forEach(letra => {
        const span = document.createElement('span');
        if (letrasCorrectas.includes(letra)) {
            span.innerHTML = letra;
        } else {
            span.innerHTML = '_';
        }
        wordContainer.appendChild(span);
    });
}

function generarTeclado() {
    const keyboardContainer = document.getElementById('keyboardContainer');
    keyboardContainer.innerHTML = '';
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    letras.split('').forEach(letra => {
        const button = document.createElement('button');
        button.innerHTML = letra;
        button.onclick = () => intentarLetra(letra);
        keyboardContainer.appendChild(button);
    });
}

function dibujarAhorcado() {
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';

    if (errores > 0) ctx.strokeRect(10, 150, 60, 10); // Base
    if (errores > 1) ctx.strokeRect(30, 10, 20, 140); // Palo vertical
    if (errores > 2) ctx.strokeRect(30, 10, 80, 10);  // Palo horizontal
    if (errores > 3) ctx.strokeRect(100, 10, 2, 20);  // Cuerda
    if (errores > 4) { // Cabeza
        ctx.beginPath();
        ctx.arc(101, 45, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
    if (errores > 5) ctx.strokeRect(100, 55, 2, 30);  // Cuerpo
    if (errores > 6) ctx.strokeRect(90, 70, 20, 2);   // Brazos
    if (errores > 7) ctx.strokeRect(100, 85, 2, 20);  // Piernas
}

function intentarLetra(letra) {
    const message = document.getElementById('message');
    if (letrasCorrectas.includes(letra) || letrasIncorrectas.includes(letra)) {
        message.innerHTML = 'Ya intentaste esa letra.';
        return;
    }
    message.innerHTML = '';
    
    if (palabraSecreta.includes(letra)) {
        letrasCorrectas.push(letra);
    } else {
        letrasIncorrectas.push(letra);
        errores++;
        dibujarAhorcado();
    }
    mostrarPalabra();
    verificarFin();
}

function verificarFin() {
    const palabraMostrada = Array.from(document.getElementById('wordContainer').innerText.replace(/\s/g, ''));
    if (palabraMostrada.join('') === palabraSecreta) {
        document.getElementById('message').innerHTML = '¡Ganaste!';
        bloquearTeclado();
    } else if (errores >= 8) {
        document.getElementById('message').innerHTML = `Perdiste. La palabra era: ${palabraSecreta}`;
        bloquearTeclado();
    }
}

function bloquearTeclado() {
    const botones = document.querySelectorAll('#keyboardContainer button');
    botones.forEach(boton => boton.disabled = true);
}

function startGame() {
    errores = 0;
    letrasCorrectas = [];
    letrasIncorrectas = [];
    document.getElementById('message').innerHTML = '';
    elegirPalabra();
    mostrarPalabra();
    generarTeclado();
    dibujarAhorcado();
}

window.onload = startGame;
