# Blue Express Regist

Aplicación móvil desarrollada con React Native y Expo SDK 54. El proyecto está
listo para abrirse en Visual Studio Code y ejecutarse en Android, iOS o web.

## Requisitos

- Node.js 22
- pnpm 10
- Expo Go instalado en el teléfono, o un emulador Android/iOS configurado

Para instalar pnpm:

```bash
npm install --global pnpm@10.34.3
```

## Abrir el proyecto en Visual Studio Code

1. Copia o descarga la carpeta completa del proyecto.
2. Abre la carpeta, no solamente `App.js`, en Visual Studio Code.
3. Abre una terminal integrada.
4. Instala las dependencias:

```bash
pnpm install
```

## Ejecutar con Expo

Inicia Expo:

```bash
pnpm start
```

Después puedes:

- Escanear el código QR con Expo Go desde un teléfono conectado a la misma red.
- Presionar `a` para abrir Android.
- Presionar `i` para abrir el simulador de iOS en macOS.
- Presionar `w` para abrir la versión web.

También puedes iniciar directamente una plataforma:

```bash
pnpm android
pnpm ios
pnpm web
```

## Estructura principal

- `App.js`: interfaz y lógica principal.
- `index.js`: punto de entrada de Expo.
- `app.json`: configuración de Android, iOS y Expo.
- `babel.config.js`: configuración de Babel para Expo.
- `src/imports`: recursos gráficos del proyecto.

## Notas

- No se necesitan variables de entorno para ejecutar la aplicación.
- El comando `pnpm dev` está reservado para la vista previa dentro de Figma
  Make. Para trabajar localmente en Visual Studio Code usa `pnpm start`.
- El simulador de iOS requiere macOS. Expo Go en un iPhone físico puede usarse
  desde Windows, macOS o Linux.
