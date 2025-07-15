import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '../constant/Colors';
import LogoFull from '../components/svg/LogoFull';
import Letters from '../components/svg/Letters';
import GitHubIcon from '../components/svg/GitHubIcon';
import { FontFamily, FontSize } from '../constant/Typography';

const WelcomeScreen = () => {
    const router = useRouter();
    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    const handleRegister = () => {
        router.replace('/(tabs)');
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Ingresa usando</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity>
                        <GitHubIcon size={40} color={Colors.neutro} />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 128,
        alignItems: 'center',
        gap: 12,
    },
    buttonContainer: {
        marginTop: 128,
        width: '70%',
        gap: 32,
    },
    button: {
        width: '100%',
        height: 32,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        borderWidth: 1,
        borderColor: Colors.neutro,
    },
    registerButton: {
        backgroundColor: Colors.neutro
    },
    loginButtonText: {
        color: 'white',
        fontSize: FontSize.body,
        fontWeight: FontFamily.semiBold,
        fontFamily: 'Poppins-SemiBold',
    },
    registerButtonText: {
        color: Colors.primary[500],
        fontSize: FontSize.body,
        fontWeight: FontFamily.semiBold,
        fontFamily: 'Poppins-SemiBold',
    },
    footer: {
        position: 'absolute',
        bottom: 120,
        alignItems: 'center',
    },
    footerText: {
        color: Colors.primary[200],
        fontSize: 14,
        marginBottom: 16,
        fontFamily: 'Poppins-Regular',
    },
    socialIcons: {
        flexDirection: 'row',
        gap: 20,
    },
});

export default WelcomeScreen;
