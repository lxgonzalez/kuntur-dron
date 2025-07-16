import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Colors from '../constant/Colors';
import LogoFull from '../components/svg/LogoFull';
import Letters from '../components/svg/Letters';
import { FontFamily, FontSize } from '../constant/Typography';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

const LoginScreen = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading, login } = useFirebaseAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];

    // Si ya está autenticado, ir directamente a la app
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isLoading, isAuthenticated]);

    const handleLogin = async () => {
        // Validar campos
        if (!email.trim()) {
            Alert.alert('Error', 'Por favor ingresa tu email');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Error', 'Por favor ingresa tu contraseña');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await login(email.trim(), password);

            if (result.success) {
                router.replace('/(tabs)');
            } else {
                Alert.alert('Este correo tiene acceso a la aplicación');
            }
        } catch (error) {
            Alert.alert('Error', 'Error inesperado. Intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = email.trim() && password.trim().length >= 6;

    if (isLoading) {
        return (
            <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}
            >
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.neutro} />
                    <Text style={styles.loadingText}>Cargando...</Text>
                </View>
            </LinearGradient>
        );
    }

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
                <Text style={styles.subText}>Ingresa tus credenciales para acceder</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor={Colors.primary[300]}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Contraseña"
                            placeholderTextColor={Colors.primary[300]}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="password"
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={togglePasswordVisibility}
                        >
                            {showPassword ?
                                <EyeSlashIcon size={20} color={Colors.primary[300]} /> :
                                <EyeIcon size={20} color={Colors.primary[300]} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.continueButton,
                        (!isFormValid || isSubmitting) && styles.buttonDisabled
                    ]}
                    onPress={handleLogin}
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color={Colors.primary[500]} />
                    ) : (
                        <Text style={styles.continueButtonText}>Iniciar Sesión</Text>
                    )}
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: 'white',
    },
    eyeButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.neutro,
        fontSize: FontSize.body,
        fontFamily: 'Poppins-Regular',
        marginTop: 16,
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

export default LoginScreen;
