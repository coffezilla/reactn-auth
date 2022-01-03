import { useEffect, useState } from 'react';
import {
	Text,
	View,
	Pressable,
	StyleSheet,
	TextInput,
	Button,
	Alert,
} from 'react-native';

// rest
import {
	getAuth,
	submitLoginUser,
	submitLogoutUser,
	submitStartForgotPasswordUser,
	checkPinChangePassword,
	checkCurrentPassword,
} from '../Api/authHandle';

// localstorage
import {
	readItemFromStorageSupport,
	writeItemToStorageSupport,
	clearAllFromStorage,
} from '../helpers/handleStorage';

const StartChangePassword = ({ navigation }) => {
	const [emailRecovery, setEmailRecovery] = useState(false);
	const [form, setForm] = useState({
		currentPassword: '',
	});

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	const submitConfirmPassword = async () => {
		await checkCurrentPassword(form.currentPassword).then(
			(responseCurrentPassword) => {
				if (responseCurrentPassword.data.status === 1) {
					navigation.push('SetNewPassword', {
						pin: responseCurrentPassword.data.pin,
						email: responseCurrentPassword.data.email,
						userStatus: 'LOGGED',
					});
				} else {
					Alert.alert('Ops!', responseCurrentPassword.data.message);
				}
			}
		);
	};

	return (
		<View>
			<Text>Start Change password</Text>
			<View
				style={{
					backgroundColor: 'white',
					marginBottom: 10,
					borderWidth: 1,
				}}
			>
				<Text>Adicionar password atual</Text>
				<View>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('currentPassword', text)}
						value={form.currentPassword}
					/>
				</View>
				<View style={{ padding: 3 }}>
					<Button title='CONFIRMAR PASSWORD' onPress={submitConfirmPassword} />
				</View>
			</View>
		</View>
	);
};

export default StartChangePassword;

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
	input: {
		borderWidth: 1,
		height: 40,
		marginBottom: 3,
	},
});
