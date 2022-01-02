import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';

// rest
import {
	getAuth,
	submitLoginUser,
	submitLogoutUser,
	submitSignupUser,
} from '../Api/authHandle';

// localstorage
import {
	readItemFromStorage,
	writeItemToStorage,
	clearAllFromStorage,
} from '../helpers/handleStorage';

const Signup = () => {
	const dispatch = useDispatch();
	const RdxRoot = useSelector((state) => state);
	const form = {
		name: 'Fooz',
		email: 'foo@gmail.com',
		password: '123123',
	};

	// login user
	const submitSignup = async () => {
		await submitSignupUser(form).then((responseSignup) => {
			if (responseSignup.data.status === 1) {
				getAuth(form.email)
					.then((resAuth) => {
						if (resAuth.data.status === 1) {
							writeItemToStorage(resAuth.data).then((response) => {
								dispatch(actSetLogin());
							});
							console.log('SIGNUP');
						} else {
							console.log('Erro auth');
						}
					})
					.catch((error) => {
						console.log('Erro auth, try again');
					});
			} else {
				dispatch(actSetLogout());
				console.log('dispatch');
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
					<Button title='CADASTRAR' onPress={submitSignup} />
				</View>
			</View>
		</ScrollView>
	);
};

export default Signup;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});
