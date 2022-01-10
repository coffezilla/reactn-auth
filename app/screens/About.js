import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

const About = () => {
	const ManifestVersion = Constants.manifest.version;
	const ManifestName = Constants.manifest.name;

	const { colors, dark } = useTheme();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<View>
					<Text style={{ color: colors.text }}>ABOUT...</Text>
				</View>
				<Text style={[styles.footer, { color: colors.text }]}>
					{ManifestName} - {ManifestVersion}
				</Text>
			</View>
			<StatusBar
				barStyle={dark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.card}
			/>
		</SafeAreaView>
	);
};

export default About;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		marginVertical: 17,
		marginHorizontal: 17,
		justifyContent: 'space-between',
		flex: 1,
	},
	footer: {
		textAlign: 'center',
		fontSize: 14,
	},
});
