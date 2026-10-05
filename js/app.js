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

const imagenHistoria = document.getElementById("story-image");
const capituloHistoria = document.getElementById("story-chapter");
const tituloHistoria = document.getElementById("story-title");
const descripcionHistoria = document.getElementById("story-description");

const botonSiguienteHistoria = document.getElementById("story-next");

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

let escenaHistoriaActual = 0;

let tipoHistoriaActual = "intro";

// ==============================
// FUNCIONES
// ==============================

function mostrarInicioNivel(numeroNivel) {
    nivelSeleccionado = numeroNivel;

    tipoHistoriaActual = "intro";
    escenaHistoriaActual = 0;

    pantallaMapa.classList.add("hidden");
    pantallaInicioNivel.classList.remove("hidden");

    mostrarEscenaHistoria();
}

function mostrarFinalNivel(numeroNivel) {
    nivelSeleccionado = numeroNivel;

    tipoHistoriaActual = "final";
    escenaHistoriaActual = 0;

    pantallaJuego.classList.add("hidden");
    pantallaRunner.classList.add("hidden");
    pantallaCatch.classList.add("hidden");

    pantallaInicioNivel.classList.remove("hidden");

    mostrarEscenaHistoria();
}

function mostrarFailHistoria(numeroNivel) {
    nivelSeleccionado = numeroNivel;

    pantallaJuego.classList.add("hidden");
    pantallaInicioNivel.classList.remove("hidden");

    tipoHistoriaActual = "fail";
    escenaHistoriaActual = 0;

    mostrarEscenaHistoria();
}

function mostrarFinal() {
    pantallaJuego.classList.add("hidden");
    pantallaFinal.classList.remove("hidden");
}

function mostrarEscenaHistoria() {
    const nivel = historiasNiveles[nivelSeleccionado];

    if (!nivel) {
        return;
    }

    const historia = nivel[tipoHistoriaActual];

    if (!historia) {
        return;
    }

    const escena = historia[escenaHistoriaActual];

    capituloHistoria.textContent =
        `Nivel ${nivelSeleccionado}`;

    tituloHistoria.textContent =
        escena.titulo;

    descripcionHistoria.textContent =
        escena.texto;

    if (escena.imagen) {
    imagenHistoria.style.backgroundImage =
        `url("${escena.imagen}")`;

    imagenHistoria.innerHTML = "";
    }    

    const esUltimaEscena =
        escenaHistoriaActual === historia.length - 1;

    if (!esUltimaEscena) {
        botonSiguienteHistoria.textContent = "Siguiente";

        botonSiguienteHistoria.classList.remove("hidden");
        botonComenzarNivel.classList.add("hidden");

        return;
    }

    if (tipoHistoriaActual === "intro") {
        botonSiguienteHistoria.classList.add("hidden");
        botonComenzarNivel.classList.remove("hidden");

        return;
    }

    if (tipoHistoriaActual === "fail") {
    botonComenzarNivel.classList.add("hidden");

    botonSiguienteHistoria.textContent =
        "Intentar de nuevo";

    botonSiguienteHistoria.classList.remove("hidden");

    return;
    }

    if (tipoHistoriaActual === "final") {
        botonComenzarNivel.classList.add("hidden");

        botonSiguienteHistoria.textContent =
            nivelSeleccionado === 5
                ? "Continuar"
                : "Siguiente nivel";

        botonSiguienteHistoria.classList.remove("hidden");
    }
}


function actualizarMapa() {
    
    const niveles = [
        {
            boton: botonNivel1,
            numero: 1,
            completado: nivel1Completado,
            desbloqueado: true
        },
        {
            boton: botonNivel2,
            numero: 2,
            completado: nivel2Completado,
            desbloqueado: nivel1Completado
        },
        {
            boton: botonNivel3,
            numero: 3,
            completado: nivel3Completado,
            desbloqueado: nivel2Completado
        },
        {
            boton: botonNivel4,
            numero: 4,
            completado: nivel4Completado,
            desbloqueado: nivel3Completado
        },
        {
            boton: botonNivel5,
            numero: 5,
            completado: nivel5Completado,
            desbloqueado: nivel4Completado
        }
    ];

    niveles.forEach((nivel) => {
        nivel.boton.classList.remove(
            "level-button--available",
            "level-button--locked",
            "level-button--completed"
        );

        if (nivel.completado) {
            nivel.boton.textContent = "✓";
            nivel.boton.disabled = false;
            nivel.boton.classList.add("level-button--completed");

        } else if (nivel.desbloqueado) {
            nivel.boton.textContent = nivel.numero;
            nivel.boton.disabled = false;
            nivel.boton.classList.add("level-button--available");

        } else {
            nivel.boton.textContent = "🔒";
            nivel.boton.disabled = true;
            nivel.boton.classList.add("level-button--locked");
        }
    });


    botonPremios.classList.remove(
        "level-button--rewards-locked",
        "level-button--rewards-available"
    );

    if (nivel5Completado && finalVisto) {
        botonPremios.textContent = "🎁";
        botonPremios.disabled = false;
        botonPremios.classList.add(
            "level-button--rewards-available"
        );
    } else {
        botonPremios.textContent = "🔒";
        botonPremios.disabled = true;
        botonPremios.classList.add(
            "level-button--rewards-locked"
        );
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

        mostrarFinalNivel(nivelCompletado);
    },

    (nivelFallado) => {
        pantallaJuego.classList.add("hidden");

        mostrarFailHistoria(nivelFallado);
    }
);

const historiasNiveles = {
    1: {
    intro: [
        {
            titulo: "El camino hacia el castillo",
            texto:
                "Luke y Floky continuaban su camino hacia el misterioso castillo que se alzaba a lo lejos.",
            imagen:
                "img/story/level-1/scene-1.png"
        },
        {
            titulo: "Una extraña casa",
            texto:
                "Mientras avanzaban, descubrieron una pequeña casa escondida entre los árboles. Algo en ella despertó su curiosidad.",
            imagen:
                "img/story/level-1/scene-2.png"
        },
        {
            titulo: "La curiosidad pudo más",
            texto:
                "Sin saber qué encontrarían dentro, Luke y Floky decidieron acercarse y cruzar el pequeño puente.",
            imagen:
                "img/story/level-1/scene-3.png"
        },
        {
            titulo: "Una extraña anciana",
            texto:
                "Cuando se acercaron, la puerta se abrió lentamente. Una extraña anciana apareció y los invitó a acercarse.",
            imagen:
                "img/story/level-1/scene-4.png"
        },
        {
            titulo: "¡Era una trampa!",
            texto:
                "Pero aquella anciana no era lo que parecía. Antes de que pudieran escapar, la bruja fue tras ellos.",
            imagen:
                "img/story/level-1/scene-5.png"
        },
        {
            titulo: "La prueba de la bruja",
            texto:
                "Si quieren salir de aquí sin ser convertidos en sapos, tendrán que demostrar cuánto conocen la historia de sus humanos.",
            imagen:
                "img/story/level-1/scene-6.png"
        }
    ],

    fail: [{
    imagen: "img/story/level-1/fail.png",
    capitulo: "La maldición de la bruja",
    titulo: "¡Oh, no...! 🐸",
    descripcion:
        "La bruja cumplió su amenaza... Luke y Floky han sido convertidos en sapos. Tendrán que intentarlo de nuevo si quieren recuperar su verdadera forma."
    }],

    final: [
        {
            titulo: "¡Maldición!",
            texto:
                "La bruja no podía creerlo. Luke y Floky habían conseguido superar su prueba.",
            imagen:
                "img/story/level-1/victory.png"
        },
        {
            titulo: "¡Largo de aquí!",
            texto:
                "Furiosa por haber sido derrotada, la bruja los expulsó de la cabaña. Luke y Floky salieron corriendo sin mirar atrás.",
            imagen:
                "img/story/level-1/escape.png"
        }
    ]
},

    2: {
        intro: [
            {
                titulo: "Una huida apresurada",
                texto:
                    "Luke y Floky corrieron tan rápido para alejarse de la casa de la bruja que dejaron de prestar atención al camino."
            },
            {
                titulo: "Un pequeño problema...",
                texto:
                    "Cuando quisieron detenerse ya era demasiado tarde. Frente a ellos, el camino terminaba abruptamente."
            },
            {
                titulo: "¡El bosque!",
                texto:
                    "Los dos cayeron hacia el bosque que se extendía bajo el sendero. Por suerte lograron salir ilesos... más o menos."
            },
            {
                titulo: "Algo se mueve entre los árboles",
                texto:
                    "Mientras buscaban una salida comenzaron a escuchar ramas romperse detrás de ellos. Definitivamente no estaban solos."
            },
            {
                titulo: "¡Corre!",
                texto:
                    "Sea lo que sea que está ahí detrás, parece acercarse. Uno de nuestros aventureros tendrá que atravesar el bosque y esquivar todos los obstáculos."
            }
        ],

        final: [
            {
                titulo: "Por poco...",
                texto:
                    "Después de correr entre árboles y obstáculos, finalmente lograron dejar atrás aquello que los perseguía."
            },
            {
                titulo: "Unas ruinas",
                texto:
                    "Al recuperar el aliento, Luke y Floky levantaron la mirada. Frente a ellos se encontraban unas antiguas ruinas iluminadas por una extraña luz."
            }
        ]
    },


    3: {
        intro: [
            {
                titulo: "Las ruinas",
                texto:
                    "Sin otra ruta evidente, Luke y Floky decidieron atravesar las antiguas ruinas."
            },
            {
                titulo: "Un camino bloqueado",
                texto:
                    "Pero al llegar al viejo paso de piedra descubrieron que alguien —o algo— les impedía continuar."
            },
            {
                titulo: "El guardián",
                texto:
                    "Un enorme troll apareció entre las ruinas. No parecía dispuesto a dejarlos pasar gratuitamente."
            },
            {
                titulo: "Una nueva prueba",
                texto:
                    "El troll les ofreció un trato: si logran responder correctamente sus preguntas sobre la historia de sus humanos, podrán continuar."
            }
        ],

        final: [
            {
                titulo: "El troll ha sido derrotado",
                texto:
                    "Contra todo pronóstico, Luke y Floky lograron responder correctamente las preguntas del guardián."
            },
            {
                titulo: "El camino continúa",
                texto:
                    "Resignado, el troll se hizo a un lado y permitió que los aventureros siguieran avanzando hacia el castillo."
            }
        ]
    },


    4: {
        intro: [
            {
                titulo: "Un extraño árbol",
                texto:
                    "Después de abandonar las ruinas, Luke y Floky encontraron un enorme árbol que parecía brillar bajo la luz de la luna."
            },
            {
                titulo: "Una lluvia inesperada",
                texto:
                    "De pronto comenzaron a caer extraños objetos desde sus ramas. Algunos parecían útiles... otros definitivamente no."
            },
            {
                titulo: "La prueba del árbol",
                texto:
                    "Para continuar deberán recoger suficientes objetos buenos y evitar aquellos que puedan hacerles daño."
            },
            {
                titulo: "¡Prepárate!",
                texto:
                    "Muévete de un lado a otro, atrapa los objetos correctos y alcanza el objetivo antes de que termine el tiempo."
            }
        ],

        final: [
            {
                titulo: "¡Objetivo conseguido!",
                texto:
                    "Después de esquivar peligros y recoger suficientes objetos, el extraño árbol finalmente dejó de sacudir sus ramas."
            },
            {
                titulo: "El sonido del agua",
                texto:
                    "A lo lejos comenzaron a escuchar agua caer. El camino hacia el castillo parecía conducir directamente hacia una gran cascada."
            }
        ]
    },


    5: {
        intro: [
            {
                titulo: "La cascada",
                texto:
                    "Luke y Floky llegaron hasta una hermosa cascada iluminada por la luna. El castillo estaba más cerca que nunca."
            },
            {
                titulo: "Una voz entre el agua",
                texto:
                    "Cuando intentaron continuar, una misteriosa melodía comenzó a escucharse entre el sonido de la cascada."
            },
            {
                titulo: "La sirena",
                texto:
                    "Desde el agua apareció una sirena que conocía sorprendentemente bien la historia que había llevado a nuestros aventureros hasta allí."
            },
            {
                titulo: "La última prueba",
                texto:
                    "Solo queda un desafío. Si logran responder correctamente las últimas preguntas sobre sus humanos, el camino hacia el castillo quedará abierto."
            }
        ],

        final: [
            {
                titulo: "La última prueba ha terminado",
                texto:
                    "La sirena sonrió. Luke y Floky habían demostrado que conocían la historia que habían venido siguiendo durante toda su aventura."
            },
            {
                titulo: "El castillo",
                texto:
                    "La cascada comenzó a brillar y el camino finalmente apareció ante ellos. Al otro lado, el castillo los esperaba."
            },
            {
                titulo: "El final del camino",
                texto:
                    "Después de brujas, bosques, trolls y extrañas pruebas, Luke y Floky finalmente habían llegado a su destino."
            }
        ]
    }
};

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

botonSiguienteHistoria.addEventListener("click", () => {
    const nivel = historiasNiveles[nivelSeleccionado];

    if (!nivel) {
        return;
    }

    const historia = nivel[tipoHistoriaActual];

    if (escenaHistoriaActual < historia.length - 1) {
        escenaHistoriaActual++;
        mostrarEscenaHistoria();
        return;
    }

    if (tipoHistoriaActual === "fail") {
        pantallaInicioNivel.classList.add("hidden");

        if (nivelSeleccionado === 1) {
            iniciarNivelQuiz(1, preguntasNivel1);
        }

        if (nivelSeleccionado === 3) {
            iniciarNivelQuiz(3, preguntasNivel3);
        }

        if (nivelSeleccionado === 5) {
            iniciarNivelQuiz(5, preguntasNivel5);
        }

        return;
    }

    if (tipoHistoriaActual === "final") {
        if (nivelSeleccionado === 5) {
            mostrarFinal();
            return;
        }

        mostrarInicioNivel(nivelSeleccionado + 1);
    }
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

    mostrarFinalNivel(2);
});

botonSiguienteCatch.addEventListener("click", () => {
    detenerCatch();

    pantallaCatch.classList.add("hidden");

    mostrarFinalNivel(4);
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