import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import { FontFamily, FontSize } from '../../constant/Typography';
import { useUserName } from '../../hooks/useUserName';
import { useReverseGeocoding } from '../../hooks/useReverseGeocoding';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { UserIcon, DevicePhoneMobileIcon, InformationCircleIcon, IdentificationIcon, MapPinIcon } from 'react-native-heroicons/solid';

export default function UserScreen() {
    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];
    const {
        userName,
        clearUserName,
        location,
        locationError,
        deviceId,
        latitude,
        longitude,
        refreshLocation
    } = useUserName();
    const router = useRouter();

    // Hook para obtener dirección
    const {
        formattedAddress,
        loading: addressLoading,
        error: addressError,
        refreshAddress
    } = useReverseGeocoding(latitude, longitude);

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar sesión',
                    style: 'destructive',
                    onPress: async () => {
                        console.log('🔄 Cerrando sesión...');
                        await clearUserName();
                        console.log('✅ Sesión cerrada, recargando aplicación...');

                        // Recargar la aplicación completamente
                        try {
                            await Updates.reloadAsync();
                        } catch (error) {
                            console.log('⚠️ Error al recargar con Updates, usando fallback:', error);
                            // Fallback: navegar a la pantalla inicial
                            router.replace('/');
                        }
                    }
                }
            ]
        );
    };

    const deviceInfo = {
        name: Constants.deviceName || 'Desconocido',
        platform: Constants.platform?.ios ? 'iOS' : Constants.platform?.android ? 'Android' : 'Desconocido',
        expoVersion: Constants.expoVersion || 'Desconocido',
        appVersion: Constants.manifest?.version || '1.0.0',
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
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Información del Usuario */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <UserIcon size={24} color={Colors.neutro} />
                            <Text style={styles.title}>Información del Usuario</Text>
                        </View>
                        <View style={styles.containerBlack}>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Nombre:</Text>
                                <Text style={styles.value}>{userName || 'No disponible'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Estado:</Text>
                                <Text style={styles.value}>Activo</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>ID único:</Text>
                                <Text style={styles.valueId}>{deviceId || 'Cargando...'}</Text>
                            </View>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Text style={styles.logoutText}>Cerrar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Ubicación del Usuario */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MapPinIcon size={24} color={Colors.neutro} />
                            <Text style={styles.title2}>Ubicación</Text>
                        </View>
                        <View style={styles.containerBlack}>
                            {location ? (
                                <>
                                    {/* Dirección */}
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Dirección:</Text>
                                        <Text style={styles.value}>
                                            {addressLoading ? 'Obteniendo...' :
                                                addressError ? 'No disponible' :
                                                    formattedAddress || 'No disponible'}
                                        </Text>
                                    </View>
                                    {/* Coordenadas */}
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Latitud:</Text>
                                        <Text style={styles.value}>{location.coords.latitude.toFixed(6)}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Longitud:</Text>
                                        <Text style={styles.value}>{location.coords.longitude.toFixed(6)}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Precisión:</Text>
                                        <Text style={styles.value}>{location.coords.accuracy ? `${location.coords.accuracy.toFixed(1)}m` : 'N/A'}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Altitud:</Text>
                                        <Text style={styles.value}>{location.coords.altitude ? `${location.coords.altitude.toFixed(1)}m` : 'N/A'}</Text>
                                    </View>
                                </>
                            ) : locationError ? (
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Estado:</Text>
                                    <Text style={styles.errorText}>{locationError}</Text>
                                </View>
                            ) : (
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Estado:</Text>
                                    <Text style={styles.value}>Obteniendo ubicación...</Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.refreshButton} onPress={() => {
                                refreshLocation();
                                refreshAddress();
                            }}>
                                <Text style={styles.refreshText}>Actualizar Ubicación</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Información del Dispositivo */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <DevicePhoneMobileIcon size={24} color={Colors.neutro} />
                            <Text style={styles.title2}>Información del Dispositivo</Text>
                        </View>
                        <View style={styles.containerBlack}>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Nombre:</Text>
                                <Text style={styles.value}>{deviceInfo.name}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Plataforma:</Text>
                                <Text style={styles.value}>{deviceInfo.platform}</Text>
                            </View>

                        </View>
                    </View>

                </ScrollView>
            </View>
        </LinearGradient >
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
        flex: 1,
        paddingTop: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    title: {
        borderColor: Colors.neutro,
        color: Colors.neutro,
        fontSize: FontSize.body,
        fontFamily: FontFamily.bold,
    },
    title2: {
        color: Colors.neutro,
        fontSize: FontSize.body,
        fontFamily: FontFamily.bold,
    },
    containerBlack: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        padding: 16,
        borderRadius: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    label: {
        color: Colors.neutro,
        fontFamily: FontFamily.medium,
        fontSize: FontSize.small,
        flex: 1,
    },
    value: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        flex: 2,
        textAlign: 'right',
    },
    valueId: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: 10,
        flex: 2,
        textAlign: 'right',
    },
    errorText: {
        color: Colors.danger[400],
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        flex: 2,
        textAlign: 'right',
    },
    noteContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 8,
        borderRadius: 8,
        marginTop: 12,
    },
    noteText: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: 11,
        fontStyle: 'italic',
    },
    logoutButton: {
        backgroundColor: Colors.danger[300],
        padding: 12,
        borderRadius: 16,
        marginTop: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.danger[900],
    },
    logoutText: {
        color: Colors.danger[900],
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.small,
    },
    refreshButton: {
        backgroundColor: Colors.success[200],
        padding: 10,
        borderRadius: 12,
        marginTop: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.success[900],
    },
    refreshText: {
        color: Colors.success[900],
        fontFamily: FontFamily.medium,
        fontSize: FontSize.small,
    },
});