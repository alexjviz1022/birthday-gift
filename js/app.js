
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
        desbloqueada: false
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
        desbloqueada: false
    }
];

let preguntaActual = 0;
let recuerdosDesbloqueados = 0;

function mostrarPregunta() {
    const preguntaEnTurno = preguntas[preguntaActual];

    numeroPregunta.textContent = `Pregunta ${preguntaActual + 1}`;
    textoPregunta.textContent = preguntaEnTurno.pregunta;
    marcadorProgreso.textContent =
    `Recuerdos: ${recuerdosDesbloqueados} / ${preguntas.length}`;

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

        if (!preguntaEnTurno.desbloqueada) {
            preguntaEnTurno.desbloqueada = true;
            recuerdosDesbloqueados++;
        }

        marcadorProgreso.textContent =
            `Recuerdos: ${recuerdosDesbloqueados} / ${preguntas.length}`;

        mensajeFeedback.textContent = "¡Recuerdo desbloqueado! 🖤";

        textoRecuerdo.textContent = preguntaEnTurno.recuerdo;
        contenedorRecuerdo.classList.remove("hidden");

    } else {
        mensajeFeedback.textContent = "Este recuerdo sigue bloqueado 🔒";
    }

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

    if (recuerdosDesbloqueados === preguntas.length) {
        textoPregunta.textContent = "¡Nivel completado! 🖤";
        marcadorProgreso.textContent =
            `Recuerdos: ${recuerdosDesbloqueados} / ${preguntas.length}`;
    } else {
        textoPregunta.textContent =
            `Has desbloqueado ${recuerdosDesbloqueados} de ${preguntas.length} recuerdos`;

        const botonReintentar = document.createElement("button");

        botonReintentar.textContent = "Jugar de nuevo";
        botonReintentar.classList.add("answer-button");
        botonReintentar.addEventListener("click", reiniciarNivel);

        opcionesRespuesta.appendChild(botonReintentar);
    }
}

function reiniciarNivel() {
    preguntaActual = 0;

    mensajeFeedback.textContent = "";
    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    mostrarPregunta();
}

botonComenzar.addEventListener("click", () => {
    pantallaBienvenida.classList.add("hidden");
    pantallaJuego.classList.remove("hidden");

    mostrarPregunta();
});