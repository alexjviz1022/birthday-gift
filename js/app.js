
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
const pantallaRunner = document.getElementById("runner-screen");
const jugadorRunner = document.getElementById("runner-player");
const botonSaltar = document.getElementById("runner-jump");
const botonVolverMapaRunner = document.getElementById("runner-back-to-map");
const progresoRunner = document.getElementById("runner-progress");
const obstaculoRunner = document.getElementById("runner-obstacle");
const botonReintentarRunner = document.getElementById("runner-retry");

let preguntaActual = 0;
let respuestasCorrectas = 0;
let nivel1Completado = false;
let nivel2Completado = false;

//Variables de estado nivel 2
let alturaJugador = 0;
let velocidadVertical = 0;
let saltando = false;
let posicionObstaculo = -30;
let runnerActivo = false;
let progresoNivel2 = 0;
let ultimoTiempoRunner = 0;
const duracionRunner = 15000;

function saltar() {
    if (runnerActivo && !saltando) {
        velocidadVertical = 12;
        saltando = true;
    }
}

function actualizarJugador() {
    if (saltando) {
        alturaJugador += velocidadVertical;
        velocidadVertical -= 0.7;

        if (alturaJugador <= 0) {
            alturaJugador = 0;
            velocidadVertical = 0;
            saltando = false;
        }

        jugadorRunner.style.bottom = `${alturaJugador}px`;
    }

    requestAnimationFrame(actualizarJugador);
}

function actualizarProgresoRunner(tiempoActual) {
    if (!runnerActivo) {
        ultimoTiempoRunner = tiempoActual;
        requestAnimationFrame(actualizarProgresoRunner);
        return;
    }

    const tiempoTranscurrido = tiempoActual - ultimoTiempoRunner;

    progresoNivel2 += tiempoTranscurrido;

    const porcentaje = Math.min(
        Math.floor((progresoNivel2 / duracionRunner) * 100),
        100
    );

    progresoRunner.textContent = `Progreso: ${porcentaje}%`;

    ultimoTiempoRunner = tiempoActual;

    if (progresoNivel2 >= duracionRunner) {
        ganarRunner();
    }

    requestAnimationFrame(actualizarProgresoRunner);
}

function ganarRunner() {
    runnerActivo = false;

    progresoRunner.textContent = "¡Nivel 2 completado! 🖤";

    nivel2Completado = true;

    guardarProgreso();
}

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

function actualizarObstaculo() {
    if (runnerActivo) {
        posicionObstaculo += 5;

        obstaculoRunner.style.right = `${posicionObstaculo}px`;

        if (detectarColision()) {
            perderRunner();
        }

        if (posicionObstaculo > 450) {
            posicionObstaculo = -30;
        }
    }

    requestAnimationFrame(actualizarObstaculo);
}

function detectarColision() {
    const jugador = jugadorRunner.getBoundingClientRect();
    const obstaculo = obstaculoRunner.getBoundingClientRect();

    const hayColision =
        jugador.right > obstaculo.left &&
        jugador.left < obstaculo.right &&
        jugador.bottom > obstaculo.top &&
        jugador.top < obstaculo.bottom;

    return hayColision;
}

function perderRunner() {
    runnerActivo = false;

    progresoRunner.textContent = "¡Auch! Chocaste 💥";

    botonSaltar.classList.add("hidden");
    botonReintentarRunner.classList.remove("hidden");
}

function reiniciarRunner() {
    progresoNivel2 = 0;
    posicionObstaculo = -30;

    alturaJugador = 0;
    velocidadVertical = 0;
    saltando = false;

    jugadorRunner.style.bottom = "0px";
    obstaculoRunner.style.right = "-30px";

    progresoRunner.textContent = "Progreso: 0%";

    botonReintentarRunner.classList.add("hidden");
    botonSaltar.classList.remove("hidden");

    ultimoTiempoRunner = performance.now();
    runnerActivo = true;
}

function guardarProgreso() {
    localStorage.setItem("nivel1Completado", nivel1Completado);
    localStorage.setItem("nivel2Completado", nivel2Completado);
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

    if (nivel2Completado) {
        botonNivel2.textContent = "✓ Nivel 2";
        botonNivel3.textContent = "Nivel 3";
        botonNivel3.disabled = false;
    } else {
        botonNivel3.textContent = "🔒 Nivel 3";
        botonNivel3.disabled = true;
    }

    botonNivel4.disabled = true;
    botonNivel5.disabled = true;
}

function cargarProgreso() {
    const nivel1Guardado = localStorage.getItem("nivel1Completado");
    const nivel2Guardado = localStorage.getItem("nivel2Completado");

    if (nivel1Guardado === "true") {
        nivel1Completado = true;
    }

    if (nivel2Guardado === "true") {
        nivel2Completado = true;
    }
}

botonSaltar.addEventListener("click", saltar);

actualizarJugador();

actualizarObstaculo();

cargarProgreso();

requestAnimationFrame(actualizarProgresoRunner);

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

botonNivel2.addEventListener("click", () => {
    if (!nivel1Completado) {
        return;
    }

    pantallaMapa.classList.add("hidden");
    pantallaRunner.classList.remove("hidden");

    reiniciarRunner();
});

botonVolverMapa.addEventListener("click", () => {
    pantallaJuego.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonVolverMapaRunner.addEventListener("click", () => {
    runnerActivo = false;

    pantallaRunner.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonReintentarRunner.addEventListener("click", reiniciarRunner);
