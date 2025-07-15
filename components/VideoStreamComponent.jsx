import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { VideoCameraIcon } from 'react-native-heroicons/solid';
import Colors from '../constant/Colors';
import { FontFamily, FontSize } from '../constant/Typography';

export default function VideoStreamComponent({
    isStreaming,
    loading,
    error,
    quality,
    onClearError
}) {

    const renderVideoContent = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.primary[500]} />
                    <Text style={styles.loadingText}>Conectando...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={onClearError} style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (isStreaming) {
            return (
                <View style={styles.streamingContainer}>
                    <View style={styles.simulatedVideo}>
                        <VideoCameraIcon size={40} color={Colors.primary[500]} />
                        <View style={styles.liveIndicator}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>EN VIVO</Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.offlineContainer}>
                <VideoCameraIcon size={40} color={Colors.dark[400]} />
                <Text style={styles.offlineText}>Cámara desconectada</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.videoArea}>
                {renderVideoContent()}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.neutro,
        borderRadius: 16,
        overflow: 'hidden',
    },
    videoArea: {
        height: 200,
        backgroundColor: Colors.dark[800],
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    loadingText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
    },
    errorText: {
        color: Colors.danger[500],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: Colors.danger[500],
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    retryButtonText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
    streamingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    simulatedVideo: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.danger[500],
    },
    liveText: {
        color: Colors.danger[500],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        fontWeight: 'bold',
    },
    offlineContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    offlineText: {
        color: Colors.dark[400],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
});
