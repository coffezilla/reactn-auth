import { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	Button,
	Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
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
import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
	const [form, setForm] = useState({
		email: 'foo@gmail.com',
		password: '123',
	});
	const RdxRoot = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	// login user
	const submitLogin = async () => {
		await submitLoginUser(form.email, form.password).then((responseLogin) => {
			if (responseLogin.data.status === 1) {
				writeItemToStorage(responseLogin.data).then((response) => {
					dispatch(actSetLogin());
				});
			} else {
				dispatch(actSetLogout());
				Alert.alert('Ops!', responseLogin.data.message);
			}
		});
	};

	return (
		<ScrollView style={styles.container}>
			<MenuDebugger />
			<MsDebugger name='formulario' value={form} />
			{/* <MsDebuggerRedux /> */}
			{/* <MsDebuggerLocalStorage /> */}

			<View>
				<Text>LOGIN</Text>
				<View>
					<Text>Email</Text>
					<TextInput
						style={styles.input}
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/>
				</View>
				<View>
					<Text>Password</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('password', text)}
						value={form.password}
					/>
				</View>
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
	input: {
		borderWidth: 1,
		height: 40,
		marginBottom: 3,
	},
});
