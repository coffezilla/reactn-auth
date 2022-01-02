import { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	Button,
	TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
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
	const [form, setForm] = useState({
		name: 'foo',
		email: 'foo@gmail.com',
		password: '123',
	});

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	// login user
	const submitSignup = async () => {
		await submitSignupUser(form).then((responseSignup) => {
			console.log('xxxx', responseSignup);
			// console.log('slad', form.email);
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
				alert(responseSignup.data.message);
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
					<Text>Name</Text>
					<TextInput
						style={styles.input}
						placeholder='Ex.: John Wayne'
						onChangeText={(text) => handleForm('name', text)}
						value={form.name}
					/>
				</View>
				<View>
					<Text>Email</Text>
					<TextInput
						style={styles.input}
						placeholder='Ex.: my@email.com'
						autoCapitalize='none'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						value={form.email}
					/>
				</View>
				<View>
					<Text>Password</Text>
					<TextInput
						secureTextEntry={true}
						placeholder='******'
						style={styles.input}
						onChangeText={(text) => handleForm('password', text)}
						value={form.password}
					/>
				</View>
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
	input: {
		borderWidth: 1,
		height: 40,
		marginBottom: 3,
	},
});
