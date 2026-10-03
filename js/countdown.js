const pantallaContador = document.getElementById("countdown-screen");
const textoContador = document.getElementById("countdown-text");

export function iniciarCuentaRegresiva(callback) {
    pantallaContador.classList.remove("hidden");

    let cuenta = 3;

    textoContador.textContent = cuenta;

    const intervalo = setInterval(() => {
        cuenta--;

        if (cuenta > 0) {
            textoContador.textContent = cuenta;
        } else if (cuenta === 0) {
            textoContador.textContent = "¡GO!";
        } else {
            clearInterval(intervalo);

            pantallaContador.classList.add("hidden");

            callback();
        }
    }, 1000);
}