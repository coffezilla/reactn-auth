import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import MenuDebugger from '../components/MenuDebugger';

const Signup = () => {
	const RdxRoot = useSelector((state) => state);

	return (
		<View style={styles.container}>
			<MenuDebugger />
			<Text>{JSON.stringify(RdxRoot, null, 1)}</Text>
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
