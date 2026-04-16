# Conexion con BBDD

1. Conectar nuestro codigo a la base de datos de atlas
2. Refactorizar nuestro task repository para acceder a esos datos
    1. Directamente con Mongo
        1. Manteniendo en la medida de lo posible los contratos (la forma en la que interactua con el resto de la aplicación)
    2. -> Collection mongoose
3. Adaptar taskController
4. Revisar que la web muestra los datos

##

1. Acabar migracion task
2. Crear modelo user
    1. Funciones
3. Crear un Seed
    1. Limpiar la base de datos de test
    2. Crear una estructura minimade Users y de Tasks
4. Implementar login
    1. Crear formulario y guardar sesión
    2. Persistir sesión
