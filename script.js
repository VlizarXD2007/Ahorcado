const palabras = ['universo', 'ciencia', 'javascript', 'ahorcado', 'computadora', 'tecnología', 'astronomía', 'física', 'planeta', 'robot', 'programación', 'matemáticas', 'internet', 'inteligencia', 'artificial'];

let palabraSecreta = '';
let letrasCorrectas = [];
let letrasIncorrectas = [];
let errores = 0;
const maxErrores = 6;

function startGame() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    letrasCorrectas = [];
    letrasIncorrectas = [];
    errores = 0;
    mostrarPalabra();
    generarTeclado();
    dibujarAhorcado();
    guardarProgreso();
}

function mostrarPalabra() {
    const wordContainer = document.getElementById('wordContainer');
    const displayWord = palabraSecreta.split('').map(letter => (letrasCorrectas.includes(letter) ? letter : '_')).join(' ');
    wordContainer.textContent = displayWord;
}

function generarTeclado() {
    const keyboardContainer = document.getElementById('keyboardContainer');
    keyboardContainer.innerHTML = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letras.forEach(letra => {
        const button = document.createElement('button');
        button.textContent = letra;
        button.onclick = () => manejarIntento(letra);
        button.disabled = letrasCorrectas.includes(letra) || letrasIncorrectas.includes(letra);
        keyboardContainer.appendChild(button);
    });
}

function manejarIntento(letra) {
    if (palabraSecreta.includes(letra)) {
        letrasCorrectas.push(letra);
    } else {
        letrasIncorrectas.push(letra);
        errores++;
    }
    mostrarPalabra();
    dibujarAhorcado();
    comprobarEstadoJuego();
    guardarProgreso();
}

function comprobarEstadoJuego() {
    if (!document.getElementById('wordContainer').textContent.includes('_')) {
        mostrarMensaje('¡Ganaste! 🎉');
    } else if (errores >= maxErrores) {
        mostrarMensaje(`Perdiste 😢 La palabra era: ${palabraSecreta}`);
    }
}

function mostrarMensaje(mensaje) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = mensaje;
}

function dibujarAhorcado() {
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00796b';

    // Dibujar según el número de errores
    if (errores > 0) ctx.fillRect(50, 180, 100, 10);  // Base
    if (errores > 1) ctx.fillRect(90, 50, 10, 130);   // Poste
    if (errores > 2) ctx.fillRect(90, 50, 60, 10);    // Viga
    if (errores > 3) ctx.fillRect(150, 50, 10, 30);   // Cuerda
    if (errores > 4) {                               // Cabeza
        ctx.beginPath();
        ctx.arc(155, 100, 15, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (errores > 5) {                               // Cuerpo
        ctx.fillRect(150, 115, 10, 40);
    }
}

function guardarProgreso() {
    const progreso = {
        palabraSecreta,
        letrasCorrectas,
        letrasIncorrectas,
        errores
    };
    localStorage.setItem('progresoAhorcado', JSON.stringify(progreso));
}

function cargarProgreso() {
    const progresoGuardado = localStorage.getItem('progresoAhorcado');
    if (progresoGuardado) {
        const progreso = JSON.parse(progresoGuardado);
        palabraSecreta = progreso.palabraSecreta;
        letrasCorrectas = progreso.letrasCorrectas;
        letrasIncorrectas = progreso.letrasIncorrectas;
        errores = progreso.errores;

        mostrarPalabra();
        generarTeclado();
        dibujarAhorcado();
    } else {
        startGame(); // Si no hay progreso, iniciar un nuevo juego
    }
}

window.onload = cargarProgreso;
