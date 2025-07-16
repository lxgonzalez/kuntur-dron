import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Colors from '../constant/Colors';
import LogoFull from '../components/svg/LogoFull';
import Letters from '../components/svg/Letters';
import { FontFamily, FontSize } from '../constant/Typography';
import { useUserName } from '../hooks/useUserName';

const WelcomeScreen = () => {
    const router = useRouter();
    const { userName, isLoading, saveUserName } = useUserName();
    const [inputName, setInputName] = useState('');

    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];

    // Si ya hay un nombre guardado, ir directamente a la app
    useEffect(() => {
        if (!isLoading && userName) {
            router.replace('/(tabs)');
        }
    }, [isLoading, userName]);

    const handleSaveName = async () => {
        // Validar que el nombre no esté vacío
        if (!inputName.trim()) {
            Alert.alert('Error', 'Por favor ingresa tu nombre');
            return;
        }

        if (inputName.trim().length < 2) {
            Alert.alert('Error', 'El nombre debe tener al menos 2 caracteres');
            return;
        }

        try {
            await saveUserName(inputName.trim());
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el nombre. Intenta nuevamente.');
        }
    };

    return (
        <LinearGradient
            colors={[secondaryColor, primaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <LogoFull color="white" />
                <Letters color="white" width={192} height={23} />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.subText}>Ingresa tu nombre para continuar</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputName}
                        onChangeText={setInputName}
                        placeholder="Ingresa tu nombre"
                        placeholderTextColor={Colors.primary[300]}
                        maxLength={30}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.continueButton,
                        !inputName.trim() && styles.buttonDisabled
                    ]}
                    onPress={handleSaveName}
                    disabled={!inputName.trim()}
                >
                    <Text style={styles.continueButtonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    logoContainer: {
        alignItems: 'center',
        gap: 12,
        marginTop: 124,
        marginBottom: 32,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: Colors.primary[200],
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: 'white',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    button: {
        width: '100%',
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButton: {
        backgroundColor: Colors.neutro,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    continueButtonText: {
        color: Colors.primary[500],
        fontSize: FontSize.body,
        fontWeight: FontFamily.semiBold,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default WelcomeScreen;
