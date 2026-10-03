const numeroPregunta = document.getElementById("question-number");
const textoPregunta = document.getElementById("question-text");
const opcionesRespuesta = document.getElementById("answer-options");
const marcadorProgreso = document.getElementById("score");
const mensajeFeedback = document.getElementById("feedback");
const contenedorRecuerdo = document.getElementById("memory");
const textoRecuerdo = document.getElementById("memory-text");


let preguntaActual = 0;
let respuestasCorrectas = 0;

let nivelQuizActual = null;
let preguntasQuizActual = [];

let alCompletarQuiz = null;
let alContinuarQuiz = null;


function mostrarPregunta() {
    const preguntaEnTurno =
        preguntasQuizActual[preguntaActual];

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1}`;

    textoPregunta.textContent =
        preguntaEnTurno.pregunta;

    marcadorProgreso.textContent =
        `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

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
    const preguntaEnTurno =
        preguntasQuizActual[preguntaActual];

    opcionesRespuesta.innerHTML = "";

    if (
        indiceSeleccionado ===
        preguntaEnTurno.respuestaCorrecta
    ) {
        respuestasCorrectas++;

        mensajeFeedback.textContent =
            "¡Respuesta correcta! 🖤";

        textoRecuerdo.textContent =
            preguntaEnTurno.recuerdo;

        contenedorRecuerdo.classList.remove("hidden");
    } else {
        mensajeFeedback.textContent =
            "Respuesta incorrecta 🔒";

        contenedorRecuerdo.classList.add("hidden");
        textoRecuerdo.textContent = "";
    }

    marcadorProgreso.textContent =
        `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

    const botonContinuar =
        document.createElement("button");

    botonContinuar.textContent = "Continuar";
    botonContinuar.classList.add("answer-button");

    botonContinuar.addEventListener(
        "click",
        avanzarPregunta
    );

    opcionesRespuesta.appendChild(botonContinuar);
}


function avanzarPregunta() {
    preguntaActual++;

    mensajeFeedback.textContent = "";

    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    if (preguntaActual < preguntasQuizActual.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}


function mostrarResultado() {
    numeroPregunta.textContent =
        `Nivel ${nivelQuizActual}`;

    opcionesRespuesta.innerHTML = "";
    mensajeFeedback.textContent = "";

    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    if (
        respuestasCorrectas ===
        preguntasQuizActual.length
    ) {
        textoPregunta.textContent =
            "¡Nivel completado! 🖤";

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

        if (alCompletarQuiz) {
            alCompletarQuiz(nivelQuizActual);
        }

        const botonContinuarNivel =
            document.createElement("button");

        botonContinuarNivel.classList.add(
            "answer-button"
        );

        if (nivelQuizActual === 5) {
            botonContinuarNivel.textContent =
                "Continuar";
        } else {
            botonContinuarNivel.textContent =
                "Siguiente nivel";
        }

        botonContinuarNivel.addEventListener(
            "click",
            () => {
                if (alContinuarQuiz) {
                    alContinuarQuiz(nivelQuizActual);
                }
            }
        );

        opcionesRespuesta.appendChild(
            botonContinuarNivel
        );
    } else {
        textoPregunta.textContent =
            `Conseguiste ${respuestasCorrectas} de ${preguntasQuizActual.length} respuestas correctas`;

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

        const botonReintentar =
            document.createElement("button");

        botonReintentar.textContent =
            "Intentar de nuevo";

        botonReintentar.classList.add(
            "answer-button"
        );

        botonReintentar.addEventListener(
            "click",
            reiniciarNivel
        );

        opcionesRespuesta.appendChild(
            botonReintentar
        );
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


export function iniciarQuiz(numeroNivel, preguntasNivel) {
    nivelQuizActual = numeroNivel;
    preguntasQuizActual = preguntasNivel;

    preguntaActual = 0;
    respuestasCorrectas = 0;

    mostrarPregunta();
}


export function configurarQuiz(
    callbackCompletado,
    callbackContinuar
) {
    alCompletarQuiz = callbackCompletado;
    alContinuarQuiz = callbackContinuar;
}