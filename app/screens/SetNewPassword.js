import { useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	StyleSheet,
	Button,
	Alert,
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
		await submitNewPasswordUser(
			formPassword.pin,
			formPassword.email,
			formPassword.newPassword,
			formPassword.newPasswordConfirm
		).then((responseNewPassword) => {
			if (responseNewPassword.data.status === 1) {
				Alert.alert(
					'Senha atualizada',
					'Sua senha foi atualizada com sucesso!'
				);
				writeItemToStorageSupport({ recovery_email: null }).then((response) => {
					setFormPassword({
						pin: '',
						email: '',
						newPassword: '',
						newPasswordConfirm: '',
					});
					if (userStatus === 'LOGGED') {
						navigation.reset({
							routes: [{ name: 'Hub' }],
						});
					}
					if (userStatus === 'NOT_LOGGED') {
						navigation.reset({
							routes: [{ name: 'Login' }],
						});
					}
				});
			} else {
				Alert.alert('Ops!', responseNewPassword.data.message);
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
