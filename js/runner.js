import { animacionesRunner } from "./characters.js";

const jugadorRunner =
    document.getElementById("runner-player");

const botonSaltar =
    document.getElementById("runner-jump");

const progresoRunner =
    document.getElementById("runner-progress");

const barraProgresoRunner =
    document.getElementById("runner-progress-fill");

const estadoRunner =
    document.getElementById("runner-status");

const escenarioRunner =
    document.getElementById("runner-game");

const obstaculoRunner =
    document.getElementById("runner-obstacle");

const botonReintentarRunner =
    document.getElementById("runner-retry");

const botonSiguienteRunner =
    document.getElementById("runner-next-level");


/* ==============================
   CONFIGURACIÓN
   ============================== */

const duracionRunner = 30000;

// Salto
const impulsoSalto = 14;
const gravedad = 0.75;

// Hombre lobo
const anchoObstaculo = 85;
const velocidadObstaculo = 5;

// Tiempos en milisegundos
const esperaInicial = 2000;
const esperaMinima = 1500;
const esperaMaxima = 3000;


/* ==============================
   ESTADO DEL JUEGO
   ============================== */

let alturaJugador = 0;
let velocidadVertical = 0;
let saltando = false;

let posicionObstaculo = -anchoObstaculo - 5;
let obstaculoVisible = false;
let proximaAparicion = 0;

let runnerActivo = false;

let progresoNivel2 = 0;
let ultimoTiempoRunner = 0;

let alGanarRunner = null;

/* ==============================
   ANIMACIÓN DEL PERSONAJE
   ============================== */

const imagenRunner =
    document.getElementById("runner-character-image");

const placeholderRunner =
    document.getElementById("runner-character-placeholder");

let personajeRunner = "luke";
let animacionActual = "";
let fotogramaActual = 0;
let tiempoUltimoFotograma = 0;

const intervaloFotogramas = 100;

export function seleccionarPersonajeRunner(personaje) {
    personajeRunner = personaje;
    animacionActual = "";
    fotogramaActual = 0;
    tiempoUltimoFotograma = 0;
}

function actualizarAnimacionRunner(tiempoActual) {
    const animaciones = animacionesRunner[personajeRunner];

    if (!animaciones) {
        requestAnimationFrame(actualizarAnimacionRunner);
        return;
    }

    let nuevaAnimacion = "reposo";

    if (runnerActivo) {
        if (saltando) {
            nuevaAnimacion =
                velocidadVertical > 0 ? "salto" : "caida";
        } else {
            nuevaAnimacion = "carrera";
        }
    }

    if (nuevaAnimacion !== animacionActual) {
        animacionActual = nuevaAnimacion;
        fotogramaActual = 0;
        tiempoUltimoFotograma = tiempoActual - intervaloFotogramas;
    }

    const fotogramas = animaciones[animacionActual];

    if (
        fotogramas?.length &&
        tiempoActual - tiempoUltimoFotograma >= intervaloFotogramas
    ) {
        imagenRunner.src = fotogramas[fotogramaActual];

        imagenRunner.classList.remove("hidden");
        placeholderRunner.classList.add("hidden");

        fotogramaActual =
            (fotogramaActual + 1) % fotogramas.length;

        tiempoUltimoFotograma = tiempoActual;
    }

    requestAnimationFrame(actualizarAnimacionRunner);
}

/* ==============================
   TIEMPO ALEATORIO
   ============================== */

function obtenerEsperaAleatoria() {
    return Math.random() *
        (esperaMaxima - esperaMinima) +
        esperaMinima;
}


/* ==============================
   SALTO
   ============================== */

function saltar() {
    if (runnerActivo && !saltando) {
        velocidadVertical = impulsoSalto;
        saltando = true;
    }
}


/* ==============================
   JUGADOR
   ============================== */

function actualizarJugador() {
    if (saltando) {
        alturaJugador += velocidadVertical;
        velocidadVertical -= gravedad;

        if (alturaJugador <= 0) {
            alturaJugador = 0;
            velocidadVertical = 0;
            saltando = false;
        }

        jugadorRunner.style.transform =
            `translateY(${-alturaJugador}px)`;
    }

    requestAnimationFrame(actualizarJugador);
}


/* ==============================
   APARICIÓN DEL HOMBRE LOBO
   ============================== */

function aparecerObstaculo() {
    posicionObstaculo = -anchoObstaculo - 5;

    obstaculoRunner.style.right =
        `${posicionObstaculo}px`;

    obstaculoVisible = true;
}


/* ==============================
   MOVIMIENTO DEL HOMBRE LOBO
   ============================== */

function actualizarObstaculo(tiempoActual) {
    if (runnerActivo) {

        if (!obstaculoVisible) {

            if (tiempoActual >= proximaAparicion) {
                aparecerObstaculo();
            }

        } else {

            posicionObstaculo += velocidadObstaculo;

            obstaculoRunner.style.right =
                `${posicionObstaculo}px`;

            if (detectarColision()) {
                perderRunner();
            }

            const anchoEscenario =
                escenarioRunner.clientWidth;

            if (posicionObstaculo > anchoEscenario) {

                obstaculoVisible = false;

                posicionObstaculo =
                    -anchoObstaculo - 5;

                obstaculoRunner.style.right =
                    `${posicionObstaculo}px`;

                proximaAparicion =
                    tiempoActual + obtenerEsperaAleatoria();
            }
        }
    }

    requestAnimationFrame(actualizarObstaculo);
}


/* ==============================
   COLISIÓN
   ============================== */

function detectarColision() {
    const jugador =
        jugadorRunner.getBoundingClientRect();

    const obstaculo =
        obstaculoRunner.getBoundingClientRect();

    // Reducimos la caja de colisión
    // para evitar impactos injustos
    // en los bordes transparentes del PNG.

    const margenHorizontal = 14;
    const margenSuperior = 8;

    const hayColision =
        jugador.right >
            obstaculo.left + margenHorizontal &&

        jugador.left <
            obstaculo.right - margenHorizontal &&

        jugador.bottom >
            obstaculo.top + margenSuperior &&

        jugador.top <
            obstaculo.bottom;

    return hayColision;
}


/* ==============================
   DERROTA
   ============================== */

function perderRunner() {
    runnerActivo = false;

    progresoRunner.textContent =
        "¡Auch! Chocaste 💥";

    estadoRunner.textContent =
        "¡El hombre lobo te atrapó! 🐺";

    botonSaltar.classList.add("hidden");

    botonReintentarRunner.classList.remove(
        "hidden"
    );
}


/* ==============================
   VICTORIA
   ============================== */

function ganarRunner() {
    runnerActivo = false;

    progresoRunner.textContent =
        "¡Nivel 2 completado! 🖤";

    barraProgresoRunner.style.width = "100%";

    estadoRunner.textContent =
        "¡Lograste escapar del bosque!";

    botonSaltar.classList.add("hidden");

    botonReintentarRunner.classList.add(
        "hidden"
    );

    botonSiguienteRunner.classList.remove(
        "hidden"
    );

    if (alGanarRunner) {
        alGanarRunner();
    }
}


/* ==============================
   PROGRESO
   ============================== */

function actualizarProgresoRunner(tiempoActual) {
    if (!runnerActivo) {
        ultimoTiempoRunner = tiempoActual;

        requestAnimationFrame(
            actualizarProgresoRunner
        );

        return;
    }

    const tiempoTranscurrido =
        tiempoActual - ultimoTiempoRunner;

    progresoNivel2 += tiempoTranscurrido;

    const porcentaje = Math.min(
        Math.floor(
            (progresoNivel2 / duracionRunner) * 100
        ),
        100
    );

    progresoRunner.textContent =
        `Progreso: ${porcentaje}%`;

    barraProgresoRunner.style.width =
        `${porcentaje}%`;

    ultimoTiempoRunner = tiempoActual;

    if (progresoNivel2 >= duracionRunner) {
        ganarRunner();
    }

    requestAnimationFrame(
        actualizarProgresoRunner
    );
}


/* ==============================
   REINICIAR
   ============================== */

export function reiniciarRunner() {
    progresoNivel2 = 0;

    alturaJugador = 0;
    velocidadVertical = 0;
    saltando = false;

    jugadorRunner.style.transform =
        "translateY(0)";

    // Reiniciamos el hombre lobo fuera
    // del escenario y programamos
    // su primera aparición.

    posicionObstaculo =
        -anchoObstaculo - 5;

    obstaculoVisible = false;

    obstaculoRunner.style.right =
        `${posicionObstaculo}px`;

    proximaAparicion =
        performance.now() + esperaInicial;

    progresoRunner.textContent =
        "Progreso: 0%";

    barraProgresoRunner.style.width =
        "0%";

    estadoRunner.textContent =
        "¡Corre!";

    botonReintentarRunner.classList.add(
        "hidden"
    );

    botonSiguienteRunner.classList.add(
        "hidden"
    );

    botonSaltar.classList.remove(
        "hidden"
    );

    ultimoTiempoRunner = performance.now();

    runnerActivo = true;
}


/* ==============================
   DETENER
   ============================== */

export function detenerRunner() {
    runnerActivo = false;
}


/* ==============================
   CONFIGURACIÓN INICIAL
   ============================== */

export function configurarRunner(callbackVictoria) {
    alGanarRunner = callbackVictoria;

    botonSaltar.addEventListener(
        "click",
        saltar
    );

    botonReintentarRunner.addEventListener(
        "click",
        reiniciarRunner
    );

    actualizarJugador();

    requestAnimationFrame(actualizarObstaculo);

    requestAnimationFrame(
        actualizarProgresoRunner
    );
    requestAnimationFrame(actualizarAnimacionRunner);
}
