import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import VideoStreamComponent from '../../components/VideoStreamComponent';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { FontFamily, FontSize } from '../../constant/Typography';
import { useStreaming } from '../../hooks/useSharedStreaming';

export default function ResumenScreen() {
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
                    <Text style={styles.text}>Transcripción</Text>

                    <View style={styles.transcriptionContainer}>
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <Text style={styles.textTranscription}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, illum eos praesentium, officiis doloribus nulla molestiae neque minus facere fugiat quam tempore necessitatibus mollitia ex magnam excepturi alias laborum omnis.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi veritatis debitis fugiat dolorum placeat aliquid ipsam pariatur neque consequatur? Cupiditate nemo vero, consectetur animi temporibus aliquam sapiente totam praesentium! Mollitia.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut rem quasi, quibusdam dicta ducimus, alias vitae impedit eius nesciunt ratione repudiandae pariatur voluptate facilis, illo vero tempore temporibus ad.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut rem quasi, quibusdam dicta ducimus, alias vitae impedit eius nesciunt ratione repudiandae pariatur voluptate facilis, illo vero tempore temporibus ad.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut rem quasi, quibusdam dicta ducimus, alias vitae impedit eius nesciunt ratione repudiandae pariatur voluptate facilis, illo vero tempore temporibus ad.
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
        gap: 8,
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
    transcriptionContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        maxHeight: '40%',
        padding: 16,
        borderRadius: 16,
    },
    textTranscription: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        lineHeight: 20,
    }
});
