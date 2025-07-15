import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import DroneMapComponent from '../../components/DroneMapComponent';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { FontFamily, FontSize } from '../../constant/Typography';

export default function EncontrarScreen() {
    const primaryColor = Colors.primary[500];
    const secondaryColor = Colors.secondary[500];

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
                    <View style={styles.mapContainer}>
                        <DroneMapComponent />
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
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
    location: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        color: Colors.neutro,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.small,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    }
});
