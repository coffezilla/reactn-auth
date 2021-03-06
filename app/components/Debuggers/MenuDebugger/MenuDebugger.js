import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Controllers from '../Controllers/Controllers';

const MenuDebugger = () => {
	const RdxLogginStatus = useSelector((state) => state.loginStatus);
	const navigation = useNavigation();

	return (
		<View style={{ width: '100%' }}>
			{RdxLogginStatus === 'LOGGED' && (
				<>
					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('Hub')}
					>
						<Text style={styles.text}>Hub - logado</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('UserEdit')}
					>
						<Text style={styles.text}>User Edit - logado</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('UserDelete')}
					>
						<Text style={styles.text}>User Delete - logado</Text>
					</Pressable>

					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('StartChangePassword')}
					>
						<Text style={styles.text}>StartChangePassword - logado</Text>
					</Pressable>
				</>
			)}

			{RdxLogginStatus === 'NOT_LOGGED' && (
				<>
					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('Login')}
					>
						<Text style={styles.text}>Login - nao logado</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('Signup')}
					>
						<Text style={styles.text}>Signup - nao logado</Text>
					</Pressable>

					<Pressable
						style={styles.button}
						onPress={() => navigation.navigate('StartForgotPassword')}
					>
						<Text style={styles.text}>StartForgotPassword - nao logado</Text>
					</Pressable>
				</>
			)}

			<Pressable
				style={styles.button}
				onPress={() => navigation.navigate('About')}
			>
				<Text style={styles.text}>About - todos</Text>
			</Pressable>

			<Pressable
				style={styles.button}
				onPress={() => navigation.navigate('SetNewPassword')}
			>
				<Text style={styles.text}>SetNewPassword - todos</Text>
			</Pressable>

			{/* <Controllers /> */}
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
