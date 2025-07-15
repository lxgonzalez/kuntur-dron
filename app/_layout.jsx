import { Stack } from 'expo-router';
import { StatusBar, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import useCustomFonts from '../hooks/useCustomFonts';
import { StreamingProvider } from '../hooks/useSharedStreaming';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <StreamingProvider>
            <StatusBar barStyle="light-content" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: styles.container,
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </StreamingProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
