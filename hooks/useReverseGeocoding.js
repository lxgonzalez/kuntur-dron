import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

/**
 * Hook para obtener la dirección basada en coordenadas
 * Utiliza geocodificación inversa
 */
export const useReverseGeocoding = (latitude, longitude) => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAddress = async (lat, lng) => {
        if (!lat || !lng) return;

        setLoading(true);
        setError(null);

        try {
            const result = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: lng
            });

            if (result && result.length > 0) {
                const location = result[0];

                // Construir dirección formateada
                const addressParts = [];

                if (location.street) addressParts.push(location.street);
                if (location.streetNumber) addressParts.push(location.streetNumber);
                if (location.district) addressParts.push(location.district);
                if (location.city) addressParts.push(location.city);
                if (location.region) addressParts.push(location.region);
                if (location.country) addressParts.push(location.country);

                const formattedAddress = addressParts.join(', ');

                setAddress({
                    formatted: formattedAddress,
                    street: location.street,
                    streetNumber: location.streetNumber,
                    district: location.district,
                    city: location.city,
                    region: location.region,
                    country: location.country,
                    postalCode: location.postalCode,
                    name: location.name
                });
            } else {
                setError('No se pudo obtener la dirección');
            }
        } catch (err) {
            console.error('Error en geocodificación inversa:', err);
            setError('Error al obtener la dirección');
        } finally {
            setLoading(false);
        }
    };

    // Efecto para obtener dirección cuando cambian las coordenadas
    useEffect(() => {
        if (latitude && longitude) {
            getAddress(latitude, longitude);
        }
    }, [latitude, longitude]);

    const refreshAddress = () => {
        if (latitude && longitude) {
            getAddress(latitude, longitude);
        }
    };

    return {
        address,
        loading,
        error,
        refreshAddress,
        hasAddress: !!address,
        formattedAddress: address?.formatted || null,

        // Partes específicas de la dirección
        street: address?.street || null,
        city: address?.city || null,
        country: address?.country || null,
        region: address?.region || null,
        district: address?.district || null,
        postalCode: address?.postalCode || null,

        // Dirección corta (ciudad, país)
        shortAddress: address ? `${address.city || ''}, ${address.country || ''}`.replace(/^, |, $/g, '') : null,

        // Dirección para mostrar en UI
        displayAddress: address?.formatted || `${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}` || 'Ubicación desconocida'
    };
};
