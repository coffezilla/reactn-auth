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
} from '../Api/authHandle';

// localstorage
import {
	readItemFromStorageSupport,
	writeItemToStorageSupport,
	clearAllFromStorage,
} from '../helpers/handleStorage';

const StartForgotPassword = ({ navigation }) => {
	const [emailRecovery, setEmailRecovery] = useState(false);
	const [form, setForm] = useState({
		email: 'foo@gmail.com',
		pin: '123',
	});

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	const submitConfirmPin = async () => {
		await checkPinChangePassword(form.pin, form.email).then(
			(responseCheckPin) => {
				if (responseCheckPin.data.status === 1) {
					// clear stacks
					navigation.reset({
						routes: [{ name: 'Login' }],
					});

					navigation.push('SetNewPassword', {
						pin: form.pin,
						email: form.email,
						userStatus: 'NOT_LOGGED',
					});
				} else {
					Alert.alert('Ops!', responseCheckPin.data.message);
				}
			}
		);
	};

	const resetEmailRecovery = async () => {
		await writeItemToStorageSupport({ recovery_email: null }).then(
			(response) => {
				setEmailRecovery(false);
				console.log('reset pin');
			}
		);
	};

	const submitStartForgotPassword = async () => {
		await submitStartForgotPasswordUser(form.email).then(
			(responseStartForgot) => {
				if (responseStartForgot.data.status === 1) {
					writeItemToStorageSupport({ recovery_email: form.email }).then(
						(response) => {
							setEmailRecovery(true);
						}
					);
				} else {
					Alert.alert('Ops!', responseStartForgot.data.message);
				}
			}
		);
	};

	const checkLocalStorageEmail = async () => {
		await readItemFromStorageSupport().then((response) => {
			if (response !== null) {
				if (response?.recovery_email !== null) {
					setEmailRecovery(true);
					setForm({ ...form, email: response.recovery_email });
				} else {
				}
			}
		});
	};

	useEffect(() => {
		checkLocalStorageEmail();
	}, []);

	if (emailRecovery) {
		return (
			<View>
				<Text>Set New Password</Text>
				<View
					style={{
						backgroundColor: 'white',
						marginBottom: 10,
						borderWidth: 1,
					}}
				>
					<Text>Adicionar PIN</Text>
					<View>
						<TextInput
							style={styles.input}
							placeholder='000000'
							onChangeText={(text) => handleForm('pin', text)}
							keyboardType='numeric'
							value={form.pin}
						/>
					</View>
					<View style={{ padding: 3 }}>
						<Button title='CONFIRMAR PIN' onPress={submitConfirmPin} />
					</View>
					<View style={{ padding: 3 }}>
						<Button title='RECOLOCAR EMAIL' onPress={resetEmailRecovery} />
					</View>
				</View>
			</View>
		);
	}

	return (
		<View>
			<Text>Start Forgot Password</Text>
			<View
				style={{
					backgroundColor: 'white',
					marginBottom: 10,
					borderWidth: 1,
				}}
			>
				<Text>Adicionar email para recuperar</Text>
				<View>
					<TextInput
						style={styles.input}
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/>
				</View>
				<View style={{ padding: 3 }}>
					<Button title='RECUPERAR SENHA' onPress={submitStartForgotPassword} />
				</View>
			</View>
		</View>
	);
};

export default StartForgotPassword;

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
