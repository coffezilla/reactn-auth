import { Text, StyleSheet, View } from 'react-native';

import MenuDebugger from '../components/MenuDebugger';

const Signup = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<MenuDebugger />
		</View>
	);
};

export default Signup;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
