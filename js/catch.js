const juegoCatch = document.getElementById("catch-game");
const jugadorCatch = document.getElementById("catch-player");
const progresoCatch = document.getElementById("catch-progress");

const botonCatchIzquierda = document.getElementById("catch-left");
const botonCatchDerecha = document.getElementById("catch-right");

const tiempoCatch = document.getElementById("catch-time");

const botonReintentarCatch = document.getElementById("catch-retry");
const botonSiguienteCatch = document.getElementById("catch-next-level");


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


function iniciarTemporizadorCatch() {
    clearInterval(intervaloCatch);

    intervaloCatch = setInterval(() => {
        if (!catchActivo) {
            return;
        }

        tiempoRestanteCatch--;

        tiempoCatch.textContent =
            `Tiempo: ${tiempoRestanteCatch}s`;

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

    objetoCatch.elemento.dataset.tipo =
        objetoCatch.tipo.tipo;

    objetoCatch.elemento.style.left =
        `${objetoCatch.posicionX}%`;

    objetoCatch.elemento.style.top =
        `${objetoCatch.posicionY}px`;
}


function detectarColisionCatch(objetoCatch) {
    const jugador = jugadorCatch.getBoundingClientRect();
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


function crearObjetoCatch() {
    const elemento = document.createElement("div");

    elemento.classList.add("catch__object");

    const tipo = generarTipoObjetoCatch();

    const objeto = {
        elemento: elemento,
        tipo: tipo,
        posicionX:
            Math.floor(Math.random() * 80) + 10,
        posicionY: -30
    };

    elemento.dataset.tipo = tipo.tipo;

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

    for (let i = 0; i < cantidadObjetosCatch; i++) {
        const objeto = crearObjetoCatch();

        objeto.posicionY -= i * 120;

        objeto.elemento.style.top =
            `${objeto.posicionY}px`;

        objetosCatch.push(objeto);
    }
}


function actualizarObjetoCatch() {
    if (catchActivo) {
        objetosCatch.forEach((objetoCatch) => {
            objetoCatch.posicionY +=
                objetoCatch.tipo.velocidad;

            objetoCatch.elemento.style.top =
                `${objetoCatch.posicionY}px`;

            if (detectarColisionCatch(objetoCatch)) {
                atraparObjetoCatch(objetoCatch);
            } else if (
                objetoCatch.posicionY >
                juegoCatch.clientHeight
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

        progresoCatch.textContent =
            `Progreso: ${progresoNivel4}%`;

        ganarCatch();

        return;
    }

    progresoCatch.textContent =
        `Progreso: ${progresoNivel4}%`;
}


function ganarCatch() {
    catchActivo = false;

    clearInterval(intervaloCatch);

    progresoCatch.textContent =
        "¡Nivel 4 completado! 🖤";

    tiempoCatch.textContent =
        "¡Lo lograste!";

    botonReintentarCatch.classList.add("hidden");
    botonSiguienteCatch.classList.remove("hidden");

    if (alGanarCatch) {
        alGanarCatch();
    }
}


function perderCatch() {
    catchActivo = false;

    clearInterval(intervaloCatch);

    tiempoCatch.textContent =
        "¡Se acabó el tiempo! 💀";

    botonReintentarCatch.classList.remove("hidden");
}


export function reiniciarCatch() {
    progresoNivel4 = 0;
    tiempoRestanteCatch = 30;

    posicionJugadorCatch = 50;
    jugadorCatch.style.left = "50%";

    crearObjetosCatch();

    progresoCatch.textContent = "Progreso: 0%";

    tiempoCatch.textContent =
        `Tiempo: ${tiempoRestanteCatch}s`;

    botonReintentarCatch.classList.add("hidden");
    botonSiguienteCatch.classList.add("hidden");

    catchActivo = true;

    iniciarTemporizadorCatch();
}


export function detenerCatch() {
    catchActivo = false;

    clearInterval(intervaloCatch);
}


export function configurarCatch(callbackVictoria) {
    alGanarCatch = callbackVictoria;

    botonCatchIzquierda.addEventListener("click", () => {
        moverJugadorCatch(-5);
    });

    botonCatchDerecha.addEventListener("click", () => {
        moverJugadorCatch(5);
    });

    botonReintentarCatch.addEventListener(
        "click",
        reiniciarCatch
    );

    actualizarObjetoCatch();
}