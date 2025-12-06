# Neatly

Neatly es una app móvil (Expo / React Native) para gestionar hábitos, tareas y finanzas personales. Este README resume cómo instalar, ejecutar y entender la estructura del proyecto, así como soluciones rápidas a errores comunes.

## Requisitos
- Node.js (>=14)
- npm o yarn
- Expo CLI (si trabajas con expo): `npm install -g expo-cli`
- Android Studio / Xcode o Expo Go en dispositivo físico

## Instalación
Desde la raíz del proyecto (carpeta `neatly`):

PowerShell (Windows):
```powershell
cd c:\Users\hwapy\Documents\Neatly\neatly
npm install
```

## Ejecutar la app
Iniciar Metro / Expo:
```powershell
npx expo start

```
Abrir en emulador o en Expo Go según instrucciones del CLI.

## Configuración adicional
- `firebaseConfig.js`: colocar las credenciales de Firebase si usas autenticación/BD remota.
- La app usa SQLite local (ver `app/database.js`) y slices en `app/store/slices` para el estado.

## Estructura principal del proyecto
- App.js / index.js — entrada de la app
- navigation/ — navegación (AuthNavigator, RootStack, TabNavigator)
- screens/ — pantallas (HomeScreen, LoginScreen, AddHabitOrTask, Profile, Finance, etc.)
- components/ — componentes reutilizables (HabitCard, TaskCard, TabSelector, addHabit/*, addTask/*)
- app/ — lógica de base de datos en SQLite (database.js) y Redux (store, slices)
- services/ — servicios de firebase (auth, task, habit, category, finance)
- theme/ — colores y estilos globales
- assets/ — imágenes y fuentes

## Proximas features
- Permitir el cambio de unidades al agregar un habito
- Permitir agregar ingresos y egresos para poder manejar la financeScreen
- Agregar opciones dentro de profile con Change Password
- Agregar una dashboard para visualizar el progreso y gamificarlo
- Emprolijar el diseno del frontend
- Implementar la sincronizacion de la app firebase->SQLite, SQLite-> firebase
- Agregar mas informacion para los habitos
- Implementar el Onboarding
- Separacion de componentes en otras screens
- Guardar datos sensibles en un .env para no exponer las apikeys
- Mejorar validacion de datos
