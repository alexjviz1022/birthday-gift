const listaCupones =
    document.getElementById("coupons-list");
const modalCanje =
    document.getElementById("redeem-modal");

const modalCanjeEtiqueta =
    document.getElementById("redeem-modal-label");

const modalCanjePremio =
    document.getElementById("redeem-modal-prize");

const modalCanjeMensaje =
    document.getElementById("redeem-modal-message");

const botonConfirmarCanje =
    document.getElementById("redeem-confirm");

const botonCancelarCanje =
    document.getElementById("redeem-cancel");

let cuponesDesbloqueados = [];
let cuponSeleccionadoParaCanje = null;

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
    cuponSeleccionadoParaCanje =
        cuponSeleccionado;

    modalCanjeEtiqueta.textContent =
        "CANJEAR RECOMPENSA";

    modalCanjePremio.textContent =
        cuponSeleccionado.premio;

    modalCanjeMensaje.textContent =
        "¿Quieres utilizar esta recompensa ahora? Una vez canjeada, desaparecerá de tus cupones disponibles.";

    botonConfirmarCanje.textContent =
        "🖤 Sí, canjear";

    botonCancelarCanje.textContent =
        "Cancelar";

    botonCancelarCanje.classList.remove(
        "hidden"
    );

    modalCanje.classList.remove("hidden");
}

let canjeConfirmado = false;


botonCancelarCanje.addEventListener(
    "click",
    () => {
        cuponSeleccionadoParaCanje = null;
        canjeConfirmado = false;

        modalCanje.classList.add("hidden");
    }
);


botonConfirmarCanje.addEventListener(
    "click",
    () => {

        if (canjeConfirmado) {
            canjeConfirmado = false;

            modalCanje.classList.add("hidden");

            return;
        }


        if (!cuponSeleccionadoParaCanje) {
            return;
        }


        const premioCanjeado =
            cuponSeleccionadoParaCanje.premio;


        cuponesDesbloqueados =
            cuponesDesbloqueados.filter(
                (cupon) => {
                    return (
                        cupon !==
                        cuponSeleccionadoParaCanje
                    );
                }
            );


        guardarCuponesEnStorage();

        mostrarCupones();


        cuponSeleccionadoParaCanje = null;

        canjeConfirmado = true;


        modalCanjeEtiqueta.textContent =
            "✦ RECOMPENSA CANJEADA ✦";

        modalCanjePremio.textContent =
            premioCanjeado;

        modalCanjeMensaje.textContent =
            "Tu cupón ha sido utilizado. Espero que disfrutes mucho tu recompensa. 🖤";

        botonConfirmarCanje.textContent =
            "Cerrar";

        botonCancelarCanje.classList.add(
            "hidden"
        );
    }
);
