# Database

Esta carpeta separa la futura persistencia SQLite de la interfaz.

- `database.js`: apertura, inicialización y migraciones de la base de datos.
- `userRepository.js`: consultas y operaciones de usuarios.
- `routeRepository.js`: consultas y operaciones de rutas.
- `packageRepository.js`: consultas y operaciones de encomiendas.
- `deliveryRepository.js`: consultas y operaciones de entregas.

Por ahora estos módulos son marcadores y no están conectados a las pantallas, por lo que la app sigue usando `src/data/` como fuente temporal.
