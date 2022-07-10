# WebServer + RestServer

Ejecutar ```npm install``` para reconstruir los módulos de Node.

El RestServer retorna informacion de usuarios, así como tambien permite su respectivo registro, eliminación y actualización.

Dentro de este se hacen las respectivas validaciones antes de cada acción:

# Para mostrar

Filtros: Se puede paginar los usuarios enviando el query limite, por ejemplo ```limite = 5```, se listarán solo los 5 primeros. Se puede iniciar de un numero de usuario en adelante enviando el query desde, por ejemplo ```desde = 2```, se listarán los que esten despues del usuario 2.

Información: Se retorna toda la infomación de los usuarios registrados.

# Para actualizar

Id valido: Se verifica que el id recibido, sea un MongoId valido.

Rol válido: Se verifica que el rol de la petición concuerde con los roles de la base de datos.

# Para agregar

Campos obligatorios: Se hacen obligatorios 3 campos para la inserción de la información en la base de datos.

Correo: Se hace la verificación de que lo que inserte en este campo, sea un correo correcto.

Correo existente: Se verifica que el correo que este intentando insertar no se uno que ya este en la base de datos.

Rol válido: Se verifica que el rol de la petición concuerde con los roles de la base de datos.

Buscar id: Se hace la consulta en la base de datos para buscar el id de la petición, en caso de no encontrar el id, se retorna un ```throw new Error``` mostrando que el id no existe.

# Para eliminar

JWT Middleware - 1 validacion: Verifica si en la request viene el Token.

JWT Middleware - 2 validacion: Try Catch, dentro del Try: -> (verifica si el usuario existe y si no se encuentra desactivado, en caso de estar correcto, puede seguir con la peticion), dentro del Catch -> (muestra un ```console.log``` con el error, y se envia un status 401 con el mensaje Token no válido).


Validar-roles Middleware: Solo ADMIN_ROLE y VENTAS_ROLE pueden desactivar un usuario (USER_ROLE).

Id valido: Se verifica que el id recibido, sea un MongoId valido.

Buscar id: Se hace la consulta en la base de datos para buscar el id de la petición, en caso de no encontrar el id, se retorna un ```throw new Error``` mostrando que el id no existe.

