import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';
import { FontFamily, FontSize } from '../../constant/Typography';
import Header from '../../components/Header';
import { MapPinIcon, ShieldExclamationIcon, ShieldCheckIcon, PowerIcon } from "react-native-heroicons/solid";
import { useKunturStatus } from '../../hooks/useKunturStatus';

export default function ControlScreen() {
    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];
    const { status, loading, error, activateKuntur, deactivateKuntur } = useKunturStatus();

    const getStatusColors = () => {
        if (status === 'on') {
            return {
                icon: Colors.success[900],
                background: Colors.success[200],
                border: Colors.success[900]
            };
        }
        return {
            icon: Colors.danger[900],
            background: Colors.danger[200],
            border: Colors.danger[900]
        };
    };

    const statusColors = getStatusColors();

    const getStatusInfo = () => {
        if (loading) {
            return {
                text: 'Conectando...',
                icon: null,
                buttonText: 'Cargando...'
            };
        }
        if (status === 'on') {
            return {
                text: 'Kuntur Activado',
                icon: <ShieldCheckIcon size={120} color={statusColors.icon} />,
                buttonText: 'Desactivar Kuntur'
            };
        }
        return {
            text: 'Kuntur Apagado',
            icon: <ShieldExclamationIcon size={120} color={statusColors.icon} />,
            buttonText: 'Activar Kuntur'
        };
    };

    const statusInfo = getStatusInfo();

    const handleButtonPress = () => {
        if (loading) return;

        if (status === 'on') {
            deactivateKuntur();
        } else {
            activateKuntur();
        }
    };

    return (
        <LinearGradient
            colors={[secondaryColor, primaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Header />

                <View style={styles.content}>
                    <View style={styles.location}>
                        <MapPinIcon color={Colors.neutro} />
                        <Text style={styles.locationText}>Universidad Central del Ecuador</Text>
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.control}>
                        <View style={[styles.iconContainer, {
                            backgroundColor: statusColors.background,
                            borderColor: statusColors.border
                        }]}>
                            {loading ? (
                                <ActivityIndicator size="large" color={statusColors.icon} />
                            ) : (
                                statusInfo.icon
                            )}
                        </View>
                        <Text style={[styles.statusText, { color: statusColors.icon }]}>
                            {statusInfo.text}
                        </Text>

                        <TouchableOpacity
                            style={[styles.button, {
                                backgroundColor: statusColors.background,
                                borderColor: statusColors.border
                            }]}
                            onPress={handleButtonPress}
                            disabled={loading}
                        >
                            <PowerIcon size={16} color={statusColors.icon} />
                            <Text style={[styles.buttonText, { color: statusColors.icon }]}>
                                {statusInfo.buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 64,
        marginHorizontal: 16,
    },
    content: {
        marginTop: 52,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%',
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
    control: {
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        width: '100%',
        height: '85%',
        borderRadius: 16,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 76,
        width: 175,
        height: 175,
        borderRadius: 1000,
        borderWidth: 2,
    },
    statusText: {
        textAlign: 'center',
        width: '80%',
        fontFamily: FontFamily.regular,
        fontSize: FontSize.body,
    },
    buttonText: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.body,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 32,
        borderWidth: 2,
    },
    errorContainer: {
        backgroundColor: Colors.danger[200],
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.danger[900],
        marginHorizontal: 20,
    },
    errorText: {
        color: Colors.danger[900],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        textAlign: 'center',
    },

});
