import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from 'react-native-heroicons/solid';
import Colors from '../constant/Colors';
import { FontFamily, FontSize } from '../constant/Typography';

export default function AudioStreamComponent({
    isStreaming,
    loading,
    error,
    audioLevel,
}) {

    const renderAudioVisualizer = () => {
        if (!isStreaming) return null;

        const bars = Array.from({ length: 12 }, (_, i) => {
            const height = Math.max(2, (audioLevel / 100) * 20 * (Math.random() * 0.8 + 0.2));
            return (
                <View
                    key={i}
                    style={[
                        styles.audioBar,
                        { height: height }
                    ]}
                />
            );
        });

        return (
            <View style={styles.audioVisualizer}>
                {bars}
            </View>
        );
    };

    const renderAudioContent = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <View>
                        <ActivityIndicator size="small" color={Colors.primary[500]} />
                    </View>
                    <View>
                        <Text style={styles.loadingText}>Conectando audio...</Text>
                    </View>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <SpeakerXMarkIcon size={20} color={Colors.danger[500]} />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        if (isStreaming) {
            return (
                <View style={styles.streamingContainer}>
                    <View style={
                        { flexDirection: 'row', alignItems: 'center', gap: 10 }
                    }>
                        <SpeakerWaveIcon size={20} color={Colors.success[900]} />
                        {renderAudioVisualizer()}
                    </View>
                    <View style={styles.liveIndicator}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>AUDIO EN VIVO</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.offlineContainer}>
                <SpeakerXMarkIcon size={20} color={Colors.dark[400]} />
                <Text style={styles.offlineText}>Audio desconectado</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.audioContent}>
                {renderAudioContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.neutro,
        borderRadius: 100,
        paddingHorizontal: 16,
        height: 40,
    },
    audioContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    loadingText: {
        color: Colors.dark[600],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    errorText: {
        color: Colors.danger[500],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
        flex: 1,
    },
    retryButton: {
        backgroundColor: Colors.danger[500],
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    retryButtonText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
    },
    streamingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        flex: 1,
    },
    audioVisualizer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        height: 20,
    },
    audioBar: {
        width: 3,
        backgroundColor: Colors.success[900],
        borderRadius: 1.5,
        minHeight: 2,
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.success[900],
    },
    liveText: {
        color: Colors.success[900],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
        fontWeight: 'bold',
    },
    audioLevelText: {
        color: Colors.dark[600],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
    },
    offlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        flex: 1,
    },
    offlineText: {
        color: Colors.dark[400],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
    },
    offlineSubtext: {
        color: Colors.dark[300],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
        fontStyle: 'italic',
    },
});
