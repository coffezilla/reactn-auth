import { Text, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

const Hub = () => {
	const RdxRoot = useSelector((state) => state);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<View>
					<Text>HUB...</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Hub;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	innerContainer: {
		marginVertical: 17,
		marginHorizontal: 17,
		justifyContent: 'space-between',
		flex: 1,
	},
});
