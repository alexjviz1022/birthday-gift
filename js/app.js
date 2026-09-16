
const pantallaBienvenida = document.getElementById("welcome-screen")
const pantallaJuego = document.getElementById("game-screen")
const botonComenzar = document.getElementById("start-button")
const numeroPregunta = document.getElementById("question-number");
const textoPregunta = document.getElementById("question-text");
const opcionesRespuesta = document.getElementById("answer-options");
const preguntas = [
    {
        pregunta: "¿Dónde fue nuestra primera cita?",
        opciones: [
            "Coyoacán",
            "Un café",
            "El cine",
            "Otro lugar"
        ],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuál de estas cosas me recuerda más a ti?",
        opciones: [
            "La música",
            "Las estrellas",
            "El café",
            "Los gatos"
        ],
        respuestaCorrecta: 1
    }
];

let preguntaActual = 0;

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];

    numeroPregunta.textContent = `Pregunta ${preguntaActual + 1}`;
    textoPregunta.textContent = pregunta.pregunta;

    opcionesRespuesta.innerHTML = "";

    pregunta.opciones.forEach((opcion, indice) => {
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
    const pregunta = preguntas[preguntaActual];

    if (indiceSeleccionado === pregunta.respuestaCorrecta) {
        console.log("Respuesta correcta");
    } else {
        textoPregunta.textContent = "Has terminado esta parte";
        numeroPregunta.textContent = "";
        opcionesRespuesta.innerHTML = "";
    }
    
    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        console.log("Juego terminado");
    }
}

botonComenzar.addEventListener("click", () => {
    pantallaBienvenida.classList.add("hidden");
    pantallaJuego.classList.remove("hidden");

    mostrarPregunta();
});

