import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuDebugger = () => {
	const navigation = useNavigation();
	return (
		<View>
			<Text>MenuDebugger</Text>
			<Pressable style={styles.button} onPress={() => navigation.push('About')}>
				<Text style={styles.text}>About</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={() => navigation.push('Hub')}>
				<Text style={styles.text}>Hub</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={() => navigation.push('Login')}>
				<Text style={styles.text}>Login</Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => navigation.push('Signup')}
			>
				<Text style={styles.text}>Signup</Text>
			</Pressable>
		</View>
	);
};

export default MenuDebugger;

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 10,
		marginBottom: 3,
	},
	text: {
		color: 'white',
		fontSize: 20,
	},
});
