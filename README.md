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
# o con yarn
# yarn
```

## Ejecutar la app
Iniciar Metro / Expo:
```powershell
npm start
# o con yarn
# yarn start
```
Abrir en emulador o en Expo Go según instrucciones del CLI.

## Configuración adicional
- `firebaseConfig.js`: colocar las credenciales de Firebase si usas autenticación/BD remota.
- La app usa SQLite local (ver `app/database.js`) y slices en `app/store/slices` para el estado.

## Scripts comunes
(Comprobar `package.json` para scripts exactos; ejemplos típicos:)
```bash
npm start        # iniciar Expo
npm run android  # abrir en Android (expo)
npm run ios      # abrir en iOS (expo)
npm run web      # ejecutar versión web
```

## Estructura principal del proyecto
- App.js / index.js — entrada de la app
- navigation/ — navegación (AuthNavigator, RootStack, TabNavigator)
- screens/ — pantallas (HomeScreen, LoginScreen, AddHabitOrTask, Profile, Finance, etc.)
- components/ — componentes reutilizables (HabitCard, TaskCard, TabSelector, addHabit/*, addTask/*)
- app/ — lógica de base de datos y Redux (store, slices)
- services/ — llamadas y abstracciones (auth, task, habit, category, finance)
- theme/ — colores y estilos globales
- assets/ — imágenes y fuentes

## Componentes clave
- HomeScreen.jsx: lista seccional de hábitos y tareas, gestiona tabs y carga desde SQLite.
- HabitCard.jsx / TaskCard.jsx: tarjetas que muestran título, meta e interactúan (toggle).
- TabSelector.jsx: selector simple de pestañas (habits / tasks).

## Buenas prácticas y notas
- Asegurar que cualquier texto visible en componentes de React Native esté dentro de `<Text>`; por ejemplo, dentro de `TouchableOpacity` usar `<Text>Contenido</Text>`.
- Cuando uses navigation, usar `navigation.replace('Route')` o `navigation.navigate('Route')`. No llames `navigate.replace(...)` si `navigate` fue destructurado como función (no tiene `.replace`).




---

Si quieres, genero un README en inglés, o agrego ejemplos de comandos concretos desde `package.json` si pegas su contenido.
