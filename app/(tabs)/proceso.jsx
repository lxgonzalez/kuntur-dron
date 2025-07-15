import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/Colors';
import Header from '../../components/Header';
import { FontFamily, FontSize } from '../../constant/Typography';

export default function ProcesoScreen() {
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
                    <Text style={styles.title}>Parte Policial</Text>
                    <View style={styles.containerBlack}>
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <Text style={styles.textContainer}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, illum eos praesentium, officiis doloribus nulla molestiae neque minus facere fugiat quam tempore necessitatibus mollitia ex magnam excepturi alias laborum omnis.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi veritatis debitis fugiat dolorum placeat aliquid ipsam pariatur neque consequatur? Cupiditate nemo vero, consectetur animi temporibus aliquam sapiente totam praesentium! Mollitia.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut rem quasi, quibusdam dicta ducimus, alias vitae impedit eius nesciunt ratione repudiandae pariatur voluptate facilis, illo vero tempore temporibus ad.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut rem quasi, quibusdam dicta ducimus, alias vitae impedit eius nesciunt ratione repudiandae pariatur voluptate facilis, illo vero tempore temporibus ad.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut rem quasi, quibusdam dicta ducimus, alias vitae impedit eius nesciunt ratione repudiandae pariatur voluptate facilis, illo vero tempore temporibus ad.
                            </Text>
                        </ScrollView>
                    </View>
                    <Text style={styles.title2}>Sentencia</Text>
                    <View style={styles.containerBlack}>
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <Text style={styles.textContainer}>
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
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        marginTop: 40,
        borderLeftWidth: 4,
        paddingLeft: 8,
        borderColor: Colors.neutro,
        color: Colors.neutro,
        fontSize: FontSize.body,
        fontFamily: FontFamily.bold,
    },
    title2: {
        borderLeftWidth: 4,
        paddingLeft: 8,
        borderColor: Colors.neutro,
        color: Colors.neutro,
        fontSize: FontSize.body,
        fontFamily: FontFamily.bold,
    },
    containerBlack: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        maxHeight: '35%',
        padding: 16,
        borderRadius: 16,
    },
    textContainer: {
        color: Colors.neutro,
        fontFamily: FontFamily.light,
        fontSize: FontSize.small,
        lineHeight: 20,
    }

});
