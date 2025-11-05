# 🚀 LoLTime - Temporizador de Eventos de League of Legends

> **[Ver el sitio en vivo: www.loltimer.com](https://www.loltimer.com)**

`LoLTime` es una aplicación web limpia, rápida y sencilla diseñada para jugadores de *League of Legends*. Proporciona cuentas regresivas de un vistazo para los eventos más importantes del juego, ayudando a los jugadores a seguir el progreso de la temporada.

Este proyecto se inspiró en sitios de temporizadores simples (como Timenite para Fortnite) pero fue construido específicamente para la comunidad de LoL, con un enfoque en la simplicidad y la monetización no intrusiva.

## ✨ Características Principales

* **Cuenta Regresiva del Split:** Un temporizador grande y prominente que muestra el tiempo exacto que falta para que termine el Split de Ranked actual.
* **Temporizador de Parche Automático:** Un temporizador secundario que obtiene automáticamente la fecha del próximo parche del juego desde una API de la comunidad.
* **Fecha Provisional (Fallback):** El temporizador del parche incluye una fecha de reserva manual en caso de que la API externa falle, asegurando que el sitio nunca se rompa.
* **Progreso de la Temporada:** Una barra de progreso visual que muestra cuánto ha avanzado el Split actual.
* **Diseño Limpio y Adaptable:** Un diseño *responsive* con modo oscuro inspirado en el cliente de LoL, enfocado en la velocidad y la legibilidad en móviles y escritorio.
* **Listo para Monetización:** Incluye espacios publicitarios limpios para Google AdSense (barras laterales en escritorio y un banner horizontal) y un enlace de afiliado contextual.

## 💻 Stack Tecnológico

* **Frontend:** HTML5, CSS3 (con Flexbox para el layout), JavaScript (ES6+ Asíncrono)
* **Alojamiento (Hosting):** Netlify
* **Repositorio y Despliegue (CI/CD):** GitHub

## 🛠️ Gestión y Actualización del Sitio

Este sitio es **semi-automático** y requiere un mantenimiento manual mínimo.

### 1. Fechas del Split/Temporada (Manual)

Para actualizar el contador principal y la barra de progreso, se deben editar las siguientes constantes al inicio del archivo `script.js`:

* `END_OF_SPLIT`
* `START_OF_SPLIT`
* `NEXT_SEASON_START`

Estas fechas deben obtenerse de los anuncios oficiales de Riot Games y deben estar en formato `Date.UTC(...)` para la precisión global.

### 2. Temporizador de Parche (Automático)

El temporizador del parche se actualiza solo. La fecha provisional (`FALLBACK_PATCH_DATE`) solo necesita actualizarse si se detecta que la API principal ha fallado.

### 3. Despliegue (Automático)

Cualquier *commit* o cambio enviado a la rama `main` en este repositorio disparará automáticamente un nuevo despliegue (publicación) en Netlify.

### 4. Monetización

Los códigos de AdSense y los enlaces de afiliados se gestionan directamente en el archivo `index.html`.
