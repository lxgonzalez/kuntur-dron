import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { VideoCameraIcon } from 'react-native-heroicons/solid';
import Colors from '../constant/Colors';
import { FontFamily, FontSize } from '../constant/Typography';

export default function VideoStreamComponent({ isStreaming, loading, error, onClearError }) {
    const renderVideoContent = () => {
        if (loading) {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.primary[500]} />
                    <Text style={styles.textLight}>Conectando...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.centered}>
                    <Text style={styles.textError}>{error}</Text>
                    <TouchableOpacity onPress={onClearError} style={styles.retryButton}>
                        <Text style={styles.textButton}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (isStreaming) {
            return (
                <View style={styles.centered}>
                    <VideoCameraIcon size={40} color={Colors.primary[500]} />
                    <View style={styles.liveIndicator}>
                        <View style={styles.liveDot} />
                        <Text style={styles.textLive}>EN VIVO</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.centered}>
                <VideoCameraIcon size={40} color={Colors.dark[400]} />
                <Text style={styles.textOffline}>Cámara desconectada</Text>
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
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLight: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        marginTop: 8,
    },
    textError: {
        color: Colors.danger[500],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 8,
    },
    retryButton: {
        backgroundColor: Colors.danger[500],
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    textButton: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.danger[500],
        marginRight: 6,
    },
    textLive: {
        color: Colors.danger[500],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        fontWeight: 'bold',
    },
    textOffline: {
        color: Colors.dark[400],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        marginTop: 8,
    },
});
