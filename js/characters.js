export const assetsPersonajes = {
    luke: {
        runner: "img/characters/luke.png",
        catch: "img/characters/luke-level-4.webp"
    },

    floky: {
        runner: "img/characters/floky.png",
        catch: "img/characters/floky-level-4.webp"
    },

    jack: {
        runner: "img/characters/jack.png",
        catch: "img/characters/jack-level-4.webp"
    },

    venom: {
        runner: "img/characters/venom.png",
        catch: "img/characters/venom-level-4.webp"
    }
};

export function obtenerAssetPersonaje(personaje, juego) {
    return assetsPersonajes[personaje]?.[juego] ?? null;
}


/* ==============================
   ANIMACIONES DEL RUNNER
   ============================== */

export const animacionesRunner = {
    
luke: {
    carrera: [
        "img/characters/luke/carrera_01.png",
        "img/characters/luke/carrera_02.png",
        "img/characters/luke/carrera_03.png",
        "img/characters/luke/carrera_04.png",
        "img/characters/luke/carrera_05.png",
        "img/characters/luke/carrera_06.png",
        "img/characters/luke/carrera_07.png"
    ],

    salto: [
        "img/characters/luke/salto_01.png",
        "img/characters/luke/salto_02.png",
        "img/characters/luke/salto_03.png",
        "img/characters/luke/salto_04.png",
        "img/characters/luke/salto_05.png"
    ],

    caida: [
        "img/characters/luke/caida_aterrizaje_01.png",
        "img/characters/luke/caida_aterrizaje_02.png",
        "img/characters/luke/caida_aterrizaje_03.png",
        "img/characters/luke/caida_aterrizaje_04.png",
        "img/characters/luke/caida_aterrizaje_05.png"
    ],

    reposo: [
        "img/characters/luke/reposo_01.png",
        "img/characters/luke/reposo_02.png",
        "img/characters/luke/reposo_03.png",
        "img/characters/luke/reposo_04.png"
    ]
},

    
floky: {
    carrera: [
        "img/characters/floky/carrera_01.png",
        "img/characters/floky/carrera_02.png",
        "img/characters/floky/carrera_03.png",
        "img/characters/floky/carrera_04.png",
        "img/characters/floky/carrera_05.png",
        "img/characters/floky/carrera_06.png",
        "img/characters/floky/carrera_07.png"
    ],

    salto: [
        "img/characters/floky/salto_01.png",
        "img/characters/floky/salto_02.png",
        "img/characters/floky/salto_03.png",
        "img/characters/floky/salto_04.png",
        "img/characters/floky/salto_05.png"
    ],

    caida: [
        "img/characters/floky/caida_aterrizaje_01.png",
        "img/characters/floky/caida_aterrizaje_02.png",
        "img/characters/floky/caida_aterrizaje_03.png",
        "img/characters/floky/caida_aterrizaje_04.png",
        "img/characters/floky/caida_aterrizaje_05.png"
    ],

    reposo: [
        "img/characters/floky/reposo_01.png",
        "img/characters/floky/reposo_02.png",
        "img/characters/floky/reposo_03.png",
        "img/characters/floky/reposo_04.png"
    ]
},
    
jack: {
    carrera: [
        "img/characters/jack/carrera_01.png",
        "img/characters/jack/carrera_02.png",
        "img/characters/jack/carrera_03.png",
        "img/characters/jack/carrera_04.png",
        "img/characters/jack/carrera_05.png",
        "img/characters/jack/carrera_06.png",
        "img/characters/jack/carrera_07.png"
    ],

    salto: [
        "img/characters/jack/salto_01.png",
        "img/characters/jack/salto_02.png",
        "img/characters/jack/salto_03.png",
        "img/characters/jack/salto_04.png",
        "img/characters/jack/salto_05.png"
    ],

    caida: [
        "img/characters/jack/caida_aterrizaje_01.png",
        "img/characters/jack/caida_aterrizaje_02.png",
        "img/characters/jack/caida_aterrizaje_03.png",
        "img/characters/jack/caida_aterrizaje_04.png",
        "img/characters/jack/caida_aterrizaje_05.png"
    ],

    reposo: [
        "img/characters/jack/reposo_01.png",
        "img/characters/jack/reposo_02.png",
        "img/characters/jack/reposo_03.png",
        "img/characters/jack/reposo_04.png"
    ]
},

    venom: {
        carrera: [
            "img/characters/venom/carrera_01.png",
            "img/characters/venom/carrera_02.png",
            "img/characters/venom/carrera_03.png",
            "img/characters/venom/carrera_04.png",
            "img/characters/venom/carrera_05.png",
            "img/characters/venom/carrera_06.png",
            "img/characters/venom/carrera_07.png"
        ],

        salto: [
            "img/characters/venom/salto_01.png",
            "img/characters/venom/salto_02.png",
            "img/characters/venom/salto_03.png",
            "img/characters/venom/salto_04.png",
            "img/characters/venom/salto_05.png"
        ],

        caida: [
            "img/characters/venom/caida_aterrizaje_01.png",
            "img/characters/venom/caida_aterrizaje_02.png",
            "img/characters/venom/caida_aterrizaje_03.png",
            "img/characters/venom/caida_aterrizaje_04.png",
            "img/characters/venom/caida_aterrizaje_05.png"
        ],

        reposo: [
            "img/characters/venom/reposo_01.png",
            "img/characters/venom/reposo_02.png",
            "img/characters/venom/reposo_03.png",
            "img/characters/venom/reposo_04.png"
        ]
    }
};

