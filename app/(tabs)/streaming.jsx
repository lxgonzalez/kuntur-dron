import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import VideoStreamComponent from '../../components/VideoStreamComponent';
import AudioStreamComponent from '../../components/AudioStreamComponent';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { FontFamily, FontSize } from '../../constant/Typography';
import { useStreaming } from '../../hooks/useSharedStreaming';

export default function StreamingScreen() {
    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];

    const {
        isVideoStreaming,
        videoLoading,
        videoError,
        videoQuality,

        isAudioStreaming,
        audioLoading,
        audioError,
        audioLevel,

        startVideoStream,
        stopVideoStream,
        changeVideoQuality,

        clearVideoError,
        clearAudioError,
    } = useStreaming();

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
                        <Text style={styles.locationText}>Centro Comercial "El Tejar"</Text>
                    </View>

                    <VideoStreamComponent
                        isStreaming={isVideoStreaming}
                        loading={videoLoading}
                        error={videoError}
                        quality={videoQuality}
                        onStart={startVideoStream}
                        onStop={stopVideoStream}
                        onQualityChange={changeVideoQuality}
                        onClearError={clearVideoError}
                    />

                    <AudioStreamComponent
                        isStreaming={isAudioStreaming}
                        loading={audioLoading}
                        error={audioError}
                        audioLevel={audioLevel}
                        onClearError={clearAudioError}
                    />
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
        gap: 8,
        justifyContent: 'center',
    },
    locationText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
});
