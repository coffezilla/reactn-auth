import { useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	StyleSheet,
	Button,
} from 'react-native';

import { submitNewPasswordUser } from '../Api/authHandle';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// localstorage
import {
	readItemFromStorageSupport,
	writeItemToStorageSupport,
	clearAllFromStorage,
} from '../helpers/handleStorage';

const SetNewPassword = ({ route, navigation }) => {
	// without params
	if (route.params === undefined) {
		navigation.goBack();
		return false;
	}

	const { pin, email, userStatus } = route.params;
	console.log('puxei', userStatus);
	// const [hasPin, setHasPin] = useState(false);
	const [formPassword, setFormPassword] = useState({
		pin,
		email,
		newPassword: '',
		newPasswordConfirm: '',
	});

	const handleForm = (inputName, inputText) => {
		setFormPassword({
			...formPassword,
			[inputName]: inputText,
		});
	};

	//
	const submitNewPassword = async () => {
		// alert('Saudade');
		await submitNewPasswordUser(
			formPassword.pin,
			formPassword.email,
			formPassword.newPassword,
			formPassword.newPasswordConfirm
		).then((responseNewPassword) => {
			console.log('xxxx', responseNewPassword);
			// console.log('slad', form.email);
			if (responseNewPassword.data.status === 1) {
				console.log('ALTERADO', userStatus);
				writeItemToStorageSupport({ recovery_email: null }).then((response) => {
					setFormPassword({
						pin: '',
						email: '',
						newPassword: '',
						newPasswordConfirm: '',
					});
					if (userStatus === 'LOGGED') {
						console.log('my friend logged');
						navigation.reset({
							routes: [{ name: 'Hub' }],
						});
						// navigation.push('Hub');
					}
					if (userStatus === 'NOT_LOGGED') {
						console.log('my friend not logged');
						navigation.reset({
							routes: [{ name: 'Login' }],
						});
						// navigation.push('Login');
					}
				});
			} else {
				console.log('dispatch');
				alert(responseNewPassword.data.message);
			}
		});
	};

	return (
		<ScrollView>
			<Text>Set New Password</Text>
			<MenuDebugger />
			<MsDebugger value={formPassword} name='new pass' />
			<View
				style={{
					backgroundColor: 'white',
					marginBottom: 10,
					borderWidth: 1,
				}}
			>
				<Text>CONFIRMAR</Text>
			</View>
			<View
				style={{
					borderWidth: 1,
					backgroundColor: 'orange',
				}}
			>
				<Text>Alterar senha</Text>
				<View>
					<Text>Novo</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('newPassword', text)}
						value={formPassword.newPassword}
					/>
				</View>
				<View>
					<Text>Confirmar</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('newPasswordConfirm', text)}
						value={formPassword.newPasswordConfirm}
					/>
				</View>
				<View style={{ padding: 3 }}>
					<Button title='ATUALIZAR PASSWORD' onPress={submitNewPassword} />
				</View>
			</View>
		</ScrollView>
	);
};

export default SetNewPassword;

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
