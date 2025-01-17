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
git clone https://github.com/soyyjorgito/prueba-biblioteca.git
cd prueba-biblioteca
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
- php artisan serve
### 3. Configuración de React
- npm install
- npm run dev

---
## Pruebas Unitarias
- php artisan test


## Importante
- Al registrar usuarios se crean usuarios con el rol de Admin, para registrar usuarios con el rol de Cliente ir a Http/Controllers/AuthController y usar la linea 38.