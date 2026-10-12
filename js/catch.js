const juegoCatch =
    document.getElementById("catch-game");

const jugadorCatch =
    document.getElementById("catch-player");

const progresoCatch =
    document.getElementById("catch-progress");

const barraProgresoCatch =
    document.getElementById("catch-progress-fill");

const estadoCatch =
    document.getElementById("catch-status");

const botonCatchIzquierda =
    document.getElementById("catch-left");

const botonCatchDerecha =
    document.getElementById("catch-right");

const tiempoCatch =
    document.getElementById("catch-time");

const botonReintentarCatch =
    document.getElementById("catch-retry");

const botonSiguienteCatch =
    document.getElementById("catch-next-level");


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


let posicionJugadorCatch = 50;
let catchActivo = false;

let progresoNivel4 = 0;
let tiempoRestanteCatch = 30;
let intervaloCatch = null;

let objetosCatch = [];

const cantidadObjetosCatch = 2;

let alGanarCatch = null;


/* ==============================
   TEMPORIZADOR
   ============================== */

function iniciarTemporizadorCatch() {
    clearInterval(intervaloCatch);

    intervaloCatch = setInterval(() => {
        if (!catchActivo) {
            return;
        }

        tiempoRestanteCatch--;

        tiempoCatch.textContent =
            `${tiempoRestanteCatch}s`;

        if (tiempoRestanteCatch <= 0) {
            perderCatch();
        }
    }, 1000);
}


/* ==============================
   OBJETOS
   ============================== */

function reiniciarObjetoCatch(objetoCatch) {
    objetoCatch.tipo =
        generarTipoObjetoCatch();

    objetoCatch.posicionX =
        Math.floor(Math.random() * 80) + 10;

    objetoCatch.posicionY =
        -(Math.floor(Math.random() * 150) + 40);

    objetoCatch.elemento.dataset.tipo =
        objetoCatch.tipo.tipo;

    objetoCatch.elemento.style.left =
        `${objetoCatch.posicionX}%`;

    objetoCatch.elemento.style.top =
        `${objetoCatch.posicionY}px`;
}


function crearObjetoCatch() {
    const elemento =
        document.createElement("div");

    elemento.classList.add("catch__object");

    const tipo = generarTipoObjetoCatch();

    const objeto = {
        elemento,
        tipo,
        posicionX:
            Math.floor(Math.random() * 80) + 10,
        posicionY: -40
    };

    elemento.dataset.tipo =
        tipo.tipo;

    elemento.style.left =
        `${objeto.posicionX}%`;

    elemento.style.top =
        `${objeto.posicionY}px`;

    juegoCatch.appendChild(elemento);

    return objeto;
}


function crearObjetosCatch() {
    objetosCatch.forEach((objeto) => {
        objeto.elemento.remove();
    });

    objetosCatch = [];

    for (
        let i = 0;
        i < cantidadObjetosCatch;
        i++
    ) {
        const objeto = crearObjetoCatch();

        objeto.posicionY -= i * 120;

        objeto.elemento.style.top =
            `${objeto.posicionY}px`;

        objetosCatch.push(objeto);
    }
}


/* ==============================
   COLISIONES
   ============================== */

function detectarColisionCatch(objetoCatch) {
    const jugador =
        jugadorCatch.getBoundingClientRect();

    const objeto =
        objetoCatch.elemento.getBoundingClientRect();

    return (
        jugador.right > objeto.left &&
        jugador.left < objeto.right &&
        jugador.bottom > objeto.top &&
        jugador.top < objeto.bottom
    );
}


function atraparObjetoCatch(objetoCatch) {
    modificarProgresoCatch(
        objetoCatch.tipo.puntosAtrapar
    );

    reiniciarObjetoCatch(objetoCatch);
}


function perderObjetoCatch(objetoCatch) {
    modificarProgresoCatch(
        objetoCatch.tipo.puntosPerder
    );

    reiniciarObjetoCatch(objetoCatch);
}


/* ==============================
   MOVIMIENTO
   ============================== */

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

    jugadorCatch.style.left =
        `${posicionJugadorCatch}%`;
}


/* ==============================
   ANIMACIÓN DE OBJETOS
   ============================== */

function actualizarObjetoCatch() {
    if (catchActivo) {
        objetosCatch.forEach((objetoCatch) => {

            objetoCatch.posicionY +=
                objetoCatch.tipo.velocidad;

            objetoCatch.elemento.style.top =
                `${objetoCatch.posicionY}px`;

            if (
                detectarColisionCatch(objetoCatch)
            ) {
                atraparObjetoCatch(objetoCatch);
            }

            else if (
                objetoCatch.posicionY >
                juegoCatch.clientHeight
            ) {
                perderObjetoCatch(objetoCatch);
            }
        });
    }

    requestAnimationFrame(
        actualizarObjetoCatch
    );
}


/* ==============================
   TIPO ALEATORIO
   ============================== */

function generarTipoObjetoCatch() {
    const numeroAleatorio =
        Math.random() * 100;

    let acumulado = 0;

    for (
        const tipoObjeto of tiposObjetosCatch
    ) {
        acumulado +=
            tipoObjeto.probabilidad;

        if (numeroAleatorio < acumulado) {
            return tipoObjeto;
        }
    }

    return tiposObjetosCatch[0];
}


/* ==============================
   PROGRESO
   ============================== */

function modificarProgresoCatch(cantidad) {
    progresoNivel4 += cantidad;

    if (progresoNivel4 < 0) {
        progresoNivel4 = 0;
    }

    if (progresoNivel4 > 100) {
        progresoNivel4 = 100;
    }

    progresoCatch.textContent =
        `${progresoNivel4}%`;

    barraProgresoCatch.style.width =
        `${progresoNivel4}%`;

    if (progresoNivel4 >= 100) {
        ganarCatch();
    }
}


/* ==============================
   VICTORIA
   ============================== */

function ganarCatch() {
    catchActivo = false;

    clearInterval(intervaloCatch);

    progresoCatch.textContent =
        "100%";

    barraProgresoCatch.style.width =
        "100%";

    tiempoCatch.textContent =
        `${tiempoRestanteCatch}s`;

    estadoCatch.textContent =
        "¡Lo lograste! 🖤";

    botonCatchIzquierda.classList.add(
        "hidden"
    );

    botonCatchDerecha.classList.add(
        "hidden"
    );

    botonReintentarCatch.classList.add(
        "hidden"
    );

    botonSiguienteCatch.classList.remove(
        "hidden"
    );

    if (alGanarCatch) {
        alGanarCatch();
    }
}


/* ==============================
   DERROTA
   ============================== */

function perderCatch() {
    catchActivo = false;

    clearInterval(intervaloCatch);

    tiempoCatch.textContent = "0s";

    estadoCatch.textContent =
        "¡Se acabó el tiempo! 💀";

    botonCatchIzquierda.classList.add(
        "hidden"
    );

    botonCatchDerecha.classList.add(
        "hidden"
    );

    botonReintentarCatch.classList.remove(
        "hidden"
    );
}


/* ==============================
   REINICIAR
   ============================== */

export function reiniciarCatch() {
    progresoNivel4 = 0;

    tiempoRestanteCatch = 30;

    posicionJugadorCatch = 50;

    jugadorCatch.style.left = "50%";

    crearObjetosCatch();

    progresoCatch.textContent = "0%";

    barraProgresoCatch.style.width =
        "0%";

    tiempoCatch.textContent =
        `${tiempoRestanteCatch}s`;

    estadoCatch.textContent =
        "¡Atrápalos!";

    botonCatchIzquierda.classList.remove(
        "hidden"
    );

    botonCatchDerecha.classList.remove(
        "hidden"
    );

    botonReintentarCatch.classList.add(
        "hidden"
    );

    botonSiguienteCatch.classList.add(
        "hidden"
    );

    catchActivo = true;

    iniciarTemporizadorCatch();
}


/* ==============================
   DETENER
   ============================== */

export function detenerCatch() {
    catchActivo = false;

    clearInterval(intervaloCatch);
}


/* ==============================
   CONFIGURACIÓN
   ============================== */

export function configurarCatch(callbackVictoria) {
    alGanarCatch = callbackVictoria;

    botonCatchIzquierda.addEventListener(
        "click",
        () => {
            moverJugadorCatch(-5);
        }
    );

    botonCatchDerecha.addEventListener(
        "click",
        () => {
            moverJugadorCatch(5);
        }
    );

    botonReintentarCatch.addEventListener(
        "click",
        reiniciarCatch
    );

    actualizarObjetoCatch();
}