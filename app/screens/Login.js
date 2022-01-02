import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// rest
import { getAuth, submitLoginUser, submitLogoutUser } from '../Api/authHandle';

// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';

// localstorage
import {
	readItemFromStorage,
	writeItemToStorage,
	clearAllFromStorage,
} from '../helpers/handleStorage';

const Login = () => {
	const RdxRoot = useSelector((state) => state);
	const dispatch = useDispatch();

	const form = {
		email: 'renato@gmail.com',
		password: '123123',
	};

	// login user
	const submitLogin = async () => {
		await submitLoginUser(form.email, form.password).then((responseLogin) => {
			if (responseLogin.data.status === 1) {
				getAuth(form.email)
					.then((resAuth) => {
						if (resAuth.data.status === 1) {
							writeItemToStorage(resAuth.data).then((response) => {
								console.log('saudade', response);
								dispatch(actSetLogin());
							});
						} else {
							console.log('Erro auth');
						}
					})
					.catch((error) => {
						console.log('Erro auth, try again');
					});
			} else {
				dispatch(actSetLogout());
			}
		});
	};

	return (
		<ScrollView style={styles.container}>
			<MenuDebugger />
			<MsDebuggerRedux />
			<MsDebuggerLocalStorage />
			<View>
				<Text>LOGIN</Text>
				<View style={{ padding: 3, flex: 1 }}>
					<Button title='LOGIN' onPress={submitLogin} />
				</View>
			</View>
		</ScrollView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});
