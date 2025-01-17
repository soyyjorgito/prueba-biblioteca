## Requisitos Previos

- PHP >= 8.1
- Composer >= 2.x
- Node.js >= 18.x
- npm >= 8.x
- MySQL >= 8.x
- Git instalado
- XAMPP Control Panel (Apache y PHPMyAdmin)

---

## Instalación 

### 1. Clonar el Repositorio
- git clone https://github.com/soyyjorgito/prueba-biblioteca.git
- cd prueba-biblioteca
### 2. Configuración de Laravel
- composer install
- cp .env.example .env (Crear archivo de configuración .env)
### Configurar variables de entorno
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=biblioteca
- DB_USERNAME=root
- DB_PASSWORD=
### Generar app key
- php artisan key:generate
### Ejecutar migraciones y seeders
- php artisan migrate --seed
### Iniciar servidor de backend
- php artisan serve (Tener encendido XAMPP con Apache y PHPMyAdmin)
### 3. Configuración de React
- npm install
- npm run dev

---
## Pruebas Unitarias
- php artisan migrate --env=testing (Crear base de datos de pruebas) (Tener encendido XAMPP con Apache y PHPMyAdmin)
- php artisan test

---
## Instrucciones
- Registrar usuario como Administrador
- Registrar usuario como Cliente
- Iniciar sesión como Administrador
- Agregar Categorías de libros en el menú Categorias
- Agregar libros en el menú libros
- Agregar un préstamo a un usuario en el menú Préstamos (Al agregar un préstamo se reduce el Stock, al devolver el préstamo se aumenta el stock).
- En el Dashboard del Cliente se pueden solicitar préstamos de libros, así como poder devolverlos.
## Importante
- Al registrar usuarios se crean usuarios con el rol de Admin, para registrar usuarios con el rol de Cliente ir a Http/Controllers/AuthController, descomentar la línea 38 y volver a comentar la línea 37.