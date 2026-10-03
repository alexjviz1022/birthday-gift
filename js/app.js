import {
    preguntasNivel1,
    preguntasNivel3,
    preguntasNivel5
} from "./questions.js";

import { iniciarCuentaRegresiva } from "./countdown.js";

import {
    guardarProgreso,
    cargarProgreso
} from "./progress.js";

import {
    configurarRunner,
    reiniciarRunner,
    detenerRunner
} from "./runner.js";

import {
    configurarCatch,
    reiniciarCatch,
    detenerCatch
} from "./catch.js";

import {
    configurarQuiz,
    iniciarQuiz
} from "./quiz.js";

import {
    cargarRuleta,
    intentarGirarRuleta
} from "./roulette.js";

import {
    guardarCupon,
    cargarCupones,
    mostrarCupones
} from "./coupons.js";

// ==============================
// DOM
// ==============================

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

const pantallaRunner = document.getElementById("runner-screen");
const botonVolverMapaRunner = document.getElementById("runner-back-to-map");
const botonSiguienteRunner = document.getElementById("runner-next-level");

const pantallaCatch = document.getElementById("catch-screen");
const botonVolverMapaCatch = document.getElementById("catch-back-to-map");
const botonSiguienteCatch = document.getElementById("catch-next-level");

const pantallaFinal = document.getElementById("final-screen");
const botonContinuarFinal = document.getElementById("final-continue");

const botonPremios = document.getElementById("rewards-button");
const pantallaPremios = document.getElementById("rewards-screen");

const botonRuleta = document.getElementById("roulette-button");
const botonVideos = document.getElementById("videos-button");
const botonVolverPremios = document.getElementById("rewards-back");

const pantallaRuleta = document.getElementById("roulette-screen");

const botonGirarRuleta = document.getElementById("spin-button");
const botonVolverRuleta = document.getElementById("roulette-back");

const botonCupones = document.getElementById("coupons-button");
const pantallaCupones = document.getElementById("coupons-screen");
const botonVolverCupones = document.getElementById("coupons-back");

const modalCupon = document.getElementById("coupon-modal");
const modalTituloCupon = document.getElementById("coupon-modal-title");
const modalCategoriaCupon = document.getElementById("coupon-modal-category");
const modalPremioCupon = document.getElementById("coupon-modal-prize");
const modalMensajeCupon = document.getElementById("coupon-modal-message");
const botonCerrarModalCupon = document.getElementById("coupon-modal-close")

const pantallaVideos = document.getElementById("videos-screen");
const botonVolverVideos = document.getElementById("videos-back");

const pantallaInicioNivel = document.getElementById("level-intro");
const textoInicioNivel = document.getElementById("level-intro-placeholder");
const botonComenzarNivel = document.getElementById("level-intro-start");
const botonVolverInicioNivel = document.getElementById("level-intro-back");

// ==============================
// ESTADO GLOBAL
// ==============================

let nivelSeleccionado = null;

let nivel1Completado = false;
let nivel2Completado = false;
let nivel3Completado = false;
let nivel4Completado = false;
let nivel5Completado = false;

let finalVisto = false;

// ==============================
// FUNCIONES
// ==============================

function mostrarInicioNivel(numeroNivel) {
    nivelSeleccionado = numeroNivel;

    pantallaMapa.classList.add("hidden");
    pantallaInicioNivel.classList.remove("hidden");

    textoInicioNivel.textContent = `Nivel ${numeroNivel}`;
}

function mostrarFinal() {
    pantallaJuego.classList.add("hidden");
    pantallaFinal.classList.remove("hidden");
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

function iniciarNivelQuiz(numeroNivel, preguntasNivel) {
    pantallaJuego.classList.remove("hidden");

    iniciarQuiz(numeroNivel, preguntasNivel);
}

function iniciarNivelRunner() {
    pantallaRunner.classList.remove("hidden");

    reiniciarRunner();
}

function iniciarNivelCatch() {
    pantallaCatch.classList.remove("hidden");

    reiniciarCatch();
}

function guardarEstadoActual() {
    guardarProgreso({
        nivel1Completado,
        nivel2Completado,
        nivel3Completado,
        nivel4Completado,
        nivel5Completado,
        finalVisto
    });
}

// ==============================
// CONFIGURACIÓN DE MÓDULOS
// ==============================

configurarRunner(() => {
    nivel2Completado = true;
    guardarEstadoActual();
});

configurarCatch(() => {
    nivel4Completado = true;
    guardarEstadoActual();
});

configurarQuiz(
    (nivelCompletado) => {
        if (nivelCompletado === 1) {
            nivel1Completado = true;
        }

        if (nivelCompletado === 3) {
            nivel3Completado = true;
        }

        if (nivelCompletado === 5) {
            nivel5Completado = true;
        }

        guardarEstadoActual();
    },

    (nivelCompletado) => {
        pantallaJuego.classList.add("hidden");

        if (nivelCompletado === 5) {
            mostrarFinal();
            return;
        }

        mostrarInicioNivel(nivelCompletado + 1);
    }
);

// ==============================
// CARGA INICIAL
// ==============================

const progresoGuardado = cargarProgreso();

nivel1Completado = progresoGuardado.nivel1Completado;
nivel2Completado = progresoGuardado.nivel2Completado;
nivel3Completado = progresoGuardado.nivel3Completado;
nivel4Completado = progresoGuardado.nivel4Completado;
nivel5Completado = progresoGuardado.nivel5Completado;
finalVisto = progresoGuardado.finalVisto;

cargarCupones();

cargarRuleta();

// ==============================
// EVENTOS
// ==============================

botonComenzar.addEventListener("click", () => {
    pantallaBienvenida.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonNivel1.addEventListener("click", () => {
    mostrarInicioNivel(1);
});

botonNivel2.addEventListener("click", () => {
    if (!nivel1Completado) {
        return;
    }

    mostrarInicioNivel(2);
});

botonNivel3.addEventListener("click", () => {
    if (!nivel2Completado) {
        return;
    }

    mostrarInicioNivel(3);
});

botonNivel4.addEventListener("click", () => {
    if (!nivel3Completado) {
        return;
    }

    mostrarInicioNivel(4);
});

botonNivel5.addEventListener("click", () => {
    if (!nivel4Completado) {
        return;
    }

    mostrarInicioNivel(5);
});

botonComenzarNivel.addEventListener("click", () => {
    pantallaInicioNivel.classList.add("hidden");

    if (nivelSeleccionado === 1) {
        iniciarNivelQuiz(1, preguntasNivel1);
    }

    if (nivelSeleccionado === 2) {
        iniciarCuentaRegresiva(() => {
            iniciarNivelRunner();
        });
    }

    if (nivelSeleccionado === 3) {
        iniciarNivelQuiz(3, preguntasNivel3);
    }

    if (nivelSeleccionado === 4) {
        iniciarCuentaRegresiva(() => {
            iniciarNivelCatch();
        });
    }

    if (nivelSeleccionado === 5) {
        iniciarNivelQuiz(5, preguntasNivel5);
    }
});

botonVolverInicioNivel.addEventListener("click", () => {
    pantallaInicioNivel.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    nivelSeleccionado = null;
});

botonVolverMapa.addEventListener("click", () => {
    pantallaJuego.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonVolverMapaRunner.addEventListener("click", () => {
    detenerRunner();

    pantallaRunner.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonVolverMapaCatch.addEventListener("click", () => {
    detenerCatch();

    pantallaCatch.classList.add("hidden");
    pantallaMapa.classList.remove("hidden");

    actualizarMapa();
});

botonSiguienteRunner.addEventListener("click", () => {
    detenerRunner();

    pantallaRunner.classList.add("hidden");

    mostrarInicioNivel(3);
});

botonSiguienteCatch.addEventListener("click", () => {
    detenerCatch();

    pantallaCatch.classList.add("hidden");

    mostrarInicioNivel(5);
});

botonContinuarFinal.addEventListener("click", () => {
    finalVisto = true;
    guardarEstadoActual();

    pantallaFinal.classList.add("hidden");
    pantallaPremios.classList.remove("hidden");

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

botonRuleta.addEventListener("click", () => {
    pantallaPremios.classList.add("hidden");
    pantallaRuleta.classList.remove("hidden");
});

botonVolverRuleta.addEventListener("click", () => {
    pantallaRuleta.classList.add("hidden");
    pantallaPremios.classList.remove("hidden");
});

botonGirarRuleta.addEventListener("click", () => {
    const resultado = intentarGirarRuleta();

    if (!resultado.exito) {
        if (resultado.motivo === "bloqueada") {
            modalTituloCupon.textContent =
                "🔒 Ruleta bloqueada";

            modalCategoriaCupon.textContent = "";

            modalPremioCupon.textContent =
                "Ya utilizaste tu tirada de hoy. Vuelve mañana 🖤";

            modalMensajeCupon.textContent = "";

            botonCerrarModalCupon.textContent =
                "Entendido";

            modalCupon.classList.remove("hidden");
        }

        return;
    }

    guardarCupon(
        resultado.premio,
        resultado.categoria
    );

    botonCerrarModalCupon.textContent =
        "Guardar cupón 🖤";

    modalTituloCupon.textContent =
        "🎟️ ¡Nuevo cupón!";

    modalCategoriaCupon.textContent =
        `Categoría ${resultado.categoria}`;

    modalPremioCupon.textContent =
        resultado.premio;

    modalMensajeCupon.textContent =
        "Tu recompensa ha sido guardada en Mis cupones.";

    modalCupon.classList.remove("hidden");
});

botonCupones.addEventListener("click", () => {
    pantallaPremios.classList.add("hidden");
    pantallaCupones.classList.remove("hidden");

    mostrarCupones();
});

botonVolverCupones.addEventListener("click", () => {
    pantallaCupones.classList.add("hidden");
    pantallaPremios.classList.remove("hidden");
});

botonCerrarModalCupon.addEventListener("click", () => {
    modalCupon.classList.add("hidden");
});

botonVideos.addEventListener("click", () => {
    pantallaPremios.classList.add("hidden");
    pantallaVideos.classList.remove("hidden");
});

botonVolverVideos.addEventListener("click", () => {
    pantallaVideos.classList.add("hidden");
    pantallaPremios.classList.remove("hidden");
});