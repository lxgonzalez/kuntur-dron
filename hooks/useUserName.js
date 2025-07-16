import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    // Cargar nombre del usuario desde AsyncStorage
    useEffect(() => {
        loadUserName();
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
            console.log('✅ Nombre eliminado');
        } catch (error) {
            console.error('Error eliminando nombre del usuario:', error);
        }
    };

    return (
        <UserNameContext.Provider value={{
            userName,
            isLoading,
            saveUserName,
            clearUserName
        }}>
            {children}
        </UserNameContext.Provider>
    );
};
