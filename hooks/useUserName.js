import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import { useFirebaseAuth } from './useFirebaseAuth';

const UserNameContext = createContext();

export const useUserName = () => {
    const context = useContext(UserNameContext);
    if (!context) {
        throw new Error('useUserName debe ser usado dentro de UserNameProvider');
    }
    return context;
};

export const UserNameProvider = ({ children }) => {
    const { isAuthenticated, user, logout: firebaseLogout } = useFirebaseAuth();
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [deviceId, setDeviceId] = useState(null);

    // Cargar datos del usuario desde Firebase y AsyncStorage
    useEffect(() => {
        loadUserData();
        getOrCreateDeviceId();
        if (isAuthenticated) {
            getLocationPermission();
        }
    }, [isAuthenticated]);

    const loadUserData = async () => {
        try {
            if (isAuthenticated && user) {
                // Usar el displayName de Firebase o el email como fallback
                const displayName = user.displayName || user.email.split('@')[0];
                setUserName(displayName);
            } else {
                setUserName('');
            }
        } catch (error) {
            console.error('Error cargando datos del usuario:', error);
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
            // Ya no guardamos el nombre localmente, viene de Firebase
            setUserName(name);
            console.log('✅ Nombre actualizado desde Firebase:', name);
        } catch (error) {
            console.error('Error actualizando nombre del usuario:', error);
        }
    };

    const clearUserName = async () => {
        try {
            // Cerrar sesión de Firebase
            await firebaseLogout();

            // Limpiar estado local
            setUserName('');
            setLocation(null);
            setLocationError(null);
            console.log('✅ Datos del usuario eliminados');
        } catch (error) {
            console.error('Error cerrando sesión:', error);
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
            isAuthenticated,
            user,
            saveUserName,
            clearUserName,
            refreshLocation
        }}>
            {children}
        </UserNameContext.Provider>
    );
};
