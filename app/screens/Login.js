import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import MenuDebugger from '../components/MenuDebugger';
import MsDebugger from '../components/MsDebugger';

const Login = () => {
	const RdxRoot = useSelector((state) => state);

	return (
		<ScrollView style={styles.container}>
			<MenuDebugger />
			<MsDebugger value={RdxRoot} name='RdxRoot' />
		</ScrollView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});
