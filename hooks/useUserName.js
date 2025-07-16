import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';

const UserNameContext = createContext();

export const useUserName = () => {
    const context = useContext(UserNameContext);
    if (!context) {
        throw new Error('useUserName debe ser usado dentro de UserNameProvider');
    }
    return context;
};

export const UserNameProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [deviceId, setDeviceId] = useState(null);

    // Cargar nombre del usuario desde AsyncStorage
    useEffect(() => {
        loadUserName();
        getOrCreateDeviceId();
        getLocationPermission();
    }, []);

    const loadUserName = async () => {
        try {
            const storedName = await AsyncStorage.getItem('userName');
            if (storedName) {
                setUserName(storedName);
            }
        } catch (error) {
            console.error('Error cargando nombre del usuario:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getOrCreateDeviceId = async () => {
        try {
            let id = await AsyncStorage.getItem('installationId');

            if (!id) {
                id = await Crypto.randomUUID();
                await AsyncStorage.setItem('installationId', id);
                console.log('✅ Nuevo Device ID creado:', id);
            }

            setDeviceId(id);
        } catch (error) {
            console.error('Error obteniendo/creando device ID:', error);
            setDeviceId('Error al obtener ID');
        }
    };

    const getLocationPermission = async () => {
        try {
            console.log('🗺️ Solicitando permisos de ubicación...');
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.log('❌ Permisos de ubicación denegados');
                setLocationError('Permisos de ubicación denegados');
                return;
            }

            console.log('✅ Permisos de ubicación concedidos');
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation(currentLocation);
            console.log('📍 Ubicación obtenida:', currentLocation.coords);
        } catch (error) {
            console.error('Error obteniendo ubicación:', error);
            setLocationError('Error al obtener ubicación');
        }
    };

    const refreshLocation = async () => {
        try {
            console.log('🔄 Actualizando ubicación...');
            setLocationError(null);
            setLocation(null);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setLocationError('Permisos de ubicación denegados');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation(currentLocation);
            console.log('✅ Ubicación actualizada:', currentLocation.coords);
        } catch (error) {
            console.error('Error actualizando ubicación:', error);
            setLocationError('Error al actualizar ubicación');
        }
    };

    const saveUserName = async (name) => {
        try {
            await AsyncStorage.setItem('userName', name);
            setUserName(name);
            console.log('✅ Nombre guardado:', name);
        } catch (error) {
            console.error('Error guardando nombre del usuario:', error);
        }
    };

    const clearUserName = async () => {
        try {
            await AsyncStorage.removeItem('userName');
            setUserName('');
            // Limpiar también la ubicación cuando se cierre sesión
            setLocation(null);
            setLocationError(null);
            console.log('✅ Datos del usuario eliminados');
        } catch (error) {
            console.error('Error eliminando nombre del usuario:', error);
        }
    };

    return (
        <UserNameContext.Provider value={{
            userName,
            isLoading,
            location,
            locationError,
            deviceId,
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            saveUserName,
            clearUserName,
            refreshLocation
        }}>
            {children}
        </UserNameContext.Provider>
    );
};
