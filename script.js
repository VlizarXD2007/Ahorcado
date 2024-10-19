const palabras = ["cementerio", "universo", "ciencia", "papeles", "ahorcado", "carton", 
    "tecnologia", "calor", "auto", "planeta", "frio", "frito", "barrio", 
    "televisor", "madera", "juego", "flor", "mariposa", "jardin", "río", 
    "tigre", "elefante", "ballena", "casa", "montaña", "lago", "ciudad", 
    "arcoiris", "silla", "mesa", "ventana", "puerta", "estrella", "nube", 
    "sol", "luna", "cielo", "corazon", "sonrisa", "amigo", "familia", 
    "gato", "perro", "pajaro", "pez", "florero", "zapato", "pintura", 
    "bailar", "cantar", "caminar", "jugar", "reir", "comida", "cocina", 
    "libro", "cuento", "pelicula", "musica", "arte"];

let palabraSecreta = '';
let letrasCorrectas = [];
let letrasIncorrectas = [];
let errores = 0;
const maxErrores = 6;
let puntuacion = 0; // Variable para la puntuación

function startGame(nuevaPalabra = true) {
    if (nuevaPalabra) {
        palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
        letrasCorrectas = [];
        letrasIncorrectas = [];
        errores = 0;
    }
    mostrarPalabra();
    generarTeclado();
    dibujarAhorcado();
    guardarProgreso();
    actualizarPuntuacion();
    document.getElementById('nextWordButton').style.display = 'none'; // Ocultar botón de siguiente palabra
}

function mostrarPalabra() {
    const wordContainer = document.getElementById('wordContainer');
    const displayWord = palabraSecreta.split('').map(letter => (letrasCorrectas.includes(letter) ? letter : '_')).join(' ');
    wordContainer.textContent = displayWord;
}

function generarTeclado() {
    const keyboardContainer = document.getElementById('keyboardContainer');
    keyboardContainer.innerHTML = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ'.split('');
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
        puntuacion += 10; // Incrementar puntuación
    } else {
        letrasIncorrectas.push(letra);
        errores++;
    }
    mostrarPalabra();
    dibujarAhorcado();
    comprobarEstadoJuego();
    guardarProgreso();
    actualizarPuntuacion();
}

function comprobarEstadoJuego() {
    if (!document.getElementById('wordContainer').textContent.includes('_')) {
        mostrarMensaje('¡Ganaste! 🎉');
        document.getElementById('nextWordButton').style.display = 'block'; // Mostrar botón de siguiente palabra
    } else if (errores >= maxErrores) {
        mostrarMensaje(`Perdiste 😢 La palabra era: ${palabraSecreta}`);
        document.getElementById('nextWordButton').style.display = 'none'; // Ocultar botón si se pierde
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
    if (errores > 6) {                               // Brazo
        ctx.fillRect(150, 115, 10, 40);
    }
    if (errores > 7) {                               // pierna
        ctx.fillRect(150, 115, 10, 40);
    }
}

function guardarProgreso() {
    const progreso = {
        palabraSecreta,
        letrasCorrectas,
        letrasIncorrectas,
        errores,
        puntuacion // Guardar puntuación
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
        puntuacion = progreso.puntuacion; // Cargar puntuación

        mostrarPalabra();
        generarTeclado();
        dibujarAhorcado();
        actualizarPuntuacion();
    } else {
        startGame(); // Si no hay progreso, iniciar un nuevo juego
    }
}

function actualizarPuntuacion() {
    document.getElementById('score').textContent = `Puntuación: ${puntuacion}`; // Actualizar el texto de puntuación
}

function continuarConSiguientePalabra() {
    startGame(false); // Llamar a startGame con false para continuar sin reiniciar puntuación
}
const palabrasAdicionales = ["manzana", "naranja", "banana", "kiwi", "pera"];
let palabraAdivinada = '';

function startGuessWordGame() {
    palabraAdivinada = palabrasAdicionales[Math.floor(Math.random() * palabrasAdicionales.length)].toUpperCase();
    document.getElementById('guessWordContainer').style.display = 'block';
    document.getElementById('guessMessage').textContent = '';
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput').value.toUpperCase();
    if (guessInput === palabraAdivinada) {
        document.getElementById('guessMessage').textContent = '¡Correcto! 🎉';
        // Aquí puedes aumentar la puntuación
    } else {
        document.getElementById('guessMessage').textContent = `Incorrecto. La palabra era: ${palabraAdivinada}`;
    }
}
function continuarConSiguientePalabra() {
    startGuessWordGame(); // Cambia esto para iniciar el nuevo juego
}

window.onload = cargarProgreso;
