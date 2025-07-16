import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from 'react-native-heroicons/solid';
import { FontFamily, FontSize } from '../constant/Typography';
import Colors from '../constant/Colors';

export default function RecordedVideoComponent({
    videoUrl,
    loading = false,
    error = null,
    onLoadStart,
    onLoadEnd,
    onError,
    onClearError
}) {
    const [status, setStatus] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [
                { text: 'OK', onPress: onClearError }
            ]);
        }
    }, [error]);

    const handlePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
        }
    };

    const handleMuteToggle = async () => {
        if (videoRef.current) {
            await videoRef.current.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        setStatus(status);
        if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.neutro} />
                <Text style={styles.loadingText}>Cargando video...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error al cargar el video</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onClearError}>
                    <Text style={styles.retryText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!videoUrl) {
        return (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>No hay video disponible</Text>
                <Text style={styles.placeholderSubtext}>El video se mostrará aquí una vez que el dron complete su vuelo</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{ uri: videoUrl }}
                    useNativeControls={false}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping={false}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    onLoadStart={onLoadStart}
                    onLoad={onLoadEnd}
                    onError={onError}
                />

                {/* Controles personalizados */}
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
                        {isPlaying ?
                            <PauseIcon size={24} color={Colors.neutro} /> :
                            <PlayIcon size={24} color={Colors.neutro} />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlButton} onPress={handleMuteToggle}>
                        {isMuted ?
                            <SpeakerXMarkIcon size={24} color={Colors.neutro} /> :
                            <SpeakerWaveIcon size={24} color={Colors.neutro} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {/* Información del video */}
            <View style={styles.info}>
                <Text style={styles.infoText}>
                    {status.isLoaded ?
                        `Duración: ${Math.floor(status.durationMillis / 1000)}s` :
                        'Cargando información...'
                    }
                </Text>
                {status.isLoaded && (
                    <Text style={styles.infoText}>
                        Posición: {Math.floor(status.positionMillis / 1000)}s
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 16,
        overflow: 'hidden',
    },
    videoContainer: {
        position: 'relative',
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    controls: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 12,
        borderRadius: 8,
    },
    info: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    infoText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        marginBottom: 4,
    },
    loadingContainer: {
        aspectRatio: 16 / 9,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        marginTop: 12,
    },
    errorContainer: {
        aspectRatio: 16 / 9,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: Colors.danger[400],
        fontFamily: FontFamily.medium,
        fontSize: FontSize.body,
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: Colors.primary[400],
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: Colors.neutro,
        fontFamily: FontFamily.medium,
        fontSize: FontSize.small,
    },
    placeholderContainer: {
        aspectRatio: 16 / 9,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    placeholderText: {
        color: Colors.neutro,
        fontFamily: FontFamily.medium,
        fontSize: FontSize.body,
        textAlign: 'center',
        marginBottom: 8,
    },
    placeholderSubtext: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        textAlign: 'center',
        opacity: 0.7,
    },
});
