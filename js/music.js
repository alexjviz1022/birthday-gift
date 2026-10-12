
const canciones = [
    "audio/music/halloween-1.mp3",
    "audio/music/halloween-2.mp3",
    "audio/music/halloween-3.mp3",
    "audio/music/halloween-4.mp3"
];

const reproductor = new Audio();

let cancionActual = 0;
let musicaIniciada = false;

reproductor.volume = 0.25;

reproductor.addEventListener("ended", () => {
    cancionActual = (cancionActual + 1) % canciones.length;

    reproductor.src = canciones[cancionActual];
    reproductor.play().catch(error => {
        console.warn("No se pudo continuar la música:", error);
    });
});

export function iniciarMusica() {
    if (musicaIniciada) return;

    reproductor.src = canciones[cancionActual];

    reproductor.play()
        .then(() => {
            musicaIniciada = true;
        })
        .catch(error => {
            console.warn("No se pudo iniciar la música:", error);
        });
}

export function alternarMusica() {
    if (reproductor.paused) {
        if (!reproductor.src) {
            reproductor.src = canciones[cancionActual];
        }

        reproductor.play()
            .then(() => {
                musicaIniciada = true;
            })
            .catch(error => {
                console.warn("No se pudo reanudar la música:", error);
            });
    } else {
        reproductor.pause();
    }
}
