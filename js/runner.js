const jugadorRunner = document.getElementById("runner-player");
const botonSaltar = document.getElementById("runner-jump");
const progresoRunner = document.getElementById("runner-progress");
const obstaculoRunner = document.getElementById("runner-obstacle");
const botonReintentarRunner = document.getElementById("runner-retry");
const botonSiguienteRunner = document.getElementById("runner-next-level");


let alturaJugador = 0;
let velocidadVertical = 0;
let saltando = false;

let posicionObstaculo = -30;
let runnerActivo = false;

let progresoNivel2 = 0;
let ultimoTiempoRunner = 0;

const duracionRunner = 15000;

let alGanarRunner = null;


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


function ganarRunner() {
    runnerActivo = false;

    progresoRunner.textContent = "¡Nivel 2 completado! 🖤";

    botonSaltar.classList.add("hidden");
    botonReintentarRunner.classList.add("hidden");
    botonSiguienteRunner.classList.remove("hidden");

    if (alGanarRunner) {
        alGanarRunner();
    }
}


function actualizarProgresoRunner(tiempoActual) {
    if (!runnerActivo) {
        ultimoTiempoRunner = tiempoActual;
        requestAnimationFrame(actualizarProgresoRunner);
        return;
    }

    const tiempoTranscurrido =
        tiempoActual - ultimoTiempoRunner;

    progresoNivel2 += tiempoTranscurrido;

    const porcentaje = Math.min(
        Math.floor((progresoNivel2 / duracionRunner) * 100),
        100
    );

    progresoRunner.textContent =
        `Progreso: ${porcentaje}%`;

    ultimoTiempoRunner = tiempoActual;

    if (progresoNivel2 >= duracionRunner) {
        ganarRunner();
    }

    requestAnimationFrame(actualizarProgresoRunner);
}


export function reiniciarRunner() {
    progresoNivel2 = 0;
    posicionObstaculo = -30;

    alturaJugador = 0;
    velocidadVertical = 0;
    saltando = false;

    jugadorRunner.style.bottom = "0px";
    obstaculoRunner.style.right = "-30px";

    progresoRunner.textContent = "Progreso: 0%";

    botonReintentarRunner.classList.add("hidden");
    botonSiguienteRunner.classList.add("hidden");
    botonSaltar.classList.remove("hidden");

    ultimoTiempoRunner = performance.now();
    runnerActivo = true;
}


export function detenerRunner() {
    runnerActivo = false;
}


export function configurarRunner(callbackVictoria) {
    alGanarRunner = callbackVictoria;

    botonSaltar.addEventListener("click", saltar);
    botonReintentarRunner.addEventListener("click", reiniciarRunner);

    actualizarJugador();
    actualizarObstaculo();

    requestAnimationFrame(actualizarProgresoRunner);
}