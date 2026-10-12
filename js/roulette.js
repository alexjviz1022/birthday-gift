const categoriasRuleta = [
    {
        nombre: "Azul",
        probabilidad: 50,
        premios: [
            "Masaje de pies",
            "Dulce favorito",
            "Película de tu elección",
            "Cartita",
            "Pan de dulce",
            "Papas"
        ]
    },
    {
        nombre: "Amarillo",
        probabilidad: 30,
        premios: [
            "Una rosa",
            "Paseo en el parque",
            "Cocinarte",
            "Ida al centro",
            "Algo de prichos",
            "Una recarga"
        ]
    },
    {
        nombre: "Verde",
        probabilidad: 15,
        premios: [
            "Salida al cine",
            "Cena en restaurante",
            "Comida en restaurante",
            "Desayuno en restaurante",
            "Exprimir los granos que quieras por 30 minutos",
            "Canción catada para ti"
        ]
    },
    {
        nombre: "Rojo",
        probabilidad: 5,
        premios: [
            "Un juguete",
            "Una muñeca",
            "Objeto miniatura",
            "Six Flags",
            "Obra de teatro",
            "Lo que se te ocurra"
        ]
    }
];


let historialPremiosRuleta = [];
let ultimaTiradaRuleta = null;


function obtenerFechaActual() {
    return new Date().toISOString().split("T")[0];
}


function puedeGirarRuleta() {
    const fechaActual = obtenerFechaActual();

    return ultimaTiradaRuleta !== fechaActual;
}


function cargarUltimaTiradaRuleta() {
    ultimaTiradaRuleta =
        localStorage.getItem("ultimaTiradaRuleta");
}


function guardarHistorialRuleta() {
    localStorage.setItem(
        "historialPremiosRuleta",
        JSON.stringify(historialPremiosRuleta)
    );
}


function cargarHistorialRuleta() {
    const historialGuardado =
        localStorage.getItem("historialPremiosRuleta");

    if (historialGuardado) {
        historialPremiosRuleta =
            JSON.parse(historialGuardado);
    }
}


function seleccionarCategoriaRuleta() {
    const numeroAleatorio = Math.random() * 100;

    let acumulado = 0;

    for (const categoria of categoriasRuleta) {
        acumulado += categoria.probabilidad;

        if (numeroAleatorio < acumulado) {
            return categoria;
        }
    }

    return categoriasRuleta[0];
}


function seleccionarPremioRuleta(categoria) {
    const premiosDisponibles =
        categoria.premios.filter((premio) => {
            return !historialPremiosRuleta.includes(premio);
        });

    if (premiosDisponibles.length === 0) {
        return null;
    }

    const indiceAleatorio = Math.floor(
        Math.random() * premiosDisponibles.length
    );

    return premiosDisponibles[indiceAleatorio];
}


export function cargarRuleta() {
    cargarHistorialRuleta();
    cargarUltimaTiradaRuleta();
}


export function intentarGirarRuleta() {
    if (!puedeGirarRuleta()) {
        return {
            exito: false,
            motivo: "bloqueada"
        };
    }

    const categoriaSeleccionada =
        seleccionarCategoriaRuleta();

    const premioSeleccionado =
        seleccionarPremioRuleta(categoriaSeleccionada);

    if (!premioSeleccionado) {
        return {
            exito: false,
            motivo: "sin-premios"
        };
    }

    historialPremiosRuleta.push(premioSeleccionado);

    if (historialPremiosRuleta.length > 10) {
        historialPremiosRuleta.shift();
    }

    guardarHistorialRuleta();

    ultimaTiradaRuleta = obtenerFechaActual();

    localStorage.setItem(
        "ultimaTiradaRuleta",
        ultimaTiradaRuleta
    );

    return {
        exito: true,
        premio: premioSeleccionado,
        categoria: categoriaSeleccionada.nombre
    };
}