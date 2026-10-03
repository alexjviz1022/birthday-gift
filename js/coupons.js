const listaCupones =
    document.getElementById("coupons-list");

let cuponesDesbloqueados = [];

const diasValidezCupon = 7;


function guardarCuponesEnStorage() {
    localStorage.setItem(
        "cuponesDesbloqueados",
        JSON.stringify(cuponesDesbloqueados)
    );
}


export function guardarCupon(premio, categoria) {
    const fechaObtenido = Date.now();

    const fechaCaducidad =
        fechaObtenido +
        diasValidezCupon * 24 * 60 * 60 * 1000;

    const nuevoCupon = {
        premio: premio,
        categoria: categoria,
        fechaObtenido: fechaObtenido,
        fechaCaducidad: fechaCaducidad
    };

    cuponesDesbloqueados.push(nuevoCupon);

    guardarCuponesEnStorage();
}


export function cargarCupones() {
    const cuponesGuardados =
        localStorage.getItem("cuponesDesbloqueados");

    if (cuponesGuardados) {
        cuponesDesbloqueados =
            JSON.parse(cuponesGuardados);
    }

    eliminarCuponesVencidos();
}


function eliminarCuponesVencidos() {
    const fechaActual = Date.now();

    cuponesDesbloqueados =
        cuponesDesbloqueados.filter((cupon) => {
            return cupon.fechaCaducidad > fechaActual;
        });

    guardarCuponesEnStorage();
}


export function mostrarCupones() {
    eliminarCuponesVencidos();

    listaCupones.innerHTML = "";

    if (cuponesDesbloqueados.length === 0) {
        listaCupones.textContent =
            "Todavía no tienes cupones disponibles.";

        return;
    }

    cuponesDesbloqueados.forEach((cupon) => {
        const tarjeta =
            document.createElement("div");

        tarjeta.classList.add("coupon-card");

        const premio =
            document.createElement("h3");

        premio.textContent = cupon.premio;

        const categoria =
            document.createElement("p");

        categoria.textContent =
            `Categoría ${cupon.categoria}`;

        const fecha =
            document.createElement("p");

        const fechaCaducidad =
            new Date(cupon.fechaCaducidad);

        fecha.textContent =
            `Disponible hasta: ${fechaCaducidad.toLocaleDateString()}`;

        const botonCanjear =
            document.createElement("button");

        botonCanjear.textContent = "Canjear";

        botonCanjear.classList.add(
            "answer-button"
        );

        botonCanjear.addEventListener(
            "click",
            () => {
                canjearCupon(cupon);
            }
        );

        tarjeta.appendChild(premio);
        tarjeta.appendChild(categoria);
        tarjeta.appendChild(fecha);
        tarjeta.appendChild(botonCanjear);

        listaCupones.appendChild(tarjeta);
    });
}


function canjearCupon(cuponSeleccionado) {
    const confirmarCanje = confirm(
        `¿Seguro que quieres canjear "${cuponSeleccionado.premio}"?`
    );

    if (!confirmarCanje) {
        return;
    }

    cuponesDesbloqueados =
        cuponesDesbloqueados.filter((cupon) => {
            return cupon !== cuponSeleccionado;
        });

    guardarCuponesEnStorage();

    mostrarCupones();
}