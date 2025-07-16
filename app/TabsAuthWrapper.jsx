import React, { useEffect } from 'react';
import { useUserName } from '../hooks/useUserName';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function TabsAuthWrapper({ children }) {
    const { isAuthenticated, isLoading } = useUserName();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            console.log('⚠️ Usuario no autenticado, redirigiendo a login');
            router.replace('/');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
            </View>
        );
    }

    // Si no hay usuario, no mostrar nada (se redirigirá)
    if (!isAuthenticated) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
            </View>
        );
    }

    // Si hay usuario, mostrar las tabs
    return children;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0066cc',
    },
});
