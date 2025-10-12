# LevelUpGamer 🎮

Proyecto para la asignatura **Desarrollo Fullstack 2**  
Duoc UC - Sede San Joaquín

---

## Descripción

LevelUpGamer es una tienda online desarrollada en **React** que permite a los usuarios explorar, buscar y comprar productos gamer como periféricos, componentes, laptops y juegos. El proyecto incluye funcionalidades de carrito de compras, búsqueda de productos, visualización de detalles y descuentos especiales para usuarios Duoc UC.

---

## Características

- 🖱️ Catálogo de productos gamer con imágenes y descripciones
- 🔎 Barra de búsqueda en tiempo real
- 🛒 Carrito de compras persistente (localStorage)
- 💳 Cálculo de descuentos para usuarios con correo @duocuc.cl
- 📦 Modal de detalles de producto
- 📱 Diseño responsivo y moderno
- 🧪 Tests automáticos con Karma y Jasmine

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/LevelUpGamer_React.git
   cd LevelUpGamer_React
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```

---

## Scripts útiles

- `npm start` — Ejecuta la app en modo desarrollo
- `npm run build` — Compila la app para producción
- `npm run test:ui` — Ejecuta los tests de interfaz con Karma

---

## Estructura del proyecto

```
src/
  ├── assets/           # Imágenes y recursos
  ├── components/       # Componentes reutilizables (Footer, Carrito, TarjetaProducto, etc.)
  ├── pages/            # Vistas principales (Home, Productos)
  ├── styles/           # Archivos CSS
  └── App.js            # Componente principal
```
## Karma

El proyecto utiliza **Karma** como test runner junto con **Jasmine** para ejecutar pruebas automáticas de los componentes de React.

- Los archivos de test deben tener la extensión `.spec.js` y ubicarse en la carpeta `src/`.
- La configuración de Karma se encuentra en el archivo `karma.conf.js`.
- Para ejecutar los tests, usa el comando:

  ```bash
  npm run test:ui
  npx karma start
  ```

- Los resultados de los tests y la cobertura se generan en la carpeta `coverage/`.
---

## Licencia

Este proyecto es solo para fines educativos.