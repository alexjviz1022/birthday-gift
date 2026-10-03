export function guardarProgreso(progreso) {
    localStorage.setItem("nivel1Completado", progreso.nivel1Completado);
    localStorage.setItem("nivel2Completado", progreso.nivel2Completado);
    localStorage.setItem("nivel3Completado", progreso.nivel3Completado);
    localStorage.setItem("nivel4Completado", progreso.nivel4Completado);
    localStorage.setItem("nivel5Completado", progreso.nivel5Completado);
    localStorage.setItem("finalVisto", progreso.finalVisto);
}


export function cargarProgreso() {
    return {
        nivel1Completado:
            localStorage.getItem("nivel1Completado") === "true",

        nivel2Completado:
            localStorage.getItem("nivel2Completado") === "true",

        nivel3Completado:
            localStorage.getItem("nivel3Completado") === "true",

        nivel4Completado:
            localStorage.getItem("nivel4Completado") === "true",

        nivel5Completado:
            localStorage.getItem("nivel5Completado") === "true",

        finalVisto:
            localStorage.getItem("finalVisto") === "true"
    };
}