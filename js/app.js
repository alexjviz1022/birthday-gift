
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

const preguntasNivel1 = [
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
const preguntasNivel3 = [
    {
        pregunta: "Pregunta intermedia de prueba 1",
        opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
        respuestaCorrecta: 2,
        recuerdo: "Recuerdo del Nivel 3 🖤"
    },
    {
        pregunta: "Pregunta intermedia de prueba 2",
        opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
        respuestaCorrecta: 0,
        recuerdo: "Otro recuerdo del Nivel 3 ✨"
    }
];
const preguntasNivel5 = [
    {
        pregunta: "Pregunta final de prueba 1",
        opciones: [
            "Respuesta A",
            "Respuesta B",
            "Respuesta C",
            "Respuesta D"
        ],
        respuestaCorrecta: 0,
        recuerdo: "Recuerdo final de prueba 1 🖤",
        desbloqueada: false
    },
    {
        pregunta: "Pregunta final de prueba 2",
        opciones: [
            "Respuesta A",
            "Respuesta B",
            "Respuesta C",
            "Respuesta D"
        ],
        respuestaCorrecta: 2,
        recuerdo: "Recuerdo final de prueba 2 ✨",
        desbloqueada: false
    }
];

const pantallaRunner = document.getElementById("runner-screen");
const jugadorRunner = document.getElementById("runner-player");
const botonSaltar = document.getElementById("runner-jump");
const botonVolverMapaRunner = document.getElementById("runner-back-to-map");
const progresoRunner = document.getElementById("runner-progress");
const obstaculoRunner = document.getElementById("runner-obstacle");
const botonReintentarRunner = document.getElementById("runner-retry");

const pantallaCatch = document.getElementById("catch-screen");
const juegoCatch = document.getElementById("catch-game");
const jugadorCatch = document.getElementById("catch-player");
const progresoCatch = document.getElementById("catch-progress");

const botonCatchIzquierda = document.getElementById("catch-left");
const botonCatchDerecha = document.getElementById("catch-right");
const botonVolverMapaCatch = document.getElementById("catch-back-to-map");
const tiempoCatch = document.getElementById("catch-time");
const botonReintentarCatch = document.getElementById("catch-retry");

const tiposObjetosCatch = [
    {
        tipo: "normal",
        puntosAtrapar: 5,
        puntosPerder: 0,
        probabilidad: 30,
        velocidad: 3
    },
    {
        tipo: "importante",
        puntosAtrapar: 10,
        puntosPerder: -5,
        probabilidad: 25,
        velocidad: 3.2
    },
    {
        tipo: "malo",
        puntosAtrapar: -10,
        puntosPerder: 0,
        probabilidad: 35,
        velocidad: 4.5
    },
    {
        tipo: "especial",
        puntosAtrapar: 20,
        puntosPerder: 0,
        probabilidad: 10,
        velocidad: 3.5
    }
];

const pantallaFinal = document.getElementById("final-screen");
const botonContinuarFinal = document.getElementById("final-continue");

const botonPremios = document.getElementById("rewards-button");
const pantallaPremios = document.getElementById("rewards-screen");

const botonRuleta = document.getElementById("roulette-button");
const botonVideos = document.getElementById("videos-button");
const botonVolverPremios = document.getElementById("rewards-back");


let preguntaActual = 0;
let respuestasCorrectas = 0;

//Estado de niveles
let nivel1Completado = false;
let nivel2Completado = false;
let nivel3Completado = false;
let nivel4Completado = false;
let nivel5Completado = false;

let nivelQuizActual = 1;
let preguntasQuizActual = preguntasNivel1;

//Variables de estado nivel 2
let alturaJugador = 0;
let velocidadVertical = 0;
let saltando = false;
let posicionObstaculo = -30;
let runnerActivo = false;
let progresoNivel2 = 0;
let ultimoTiempoRunner = 0;
const duracionRunner = 15000;

//Variables de estado nivel 4
let posicionJugadorCatch = 50;
let catchActivo = false;
let progresoNivel4 = 0;
let tiempoRestanteCatch = 30;
let intervaloCatch = null;
let objetosCatch = [];
const cantidadObjetosCatch = 2;

//Variable final estado
let finalVisto = false;

function iniciarTemporizadorCatch() {
    clearInterval(intervaloCatch);

    intervaloCatch = setInterval(() => {
        if (!catchActivo) {
            return;
        }

        tiempoRestanteCatch--;

        tiempoCatch.textContent = `Tiempo: ${tiempoRestanteCatch}s`;

        if (tiempoRestanteCatch <= 0) {
            perderCatch();
        }
    }, 1000);
}

function reiniciarObjetoCatch(objetoCatch) {
    objetoCatch.tipo = generarTipoObjetoCatch();

    objetoCatch.posicionX =
        Math.floor(Math.random() * 80) + 10;

    objetoCatch.posicionY =
        -(Math.floor(Math.random() * 150) + 30);

    objetoCatch.elemento.dataset.tipo = objetoCatch.tipo.tipo;

    objetoCatch.elemento.style.left =
        `${objetoCatch.posicionX}%`;

    objetoCatch.elemento.style.top =
        `${objetoCatch.posicionY}px`;
}

function detectarColisionCatch(objetoCatch) {
    const jugador = jugadorCatch.getBoundingClientRect();
    const objeto = objetoCatch.elemento.getBoundingClientRect();

    return (
        jugador.right > objeto.left &&
        jugador.left < objeto.right &&
        jugador.bottom > objeto.top &&
        jugador.top < objeto.bottom
    );
}

function atraparObjetoCatch(objetoCatch) {
    modificarProgresoCatch(objetoCatch.tipo.puntosAtrapar);

    reiniciarObjetoCatch(objetoCatch);
}

function perderObjetoCatch(objetoCatch) {
    modificarProgresoCatch(objetoCatch.tipo.puntosPerder);

    reiniciarObjetoCatch(objetoCatch);
}

function moverJugadorCatch(direccion) {
    if (!catchActivo) {
        return;
    }

    posicionJugadorCatch += direccion;

    if (posicionJugadorCatch < 10) {
        posicionJugadorCatch = 10;
    }

    if (posicionJugadorCatch > 90) {
        posicionJugadorCatch = 90;
    }

    jugadorCatch.style.left = `${posicionJugadorCatch}%`;
}

function crearObjetoCatch() {
    const elemento = document.createElement("div");

    elemento.classList.add("catch__object");

    const tipo = generarTipoObjetoCatch();

    const objeto = {
        elemento: elemento,
        tipo: tipo,
        posicionX: Math.floor(Math.random() * 80) + 10,
        posicionY: -30
    };

    elemento.dataset.tipo = tipo.tipo;
    elemento.style.left = `${objeto.posicionX}%`;
    elemento.style.top = `${objeto.posicionY}px`;

    juegoCatch.appendChild(elemento);

    return objeto;
}

function crearObjetosCatch() {
    objetosCatch.forEach((objeto) => {
        objeto.elemento.remove();
    });

    objetosCatch = [];

    for (let i = 0; i < cantidadObjetosCatch; i++) {
        const objeto = crearObjetoCatch();

        objeto.posicionY -= i * 120;
        objeto.elemento.style.top = `${objeto.posicionY}px`;

        objetosCatch.push(objeto);
    }
}

function actualizarObjetoCatch() {
    if (catchActivo) {

        objetosCatch.forEach((objetoCatch) => {

            objetoCatch.posicionY += objetoCatch.tipo.velocidad;

            objetoCatch.elemento.style.top =
                `${objetoCatch.posicionY}px`;

            if (detectarColisionCatch(objetoCatch)) {
                atraparObjetoCatch(objetoCatch);

            } else if (
                objetoCatch.posicionY > juegoCatch.clientHeight
            ) {
                perderObjetoCatch(objetoCatch);
            }
        });
    }

    requestAnimationFrame(actualizarObjetoCatch);
}

function generarTipoObjetoCatch() {
    const numeroAleatorio = Math.random() * 100;

    let acumulado = 0;

    for (const tipoObjeto of tiposObjetosCatch) {
        acumulado += tipoObjeto.probabilidad;

        if (numeroAleatorio < acumulado) {
            return tipoObjeto;
        }
    }

    return tiposObjetosCatch[0];
}

function modificarProgresoCatch(cantidad) {
    progresoNivel4 += cantidad;

    if (progresoNivel4 < 0) {
        progresoNivel4 = 0;
    }

    if (progresoNivel4 >= 100) {
        progresoNivel4 = 100;

        progresoCatch.textContent = `Progreso: ${progresoNivel4}%`;

        ganarCatch();
        return;
    }

    progresoCatch.textContent = `Progreso: ${progresoNivel4}%`;
}

function ganarCatch() {
    catchActivo = false;
    clearInterval(intervaloCatch);

    nivel4Completado = true;
    guardarProgreso();

    progresoCatch.textContent = "¡Nivel 4 completado! 🖤";
    tiempoCatch.textContent = "¡Lo lograste!";
}

function perderCatch() {
    catchActivo = false;
    clearInterval(intervaloCatch);

    tiempoCatch.textContent = "¡Se acabó el tiempo! 💀";

    botonReintentarCatch.classList.remove("hidden");
}

function reiniciarCatch() {
    progresoNivel4 = 0;
    tiempoRestanteCatch = 30;

    posicionJugadorCatch = 50;
    jugadorCatch.style.left = "50%";

    crearObjetosCatch();

    progresoCatch.textContent = "Progreso: 0%";
    tiempoCatch.textContent = `Tiempo: ${tiempoRestanteCatch}s`;

    botonReintentarCatch.classList.add("hidden");

    catchActivo = true;

    iniciarTemporizadorCatch();
}

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
    const preguntaEnTurno = preguntasQuizActual[preguntaActual];

    numeroPregunta.textContent = `Pregunta ${preguntaActual + 1}`;
    textoPregunta.textContent = preguntaEnTurno.pregunta;

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
    const preguntaEnTurno = preguntasQuizActual[preguntaActual];

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
        `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

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

    if (preguntaActual < preguntasQuizActual.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    numeroPregunta.textContent = `Nivel ${nivelQuizActual}`;

    opcionesRespuesta.innerHTML = "";
    mensajeFeedback.textContent = "";
    contenedorRecuerdo.classList.add("hidden");
    textoRecuerdo.textContent = "";

    if (respuestasCorrectas === preguntasQuizActual.length) {
        if (nivelQuizActual === 1) {
            nivel1Completado = true;
        }

        if (nivelQuizActual === 3) {
            nivel3Completado = true;
        }

        if (nivelQuizActual === 5) {
            nivel5Completado = true;
        }

        guardarProgreso();

        textoPregunta.textContent = "¡Nivel completado! 🖤";

        if (nivelQuizActual === 5 && !finalVisto) {
            const botonFinal = document.createElement("button");

            botonFinal.textContent = "🎁 Descubrir mi recompensa";
            botonFinal.classList.add("answer-button");

            botonFinal.addEventListener("click", mostrarFinal);

            opcionesRespuesta.appendChild(botonFinal);
        }

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

    } else {
        textoPregunta.textContent =
            `Conseguiste ${respuestasCorrectas} de ${preguntasQuizActual.length} respuestas correctas`;

        marcadorProgreso.textContent =
            `Aciertos: ${respuestasCorrectas} / ${preguntasQuizActual.length}`;

        const botonReintentar = document.createElement("button");

        botonReintentar.textContent = "Intentar de nuevo";
        botonReintentar.classList.add("answer-button");
        botonReintentar.addEventListener("click", reiniciarNivel);

        opcionesRespuesta.appendChild(botonReintentar);
    }
}

function mostrarFinal() {
    pantallaJuego.classList.add("hidden");
    pantallaFinal.classList.remove("hidden");
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
    localStorage.setItem("nivel3Completado", nivel3Completado);
    localStorage.setItem("nivel4Completado", nivel4Completado);
    localStorage.setItem("nivel5Completado", nivel5Completado);
    localStorage.setItem("finalVisto", finalVisto);
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

    if (nivel3Completado) {
    botonNivel3.textContent = "✓ Nivel 3";
    botonNivel4.textContent = "Nivel 4";
    botonNivel4.disabled = false;
    } else {
    botonNivel4.textContent = "🔒 Nivel 4";
    botonNivel4.disabled = true;
    }

    if (nivel4Completado) {
    botonNivel4.textContent = "✓ Nivel 4";
    botonNivel5.textContent = "Nivel 5";
    botonNivel5.disabled = false;
    } else {
    botonNivel5.textContent = "🔒 Nivel 5";
    botonNivel5.disabled = true;
    }

    if (nivel5Completado) {
    botonNivel5.textContent = "✓ Nivel 5";

    if (finalVisto) {
    botonPremios.textContent = "🎁 Premios";
    botonPremios.disabled = false;
    } else {
        botonPremios.textContent = "🔒 Premios";
        botonPremios.disabled = true;
    }
}

}

function cargarProgreso() {
    const nivel1Guardado = localStorage.getItem("nivel1Completado");
    const nivel2Guardado = localStorage.getItem("nivel2Completado");
    const nivel3Guardado = localStorage.getItem("nivel3Completado");
    const nivel4Guardado = localStorage.getItem("nivel4Completado");
    const nivel5Guardado = localStorage.getItem("nivel5Completado");
    const finalGuardado = localStorage.getItem("finalVisto");

    if (nivel1Guardado === "true") {
        nivel1Completado = true;
    }

    if (nivel2Guardado === "true") {
        nivel2Completado = true;
    }

    if (nivel3Guardado === "true") {
    nivel3Completado = true;
    }

    if (nivel4Guardado === "true") {
    nivel4Completado = true;
    }

    if (nivel5Guardado === "true") {
    nivel5Completado = true;
    }

    if (finalGuardado === "true") {
    finalVisto = true;
    }
}

botonSaltar.addEventListener("click", saltar);

actualizarJugador();

actualizarObstaculo();

actualizarObjetoCatch();

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

    nivelQuizActual = 1;
    preguntasQuizActual = preguntasNivel1;

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

botonNivel3.addEventListener("click", () => {
    if (!nivel2Completado) {
        return;
    }

    pantallaMapa.classList.add("hidden");
    pantallaJuego.classList.remove("hidden");

    nivelQuizActual = 3;
    preguntasQuizActual = preguntasNivel3;

    preguntaActual = 0;
    respuestasCorrectas = 0;

    mostrarPregunta();
});

botonNivel4.addEventListener("click", () => {
    if (!nivel3Completado) {
        return;
    }

    pantallaMapa.classList.add("hidden");
    pantallaCatch.classList.remove("hidden");

    reiniciarCatch();
});

botonNivel5.addEventListener("click", () => {
    if (!nivel4Completado) {
        return;
    }

    pantallaMapa.classList.add("hidden");
    pantallaJuego.classList.remove("hidden");

    nivelQuizActual = 5;
    preguntasQuizActual = preguntasNivel5;

    preguntaActual = 0;
    respuestasCorrectas = 0;

    mostrarPregunta();
});

botonCatchIzquierda.addEventListener("click", () => {
    moverJugadorCatch(-5);
});

botonCatchDerecha.addEventListener("click", () => {
    moverJugadorCatch(5);
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

botonVolverMapaCatch.addEventListener("click", () => {
    catchActivo = false;
    clearInterval(intervaloCatch);

    pantallaCatch.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonReintentarRunner.addEventListener("click", reiniciarRunner);
botonReintentarCatch.addEventListener("click", reiniciarCatch);

botonContinuarFinal.addEventListener("click", () => {
    finalVisto = true;
    guardarProgreso();

    pantallaFinal.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonPremios.addEventListener("click", () => {
    if (!finalVisto) {
        return;
    }

    pantallaMapa.classList.add("hidden");
    pantallaPremios.classList.remove("hidden");
});

botonVolverPremios.addEventListener("click", () => {
    pantallaPremios.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});