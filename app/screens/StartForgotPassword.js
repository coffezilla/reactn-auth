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

// components
import { FormSampleInputText } from '../components/FormSample';
import { HeadersText } from '../components/HeadersText/HeadersText';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const StartForgotPassword = ({ navigation }) => {
	const [emailRecovery, setEmailRecovery] = useState(false);
	const [form, setForm] = useState({
		email: 'renato@bhxsites.com.br',
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
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<FormSampleInputText
							inputLabel='PIN de recuperação'
							placeholder='- - - - - -'
							onChangeText={(text) => handleForm('pin', text)}
							keyboardType='numeric'
							maxLength={6}
							inputStyle={{
								fontSize: 30,
								textAlign: 'center',
							}}
							value={form.pin}
						/>
						<CustomButtons title='CONFIRMAR' onPress={submitConfirmPin} />
					</View>
					<CustomButtons
						title='RE-ENVIAR E-MAIL'
						type='PRIMARY_EMPTY'
						onPress={resetEmailRecovery}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<FormSampleInputText
						inputLabel='E-mail cadastrado'
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/>
				</View>

				<CustomButtons title='CONFIRMAR' onPress={submitStartForgotPassword} />
			</View>
		</View>
	);
};

export default StartForgotPassword;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	innerContainer: {
		marginVertical: 17,
		marginHorizontal: 17,
		flex: 1,
	},
});
