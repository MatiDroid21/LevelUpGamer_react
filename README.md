LevelUpGamer 🎮

Proyecto desarrollado para la asignatura Desarrollo Fullstack 2
Duoc UC - Sede San Joaquín

📝 Descripción

LevelUpGamer es una tienda online hecha en React que ofrece a los gamers chilenos una experiencia de compra completa. Permite explorar, buscar y adquirir productos como periféricos, componentes, laptops y videojuegos.

El proyecto incorpora funcionalidades clave de e-commerce: carrito persistente, descuentos especiales para usuarios Duoc UC y visualización de detalles de productos mediante modales.

🚀 Características

🖱️ Catálogo completo: Productos gamer con imágenes, precios y descripciones.

🔎 Búsqueda en tiempo real: Filtrado dinámico por nombre, descripción o código.

🛒 Carrito persistente: Guardado en localStorage para mantener la sesión.

💳 Descuentos especiales: Aplicables a usuarios con correo @duocuc.cl.

📦 Modal de detalles: Visualiza información completa de cada producto.

📱 Diseño responsivo: Compatible con móviles, tablets y escritorio.

🧪 Tests automáticos: Cobertura de componentes con Karma y Jasmine.

📦 Instalación

Clona el repositorio:

git clone https://github.com/MatiDroid21/LevelUpGamer_react.git
cd LevelUpGamer_React


Instala dependencias:

npm install


Ejecuta la aplicación:

npm start


Abre tu navegador en http://localhost:3000

🛠️ Scripts útiles
Comando	Descripción
npm start	Ejecuta la app en modo desarrollo
npm run build	Compila la app para producción
npm run test:ui	Ejecuta los tests de interfaz con Karma y Jasmine
📂 Estructura del proyecto
src/
  ├── assets/           # Imágenes y recursos estáticos
  ├── components/       # Componentes reutilizables (Footer, Carrito, TarjetaProducto, etc.)
  ├── data/             # Datos estáticos (productos.json, imágenes, etc.)
  ├── pages/            # Vistas principales (Home, Productos, Checkout, Login)
  ├── styles/           # Archivos CSS
  └── App.js            # Componente principal y rutas

🧪 Tests con Karma y Jasmine

Los archivos de test deben terminar en .spec.js y ubicarse dentro de src/.

La configuración de Karma está en karma.conf.js.

Para ejecutar los tests:

npx karma start  

Los reportes de cobertura se generan en la carpeta coverage/.

⚠️ Se recomienda correr los tests regularmente para garantizar la estabilidad del proyecto.

🎯 Misión y visión


importante: verificar versiones en caso de que no sea posible levantar el proyecto en tu maquina
de manera correcta.

  ```bash
  npm install react@latest react-dom@latest
  npx karma start
  ```

Visión: Ser la tienda online líder en productos para gamers en Chile, reconocida por su innovación, servicio al cliente excepcional y un programa de fidelización que premie la lealtad de los clientes.

⚖️ Licencia

Este proyecto es solo para fines educativos. Los estaré vigilando >:D

# Proyecto realizado por Keiton Chavez H. y Matias Chavez G.