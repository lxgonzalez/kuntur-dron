import { useReverseGeocoding } from './useReverseGeocoding';
import { useUserName } from './useUserName';


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

    const {
        address,
        loading: addressLoading,
        error: addressError,
        formattedAddress,
        shortAddress,
        displayAddress,
        refreshAddress
    } = useReverseGeocoding(latitude, longitude);

    return {
        // Datos básicos del usuario
        userName,
        deviceId,

        // Datos de ubicación
        latitude,
        longitude,
        location,
        locationError,

        // Datos de dirección
        address,
        addressLoading,
        addressError,
        formattedAddress,
        shortAddress,
        displayAddress,
        refreshAddress,

        // Funciones
        refreshLocation,

        // Datos combinados para facilitar uso
        coordinates: latitude && longitude ? { latitude, longitude } : null,
        hasLocation: !!(latitude && longitude),
        locationString: latitude && longitude ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` : null,

        // Estado de la ubicación
        isLocationLoading: !location && !locationError,
        hasLocationError: !!locationError,
        hasAddress: !!address,
        hasFormattedAddress: !!formattedAddress,

        // Información completa del usuario
        userInfo: {
            name: userName,
            deviceId,
            latitude,
            longitude,
            address: formattedAddress,
            displayAddress,
            shortAddress,
            timestamp: location?.timestamp || null,
            accuracy: location?.coords?.accuracy || null,
            altitude: location?.coords?.altitude || null,
        }
    };
};
