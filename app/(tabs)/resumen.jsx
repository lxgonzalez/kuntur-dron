import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import RecordedVideoComponent from '../../components/RecordedVideoComponent';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { FontFamily, FontSize } from '../../constant/Typography';
import { useUserName } from '../../hooks/useUserName';
import { useRecordedVideos } from '../../hooks/useRecordedVideos';
import { useState } from 'react';

export default function ResumenScreen() {
    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];
    const { latitude, longitude, deviceId } = useUserName();

    const {
        videoUrl,
        loading: videoLoading,
        error: videoError,
        clearError: clearVideoError,
        hasVideos,
        isVideoAvailable,
        flightInfo,
        currentVideo,
        displayAddress,
        formattedAddress,
        shortAddress,
        addressLoading,
        addressError
    } = useRecordedVideos();

    // Estado local para manejar la carga del componente de video
    const [componentVideoLoading, setComponentVideoLoading] = useState(false);

    // Funciones para manejar el video
    const handleVideoLoadStart = () => {
        setComponentVideoLoading(true);
    };

    const handleVideoLoadEnd = () => {
        setComponentVideoLoading(false);
    };

    const handleVideoError = (error) => {
        setComponentVideoLoading(false);
        console.error('Error loading video component:', error);
    };

    const locationText = displayAddress || 'Universidad Central del Ecuador';

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
                        <View>
                            <Text style={styles.locationText}>{locationText}</Text>
                            {/* <Text style={styles.coordinates}>
                                {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
                            </Text> */}
                        </View>
                    </View>

                    <RecordedVideoComponent
                        videoUrl={videoUrl}
                        loading={videoLoading || componentVideoLoading}
                        error={videoError}
                        onLoadStart={handleVideoLoadStart}
                        onLoadEnd={handleVideoLoadEnd}
                        onError={handleVideoError}
                        onClearError={clearVideoError}
                    />

                    <Text style={styles.text}>Análisis del Vuelo</Text>

                    <View style={styles.analysisContainer}>
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <Text style={styles.analysisText}>
                                {isVideoAvailable ?
                                    `Vuelo completado exitosamente${currentVideo?.timestamp ? ` el ${new Date(currentVideo.timestamp).toLocaleDateString()}` : ''}.\n\n` +
                                    `Ubicación: ${formattedAddress || `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}` || 'No disponible'}\n\n` +
                                    `Dispositivo: ${deviceId || 'N/A'}\n\n` +
                                    `${currentVideo?.duration ? `Duración: ${Math.floor(currentVideo.duration / 1000)}s\n\n` : ''}` +
                                    `El dron ha completado su misión y el video ha sido guardado en el servidor S3. ` +
                                    `El video está disponible a través de CDN para una reproducción rápida y confiable.`
                                    :
                                    'Esperando que el dron complete su vuelo...\n\n' +
                                    'Una vez que el dron termine su misión, el video se guardará automáticamente en Amazon S3 ' +
                                    'y estará disponible para reproducir desde esta pantalla a través de CDN.\n\n' +
                                    'El video incluirá toda la grabación del vuelo con la ubicación y timestamp correspondientes.\n\n' +
                                    `Dispositivo registrado: ${deviceId || 'Configurando...'}\n\n` +
                                    `Ubicación actual: ${displayAddress || 'Detectando ubicación...'}`
                                }
                            </Text>
                        </ScrollView>
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
        marginTop: 40,
        flex: 1,
        paddingTop: 20,
        gap: 20,
        width: '100%',
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
    },
    locationText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
    text: {
        borderLeftColor: Colors.neutro,
        paddingLeft: 16,
        borderLeftWidth: 4,
        color: Colors.neutro,
        fontFamily: FontFamily.bold,
        fontSize: FontSize.body,
    },
    addressContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        padding: 16,
        borderRadius: 16,
    },
    addressTitle: {
        color: Colors.neutro,
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.body,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: Colors.neutro,
        paddingLeft: 16,
    },
    addressText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        lineHeight: 20,
    },
    coordinates: {
        textAlign: 'center',
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: FontSize.xs,
        marginTop: 4,
        opacity: 0.7,
    },
    addressError: {
        color: Colors.danger[400],
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        marginTop: 4,
        fontStyle: 'italic',
    },
    analysisContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        maxHeight: '40%',
        padding: 16,
        borderRadius: 16,
    },
    analysisText: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        lineHeight: 20,
    }
});
