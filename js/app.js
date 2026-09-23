
const pantallaMapa = document.getElementById("level-map");

const botonNivel1 = document.getElementById("level-1");
const botonNivel2 = document.getElementById("level-2");
const botonNivel3 = document.getElementById("level-3");
const botonNivel4 = document.getElementById("level-4");
const botonNivel5 = document.getElementById("level-5");
const botonVolverMapa = document.getElementById("back-to-map");
const pantallaBienvenida = document.getElementById("welcome-screen")
const pantallaJuego = document.getElementById("game-screen")
const botonComenzar = document.getElementById("start-button")
const numeroPregunta = document.getElementById("question-number");
const textoPregunta = document.getElementById("question-text");
const opcionesRespuesta = document.getElementById("answer-options");
const marcadorProgreso = document.getElementById("score");
const mensajeFeedback = document.getElementById("feedback");
const contenedorRecuerdo = document.getElementById("memory");
const textoRecuerdo = document.getElementById("memory-text");
const preguntas = [
    {
        pregunta: "¿Dónde fue nuestra primera cita?",
        opciones: [
            "Coyoacán",
            "Un café",
            "El cine",
            "Otro lugar"
        ],
        respuestaCorrecta: 0,
        recuerdo: "Aquí irá un recuerdo especial de nuestra primera cita 🖤",
        
    },
    {
        pregunta: "¿Cuál de estas cosas me recuerda más a ti?",
        opciones: [
            "La música",
            "Las estrellas",
            "El café",
            "Los gatos"
        ],
        respuestaCorrecta: 1,
        recuerdo: "Aquí irá otro recuerdo especial ✨",
        
    }
];

let preguntaActual = 0;
let respuestasCorrectas = 0;
let nivel1Completado = false;

function mostrarPregunta() {
    const preguntaEnTurno = preguntas[preguntaActual];

    numeroPregunta.textContent = `Pregunta ${preguntaActual + 1}`;
    textoPregunta.textContent = preguntaEnTurno.pregunta;

    marcadorProgreso.textContent =
        `Aciertos: ${respuestasCorrectas} / ${preguntas.length}`;

    opcionesRespuesta.innerHTML = "";

    preguntaEnTurno.opciones.forEach((opcion, indice) => {
        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.classList.add("answer-button");

        boton.addEventListener("click", () => {
            comprobarRespuesta(indice);
        });

        opcionesRespuesta.appendChild(boton);
    });
}

function comprobarRespuesta(indiceSeleccionado) {
    const preguntaEnTurno = preguntas[preguntaActual];

    opcionesRespuesta.innerHTML = "";

    if (indiceSeleccionado === preguntaEnTurno.respuestaCorrecta) {
        respuestasCorrectas++;

        mensajeFeedback.textContent = "¡Respuesta correcta! 🖤";

        textoRecuerdo.textContent = preguntaEnTurno.recuerdo;
        contenedorRecuerdo.classList.remove("hidden");
    } else {
        mensajeFeedback.textContent = "Respuesta incorrecta 🔒";

        contenedorRecuerdo.classList.add("hidden");
        textoRecuerdo.textContent = "";
    }

    marcadorProgreso.textContent =
        `Aciertos: ${respuestasCorrectas} / ${preguntas.length}`;

    const botonContinuar = document.createElement("button");

    botonContinuar.textContent = "Continuar";
    botonContinuar.classList.add("answer-button");
    botonContinuar.addEventListener("click", avanzarPregunta);

    opcionesRespuesta.appendChild(botonContinuar);
}

function avanzarPregunta() {
    preguntaActual++;
    mensajeFeedback.textContent = "";

    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    numeroPregunta.textContent = "Nivel 1";

    opcionesRespuesta.innerHTML = "";
    mensajeFeedback.textContent = "";
    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    if (respuestasCorrectas === preguntas.length) {
        nivel1Completado = true;
        guardarProgreso();

        textoPregunta.textContent = "¡Nivel completado! 🖤";

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${preguntas.length}`;

    } else {
        textoPregunta.textContent =
            `Conseguiste ${respuestasCorrectas} de ${preguntas.length} respuestas correctas`;

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${preguntas.length}`;

        const botonReintentar = document.createElement("button");

        botonReintentar.textContent = "Intentar de nuevo";
        botonReintentar.classList.add("answer-button");
        botonReintentar.addEventListener("click", reiniciarNivel);

        opcionesRespuesta.appendChild(botonReintentar);
    }
}

function reiniciarNivel() {
    preguntaActual = 0;
    respuestasCorrectas = 0;

    mensajeFeedback.textContent = "";
    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    mostrarPregunta();
}

function guardarProgreso() {
    localStorage.setItem("nivel1Completado", nivel1Completado);
}

function actualizarMapa() {
    if (nivel1Completado) {
        botonNivel1.textContent = "✓ Nivel 1";
        botonNivel2.textContent = "Nivel 2";
        botonNivel2.disabled = false;
    } else {
        botonNivel1.textContent = "Nivel 1";
        botonNivel2.textContent = "🔒 Nivel 2";
        botonNivel2.disabled = true;
    }

    botonNivel3.disabled = true;
    botonNivel4.disabled = true;
    botonNivel5.disabled = true;
}

function cargarProgreso() {
    const progresoGuardado = localStorage.getItem("nivel1Completado");

    if (progresoGuardado === "true") {
        nivel1Completado = true;
    }
}

cargarProgreso();

botonComenzar.addEventListener("click", () => {
    pantallaBienvenida.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonNivel1.addEventListener("click", () => {
    pantallaMapa.classList.add("hidden");
    pantallaJuego.classList.remove("hidden");

    preguntaActual = 0;
    respuestasCorrectas = 0;

    mostrarPregunta();
});

botonVolverMapa.addEventListener("click", () => {
    pantallaJuego.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});
