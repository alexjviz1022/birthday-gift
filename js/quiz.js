const numeroPregunta =
    document.getElementById("question-number");

const textoPregunta =
    document.getElementById("question-text");

const opcionesRespuesta =
    document.getElementById("answer-options");

const marcadorProgreso =
    document.getElementById("score");

const mensajeFeedback =
    document.getElementById("feedback");

const contenedorRecuerdo =
    document.getElementById("memory");

const textoRecuerdo =
    document.getElementById("memory-text");

const imagenRecuerdo =
    document.getElementById("memory-image");

const pantallaQuiz =
    document.getElementById("game-screen");

const indicadorNivelQuiz =
    document.getElementById("quiz-level");

const barraProgresoQuiz =
    document.getElementById("quiz-progress-fill");


let preguntaActual = 0;
let respuestasCorrectas = 0;

let nivelQuizActual = null;
let preguntasQuizActual = [];

let alCompletarQuiz = null;
let alContinuarQuiz = null;
let alFallarQuiz = null;


/* ==============================
   APARIENCIA DEL NIVEL
   ============================== */

function actualizarTemaQuiz() {
    pantallaQuiz.classList.remove(
        "game--level-1",
        "game--level-3",
        "game--level-5"
    );

    pantallaQuiz.classList.add(
        `game--level-${nivelQuizActual}`
    );

    indicadorNivelQuiz.textContent =
        `NIVEL ${nivelQuizActual}`;
}


/* ==============================
   MOSTRAR PREGUNTA
   ============================== */

function mostrarPregunta() {
    const preguntaEnTurno =
        preguntasQuizActual[preguntaActual];

    const totalPreguntas =
        preguntasQuizActual.length;

    numeroPregunta.textContent =
        `${preguntaActual + 1} / ${totalPreguntas}`;

    textoPregunta.textContent =
        preguntaEnTurno.pregunta;

    marcadorProgreso.textContent =
        `Aciertos: ${respuestasCorrectas} / ${totalPreguntas}`;

    const porcentaje =
        (preguntaActual / totalPreguntas) * 100;

    barraProgresoQuiz.style.width =
        `${porcentaje}%`;

    mensajeFeedback.textContent = "";

    mensajeFeedback.classList.remove(
        "game__feedback--correct",
        "game__feedback--wrong"
    );

    opcionesRespuesta.innerHTML = "";

    preguntaEnTurno.opciones.forEach(
        (opcion, indice) => {

            const boton =
                document.createElement("button");

            boton.textContent = opcion;

            boton.classList.add(
                "answer-button"
            );

            boton.addEventListener(
                "click",
                () => {
                    comprobarRespuesta(indice);
                }
            );

            opcionesRespuesta.appendChild(
                boton
            );
        }
    );
}

function ocultarRecuerdo() {
    contenedorRecuerdo.classList.add("hidden");

    textoRecuerdo.textContent = "";

    imagenRecuerdo.classList.add("hidden");

    imagenRecuerdo.removeAttribute("src");
}


/* ==============================
   COMPROBAR RESPUESTA
   ============================== */

function comprobarRespuesta(
    indiceSeleccionado
) {
    const preguntaEnTurno =
        preguntasQuizActual[preguntaActual];

    opcionesRespuesta.innerHTML = "";

    mensajeFeedback.classList.remove(
        "game__feedback--correct",
        "game__feedback--wrong"
    );

    if (
        indiceSeleccionado ===
        preguntaEnTurno.respuestaCorrecta
    ) {
        respuestasCorrectas++;

        mensajeFeedback.textContent =
            "¡Respuesta correcta! 🖤";

        mensajeFeedback.classList.add(
            "game__feedback--correct"
        );

        textoRecuerdo.textContent =
            preguntaEnTurno.recuerdo;

        if (preguntaEnTurno.imagenRecuerdo) {
            imagenRecuerdo.src =
                preguntaEnTurno.imagenRecuerdo;

            imagenRecuerdo.classList.remove("hidden");

        } else {
            imagenRecuerdo.classList.add("hidden");
            imagenRecuerdo.removeAttribute("src");
        }

        contenedorRecuerdo.classList.remove("hidden");

    } else {

        mensajeFeedback.textContent =
            "Respuesta incorrecta 🔒";

        mensajeFeedback.classList.add(
            "game__feedback--wrong"
        );

       ocultarRecuerdo();
    }


    marcadorProgreso.textContent =
        `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;


    const botonContinuar =
        document.createElement("button");

    botonContinuar.textContent =
        "Continuar";

    botonContinuar.classList.add(
        "answer-button"
    );

    botonContinuar.addEventListener(
        "click",
        avanzarPregunta
    );

    opcionesRespuesta.appendChild(
        botonContinuar
    );
}


/* ==============================
   AVANZAR
   ============================== */

function avanzarPregunta() {
    preguntaActual++;

    mensajeFeedback.textContent = "";

    mensajeFeedback.classList.remove(
        "game__feedback--correct",
        "game__feedback--wrong"
    );

    contenedorRecuerdo.classList.add(
        "hidden"
    );

    textoRecuerdo.textContent = "";

    if (
        preguntaActual <
        preguntasQuizActual.length
    ) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}


/* ==============================
   RESULTADO
   ============================== */

function mostrarResultado() {
    const totalPreguntas =
        preguntasQuizActual.length;

    numeroPregunta.textContent =
        `${totalPreguntas} / ${totalPreguntas}`;

    barraProgresoQuiz.style.width =
        "100%";

    opcionesRespuesta.innerHTML = "";

    mensajeFeedback.textContent = "";

    mensajeFeedback.classList.remove(
        "game__feedback--correct",
        "game__feedback--wrong"
    );

    contenedorRecuerdo.classList.add(
        "hidden"
    );

    textoRecuerdo.textContent = "";

    if (
        respuestasCorrectas ===
        totalPreguntas
    ) {
        textoPregunta.textContent =
            "¡Nivel completado! 🖤";

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${totalPreguntas}`;

        if (alCompletarQuiz) {
            alCompletarQuiz(
                nivelQuizActual
            );
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
                    alContinuarQuiz(
                        nivelQuizActual
                    );
                }
            }
        );

        opcionesRespuesta.appendChild(
            botonContinuarNivel
        );

    } else {

        if (alFallarQuiz) {
            alFallarQuiz(
                nivelQuizActual
            );
        }
    }
}


/* ==============================
   REINICIAR
   ============================== */

function reiniciarNivel() {
    preguntaActual = 0;
    respuestasCorrectas = 0;

    mensajeFeedback.textContent = "";

    mensajeFeedback.classList.remove(
        "game__feedback--correct",
        "game__feedback--wrong"
    );

    contenedorRecuerdo.classList.add(
        "hidden"
    );

    textoRecuerdo.textContent = "";

    barraProgresoQuiz.style.width =
        "0%";

    mostrarPregunta();
}


/* ==============================
   INICIAR QUIZ
   ============================== */

export function iniciarQuiz(
    numeroNivel,
    preguntasNivel
) {
    nivelQuizActual = numeroNivel;
    preguntasQuizActual = preguntasNivel;

    preguntaActual = 0;
    respuestasCorrectas = 0;

    actualizarTemaQuiz();

    ocultarRecuerdo();

    mostrarPregunta();
}


/* ==============================
   CONFIGURACIÓN
   ============================== */

export function configurarQuiz(
    callbackCompletado,
    callbackContinuar,
    callbackFallo
) {
    alCompletarQuiz =
        callbackCompletado;

    alContinuarQuiz =
        callbackContinuar;

    alFallarQuiz =
        callbackFallo;
}