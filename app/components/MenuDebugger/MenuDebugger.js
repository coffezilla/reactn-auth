import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuDebugger = () => {
	const navigation = useNavigation();
	return (
		<View style={{ width: '100%' }}>
			<Pressable style={styles.button} onPress={() => navigation.push('About')}>
				<Text style={styles.text}>About - todos</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={() => navigation.push('Hub')}>
				<Text style={styles.text}>Hub - logado</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={() => navigation.push('Login')}>
				<Text style={styles.text}>Login - nao logado</Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => navigation.push('Signup')}
			>
				<Text style={styles.text}>Signup - nao logado</Text>
			</Pressable>
		</View>
	);
};

export default MenuDebugger;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#f2f2f2',
		padding: 10,
		marginBottom: 3,
	},
	text: {
		color: 'black',
		fontSize: 20,
	},
});
