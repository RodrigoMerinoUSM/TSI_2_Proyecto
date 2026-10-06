# TSI 2 Proyecto

Aplicación Expo / React Native organizada por responsabilidades.

## Estructura principal

```text
TSI_2_Proyecto/
├── app/                  # Archivos de rutas/template que ya tenía el proyecto
├── assets/               # Imágenes y recursos estáticos
│   └── imports/          # Imágenes importadas por el proyecto
├── components/           # Componentes visuales reutilizables
│   ├── admin/            # Componentes exclusivos del administrador
│   ├── common/           # Botones, cards, headers, filtros, etc.
│   └── ui/               # Componentes UI originales del template
├── constants/            # Constantes globales del proyecto/template
├── hooks/                # Hooks reutilizables
├── scripts/              # Scripts de desarrollo/build
├── src/
│   ├── app/              # Coordinación principal de la aplicación
│   ├── data/             # Datos mock separados por dominio
│   ├── database/         # SQLite y repositorios
│   ├── models/           # Modelos de dominio
│   ├── screens/          # Pantallas separadas por rol
│   │   ├── admin/
│   │   ├── auth/
│   │   └── courier/
│   ├── styles/           # Estilos compartidos
│   ├── theme/            # Colores/tema de la app
│   └── utils/            # Funciones auxiliares
├── App.js                # Entrada visual mínima
└── index.js              # Registro de la app en Expo
```

## Criterio de organización

- `App.js` ya no contiene todas las pantallas y componentes en un único archivo.
- Las pantallas están separadas por rol en `src/screens`.
- Los componentes reutilizables están en la carpeta raíz `components`, para mantener la estructura original del proyecto.
- `src/data/mockData.js` se dividió en `orders.js`, `routes.js` y `users.js`.
- Los recursos gráficos dejaron de estar dentro de `src` y están en `assets/imports`.
- La carpeta `app` se conserva, tal como estaba en la estructura original.

## Inicio

```bash
pnpm install
pnpm start
```

También puedes usar:

```bash
pnpm android
pnpm ios
pnpm web
```
