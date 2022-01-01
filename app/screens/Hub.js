import { Text, StyleSheet, View } from 'react-native';

import MenuDebugger from '../components/MenuDebugger';

const Hub = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<MenuDebugger />
		</View>
	);
};

export default Hub;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
