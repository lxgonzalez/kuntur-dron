import { Stack } from 'expo-router';
import { StatusBar, View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import useCustomFonts from '../hooks/useCustomFonts';
import { StreamingProvider } from '../hooks/useSharedStreaming';
import { UserNameProvider } from '../hooks/useUserName';

export default function RootLayout() {
    const fontsLoaded = useCustomFonts();
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            const timeout = setTimeout(() => {
                setAppReady(true);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [fontsLoaded]);

    if (!fontsLoaded || !appReady) {
        return (
            <View style={styles.splashContainer}>
                <Image source={require('../assets/splash.gif')} style={styles.splashImage} resizeMode="contain" />
            </View>
        );
    }

    return (
        <UserNameProvider>
            <StreamingProvider>
                <StatusBar barStyle="light-content" />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: styles.container,
                    }}
                    initialRouteName="index"
                >
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </StreamingProvider>
        </UserNameProvider>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashImage: {
        width: '100%',
        height: '100%',
    },
});