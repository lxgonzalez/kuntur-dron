# Configuración de Firebase para Kuntur Dron

## Pasos para configurar Firebase:

1. **Crear proyecto en Firebase Console**
   - Ve a https://console.firebase.google.com/
   - Crea un nuevo proyecto
   - Activa Authentication

2. **Configurar Authentication**
   - Ve a Authentication > Sign-in method
   - Habilita "Email/Password"
   - Agrega usuarios autorizados en la pestaña "Users"

3. **Obtener configuración**
   - Ve a Project Settings > General
   - Scroll hasta "Your apps" y crea una app web
   - Copia la configuración de Firebase

4. **Actualizar archivo de configuración**
   - Abre `config/firebase.js`
   - Reemplaza los valores de `firebaseConfig` con tu configuración real

## Ejemplo de configuración:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "kuntur-dron.firebaseapp.com",
  projectId: "kuntur-dron",
  storageBucket: "kuntur-dron.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012"
};
```

## Usuario de ejemplo:
- **Email**: admin@kuntur.com
- **Contraseña**: password123

## Características implementadas:
- ✅ Autenticación con email/contraseña
- ✅ Validación de formularios
- ✅ Manejo de errores
- ✅ Persistencia de sesión
- ✅ Protección de rutas
- ✅ Logout seguro
- ✅ Estados de loading
- ✅ Integración con datos de usuario existentes

## Estructura de autenticación:
- `config/firebase.js` - Configuración de Firebase
- `hooks/useFirebaseAuth.js` - Hook para autenticación
- `hooks/useUserName.js` - Integración con datos de usuario
- `app/index.jsx` - Pantalla de login
- `app/(tabs)/TabsAuthWrapper.jsx` - Protección de rutas
