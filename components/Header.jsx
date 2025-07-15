import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constant/Colors';
import { FontFamily, FontSize } from '../constant/Typography';
import Letters from './svg/Letters.jsx';
import LogoFace from './svg/LogoFace.jsx';
import IconDron from './svg/IconDron.jsx';

export default function Header() {
    return (
        <View style={styles.header}>
            <LogoFace color={Colors.neutro} />
            <View>
                <Letters color={Colors.neutro} />
                <Text style={styles.text}>
                    Seguridad desde las nubes
                </Text>
            </View>
            <IconDron color={Colors.neutro} />
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    text: {
        color: Colors.primary[200],
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xxs,
        textAlign: 'center',
    },

});
