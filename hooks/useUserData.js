import { useUserName } from './useUserName';

/**
 * Hook personalizado para obtener datos específicos del usuario
 * Simplifica el acceso a los datos más comunes
 */
export const useUserData = () => {
    const {
        userName,
        latitude,
        longitude,
        deviceId,
        location,
        locationError,
        refreshLocation
    } = useUserName();

    return {
        // Datos básicos del usuario
        userName,
        deviceId,

        // Datos de ubicación
        latitude,
        longitude,
        location,
        locationError,

        // Funciones
        refreshLocation,

        // Datos combinados para facilitar uso
        coordinates: latitude && longitude ? { latitude, longitude } : null,
        hasLocation: !!(latitude && longitude),
        locationString: latitude && longitude ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` : null,

        // Estado de la ubicación
        isLocationLoading: !location && !locationError,
        hasLocationError: !!locationError,

        // Información completa del usuario
        userInfo: {
            name: userName,
            deviceId,
            latitude,
            longitude,
            timestamp: location?.timestamp || null,
            accuracy: location?.coords?.accuracy || null,
            altitude: location?.coords?.altitude || null,
        }
    };
};
