# 🎃 Birthday Gift

### Un videojuego web interactivo creado para convertir recuerdos en una aventura.

**Birthday Gift** es un videojuego desarrollado con HTML, CSS y JavaScript, inspirado en la estética de Halloween y las historias de fantasía y terror.

El proyecto nació como un regalo de cumpleaños personalizado: una experiencia en la que el jugador debe superar desafíos, desbloquear recuerdos y avanzar a través de una historia hasta llegar a una sorpresa final.

Además de su propósito personal, Birthday Gift representa un proyecto práctico de desarrollo frontend, lógica de programación, gestión de recursos multimedia y automatización con Python.

## 🎮 Características principales

- **Cinco niveles interactivos:** una aventura progresiva con diferentes desafíos y mecánicas.
- **Narrativa visual:** escenas ilustradas que acompañan el desarrollo de la historia.
- **Cuestionarios:** preguntas que permiten desbloquear recuerdos y avanzar.
- **Sistema de progreso:** seguimiento de los recuerdos obtenidos y de los niveles completados.
- **Minijuegos:** desafíos de carrera y recolección con controles y mecánicas propias.
- **Personajes animados:** sprites con diferentes estados y animaciones.
- **Recompensas:** una sección final con premios y una ruleta interactiva.
- **Ambientación sonora:** música temática para acompañar la experiencia.
- **Diseño adaptable:** interfaz web pensada para utilizarse desde distintos dispositivos.

## 🛠️ Tecnologías utilizadas

| Tecnología | Aplicación |
|---|---|
| HTML5 | Estructura de las pantallas y elementos del videojuego |
| CSS3 | Diseño visual, animaciones y adaptación de la interfaz |
| JavaScript | Lógica del juego, eventos, interacciones y gestión del estado |
| Python | Automatización de tareas relacionadas con los recursos gráficos |
| Pillow | Procesamiento y conversión de imágenes |
| Git y GitHub | Control de versiones y gestión del repositorio |

El videojuego utiliza JavaScript nativo, sin depender de frameworks frontend.

## 🧩 Organización del proyecto

```text
birthday-gift/
├── audio/
│   └── music/
├── css/
│   └── styles.css
├── img/
│   ├── backgrounds/
│   ├── catch/
│   ├── characters/
│   ├── enemies/
│   ├── imagenes-recuerdos/
│   └── story/
├── js/
│   ├── app.js
│   ├── catch.js
│   ├── characters.js
│   ├── coupons.js
│   ├── music.js
│   ├── questions.js
│   ├── quiz.js
│   ├── roulette.js
│   └── runner.js
├── tools/
│   ├── cleanup_images.py
│   ├── optimize_images.py
│   └── update_image_paths.py
├── index.html
└── README.md
```

La lógica del juego se distribuye en módulos JavaScript dedicados a diferentes funcionalidades, como los cuestionarios, personajes, minijuegos, música y recompensas.

Esta separación facilita el mantenimiento del código y la incorporación de nuevas funcionalidades.

## ⚡ Optimización de imágenes

Durante el desarrollo se identificó que una parte considerable del tamaño del proyecto correspondía a imágenes PNG de alta resolución.

Para mejorar la carga del videojuego, se desarrollaron herramientas en Python que automatizaron su optimización y la actualización de las referencias en el código.

**Resultados obtenidos:**

| Métrica | Resultado |
|---|---|
| Imágenes optimizadas | 50 |
| Tamaño original | 118.77 MB |
| Tamaño optimizado | 13.44 MB |
| Espacio ahorrado | 105.33 MB |
| Reducción aproximada | 88.7 % |

Las imágenes seleccionadas se convirtieron a WebP, manteniendo una calidad visual adecuada para el proyecto.

### Herramientas desarrolladas

**`optimize_images.py`**

Identifica imágenes que cumplen el criterio de tamaño y permite convertirlas a WebP mediante Pillow.

**`update_image_paths.py`**

Busca referencias a imágenes en archivos HTML, CSS y JavaScript, y actualiza sus extensiones cuando existe una versión WebP correspondiente.

**`cleanup_images.py`**

Identifica imágenes originales que ya cuentan con una versión optimizada y permite trasladarlas a un respaldo externo, previa comprobación de referencias.

Los scripts incluyen un modo de simulación (*dry run*) para revisar los cambios antes de aplicarlos.

## 🚀 Ejecución local

Para ejecutar el proyecto en tu computadora:

**1. Clona el repositorio.**

```bash
git clone https://github.com/alexjviz1022/birthday-gift.git
```

**2. Entra en la carpeta del proyecto.**

```bash
cd birthday-gift
```

**3. Inicia un servidor local.**

Puedes utilizar la extensión **Live Server** de Visual Studio Code y abrir `index.html`.

No es necesario instalar dependencias de JavaScript ni ejecutar un proceso de compilación.

## 🌐 Demo

**Próximamente:** enlace a la versión publicada mediante GitHub Pages.

## 📚 Aprendizajes del proyecto

El desarrollo de Birthday Gift permitió poner en práctica conocimientos de ingeniería de software y desarrollo web, especialmente en:

- Manipulación del DOM y gestión de eventos.
- Uso de funciones, arreglos, objetos y estructuras condicionales.
- Administración del estado y del progreso de un videojuego.
- Organización de código JavaScript en archivos especializados.
- Implementación de interacciones y animaciones.
- Manejo de recursos gráficos y de audio.
- Optimización de imágenes para la web.
- Automatización de procesos con Python.
- Control de versiones mediante Git y GitHub.

Uno de los principales aprendizajes fue comprender que desarrollar una aplicación no consiste únicamente en implementar funcionalidades, sino también en organizar, probar y optimizar sus recursos para mejorar su mantenimiento y funcionamiento.

## 👨‍💻 Autor

**Alejandro Juárez Vizcarra**

Ingeniero en Sistemas Computacionales.

[GitHub — alexjviz1022](https://github.com/alexjviz1022)

---

*Desarrollado con código, creatividad y mucho cariño.* 🖤