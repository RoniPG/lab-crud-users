# Lab de CRUD de Usuarios con Express

Este proyecto es un laboratorio para implementar un API RESTful de CRUD de usuarios utilizando Express y MongoDB (a través de Mongoose). La definición se basa en el ejemplo de pokémons, adaptado a usuarios, cumpliendo con los siguientes requerimientos:

- **Campos del usuario:**  
  - `nombre` (requerido)  
  - `email` (requerido)  
  - `bio`  
  - `avatar`  
  - `birthDate`  
  - `createdAt`  
  - `updatedAt`  
  - `password`

- **Validaciones y reglas de negocio:**  
  - Los campos `email` y `nombre` son obligatorios.  
  - No se permite el registro de usuarios menores de edad (se verifica la `birthDate`).  
  - La contraseña se almacena cifrada (utilizando, por ejemplo, bcrypt).  
  - La operación **PATCH** permite actualizar (o no) la contraseña junto con otros campos.  
  - El listado de usuarios permite filtrar mediante el query parameter `olderThan`, que filtra a los usuarios en función de su edad.

- **Pruebas:**  
  - Se incluye una colección de Postman en el repositorio para probar el API CRUD completo.

## Endpoints Principales

- **Crear usuario**  
  `POST /users`  
  Registra un nuevo usuario. Se validan que `nombre` y `email` estén presentes, que el usuario sea mayor de edad y se cifra la contraseña antes de almacenarla.

- **Obtener listado de usuarios**  
  `GET /users`  
  Devuelve la lista de usuarios. Si se incluye el query parameter `olderThan` (por ejemplo, `/users?olderThan=18`), se filtran los usuarios que cumplan esa condición.

- **Obtener usuario por ID**  
  `GET /users/:id`  
  Devuelve los detalles de un usuario específico.

- **Actualizar usuario**  
  `PUT /users/:id`  
  Reemplaza toda la información de un usuario.
  
  `PATCH /users/:id`  
  Actualiza parcialmente los datos del usuario. En el caso de la contraseña, se verifica si se envía o no, y se cifra si se actualiza.

- **Eliminar usuario**  
  `DELETE /users/:id`  
  Elimina un usuario de la base de datos.

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. **Instalar las dependencias:**
   ```bash
   npm install

3. **Configurar las variables de entorno:**

    Crea un archivo `.env` en la raíz del proyecto con al menos las siguientes variables:
   ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/nombre-de-tu-base

4. **Iniciar el servidor:**

   ```bash
    npm start
    ```

    El servidor se iniciará en el puerto configurado (por defecto, 3000).

## Uso y Pruebas

- Utiliza la colección de Postman incluida en el repositorio (archivo `postman_collection.json`) para probar todos los endpoints del API.
- Asegúrate de seguir el orden de operaciones:
    - Primero, crea usuarios con `POST /users`.
    - Luego, prueba la obtención (`GET /users` o `GET /users/:id`).
    - Prueba la actualización con `PATCH /users/:id` y/o `PUT /users/:id`.
    - Finalmente, elimina usuarios con `DELETE /users/:id`.

## Dependencias principales

 - Express – Framework para Node.js.
 - Mongoose – ODM para MongoDB.
 - bcrypt – Para cifrar contraseñas.
 - dotenv – Para gestionar variables de entorno.

## Notas adicionales

 - Validaciones:
    Se ha implementado la lógica necesaria para verificar que el usuario sea mayor de edad en base a la fecha de nacimiento (`birthDate`).

 - Cifrado de contraseñas:
    Antes de almacenar o actualizar la contraseña, se utiliza `bcrypt` para cifrarla de forma segura.

 - Filtros:
    El endpoint `GET /users` admite un query parameter `olderThan` que filtra los usuarios según la edad (calculada a partir de `birthDate`).