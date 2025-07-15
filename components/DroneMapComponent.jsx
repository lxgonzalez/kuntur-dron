import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { ChevronDownIcon, ChevronRightIcon, SignalIcon } from 'react-native-heroicons/solid';
import Colors from '../constant/Colors';
import { FontFamily, FontSize } from '../constant/Typography';
import { useDroneLocation } from '../hooks/useDroneLocation';
import { useState } from 'react';
import LogoFace from './svg/LogoFace';

export default function DroneMapComponent() {
    const {
        droneLocation,
        droneData,
    } = useDroneLocation();

    const [showInfo, setShowInfo] = useState(false);

    const mapRegion = {
        latitude: droneLocation.latitude,
        longitude: droneLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapRegion}
                showsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={true}
                showsScale={true}
                mapType="standard"
            >
                <Marker
                    coordinate={droneLocation}
                    title="Kuntur Dron"
                    description="Ubicación actual del dron de seguridad"
                >
                    <View style={styles.markerContainer}>
                        <LogoFace color={Colors.primary[500]} width={30} height={30} />
                    </View>
                </Marker>

                <Circle
                    center={droneLocation}
                    radius={500}
                    strokeColor={Colors.primary[500]}
                    strokeWidth={2}
                />
            </MapView>

            <View style={styles.infoPanel}>
                <TouchableOpacity
                    style={styles.infoHeader}
                    onPress={() => setShowInfo(!showInfo)}
                >
                    <View style={styles.infoTitleContainer}>
                        <SignalIcon size={20} color={Colors.success[500]} />
                        <Text style={styles.infoTitle}>Información de la Ubicación</Text>
                    </View>
                    <Text style={styles.toggleText}>{showInfo ?
                        <ChevronDownIcon color={Colors.primary[500]} />
                        :
                        <ChevronRightIcon color={Colors.primary[500]} />}</Text>
                </TouchableOpacity>

                {showInfo && (
                    <View style={styles.infoContent}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Coordenadas:</Text>
                            <Text style={styles.infoValue}>
                                {droneLocation.latitude.toFixed(4)}, {droneLocation.longitude.toFixed(4)}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Estado:</Text>
                            <Text style={styles.infoValue}>
                                {droneData.status}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: Colors.neutro,
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.neutro,
        borderRadius: 25,
        padding: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: Colors.primary[500],
    },
    infoPanel: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: Colors.neutro,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark[200],
    },
    infoTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoTitle: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.body,
        color: Colors.dark[700],
        fontWeight: 'bold',
    },
    toggleText: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.body,
        color: Colors.dark[500],
    },
    infoContent: {
        padding: 16,
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        color: Colors.dark[600],
    },
    infoValue: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
        color: Colors.dark[800],
        fontWeight: 'bold',
    }
});
