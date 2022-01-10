import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

const Hub = () => {
	const RdxRoot = useSelector((state) => state);
	const { colors, dark } = useTheme();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<View>
					<Text style={{ color: colors.text }}>HUB...</Text>
				</View>
			</View>
			<StatusBar
				barStyle={dark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.card}
			/>
		</SafeAreaView>
	);
};

export default Hub;

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
});
