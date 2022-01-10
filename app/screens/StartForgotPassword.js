import { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	SafeAreaView,
	StatusBar,
	Text,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

// form
import { validateForm } from '../components/FormValidation';
import {
	CheckInputGroup,
	RadioInputGroup,
	SwitchInputGroup,
	TextInputGroup,
	TextInputGroupReadonly,
	TextareaInputGroup,
	RadioInputGroupWrapper,
} from '../components/FormInputs';

// rest
import {
	submitStartForgotPasswordUser,
	checkPinChangePassword,
} from '../Api/authHandle';

// localstorage
import {
	readItemFromStorageSupport,
	writeItemToStorageSupport,
} from '../helpers/handleStorage';

// components
import { FormSampleInputText } from '../components/FormSample';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const StartForgotPassword = ({ navigation }) => {
	const { colors, dark } = useTheme();

	const [emailRecovery, setEmailRecovery] = useState(false);
	const [formFields, setFormFields] = useState([
		{
			name: 'email',
			value: 'foo@gmail.com',
			error: '',
			type: 'email',
			isRequired: true,
		},
		{
			name: 'pin',
			value: '',
			error: '',
			type: 'text',
			isRequired: true,
		},
	]);

	// validate only email
	const validationFormEmail = () => {
		const inputRequired = validateForm([formFields[0]], setFormFields);
		const hasNoErrors = inputRequired.hasPassed;

		return hasNoErrors;
	};

	// validate pin and email
	const validationFormPin = () => {
		const inputRequired = validateForm(formFields, setFormFields);
		const hasNoErrors = inputRequired.hasPassed;

		return hasNoErrors;
	};

	const handleChange = (value, name, params = {}, switcher = false) => {
		if (switcher) {
			value = !value;
		}

		setFormFields(
			formFields.map((field) => {
				if (field.name === name) {
					return {
						...field,
						value: value,
						error: '',
					};
				}
				return { ...field };
			})
		);
	};

	// ///////
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
	// ///////

	const submitConfirmPin = async () => {
		const isValid = validationFormPin();

		if (isValid) {
			await checkPinChangePassword(
				formFields[1].value,
				formFields[0].value
			).then((responseCheckPin) => {
				if (responseCheckPin.data.status === 1) {
					// clear stacks
					navigation.reset({
						routes: [{ name: 'Login' }],
					});

					navigation.push('SetNewPassword', {
						pin: formFields[1].value,
						email: formFields[0].value,
						userStatus: 'NOT_LOGGED',
					});
				} else {
					Alert.alert('Ops', responseCheckPin.data.message);
				}
			});
		}
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
		const isValid = validationFormEmail();
		if (isValid) {
			await submitStartForgotPasswordUser(formFields[0].value).then(
				(responseStartForgot) => {
					if (responseStartForgot.data.status === 1) {
						writeItemToStorageSupport({
							recovery_email: formFields[0].value,
						}).then((response) => {
							setEmailRecovery(true);
						});
					} else {
						Alert.alert('Ops!', responseStartForgot.data.message);
					}
				}
			);
		}
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
			<SafeAreaView style={styles.container}>
				<View style={styles.innerContainer}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<TextInputGroup
							label='Pin'
							placeholder='- - - - - -'
							name={formFields[1].name}
							error={formFields[1].error}
							handleInputForm={handleChange}
							darkTheme={dark ? true : false}
							keyboardType='numeric'
							maxLength={6}
							mask='NUMBER'
							value={formFields[1].value}
						/>

						<CustomButtons title='CONFIRMAR' onPress={submitConfirmPin} />
					</View>
					<CustomButtons
						title='RE-ENVIAR E-MAIL'
						type='PRIMARY_EMPTY'
						onPress={resetEmailRecovery}
					/>
				</View>
			</SafeAreaView>
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
					<TextInputGroup
						label='E-mail'
						placeholder='Ex.: my@email.com'
						name={formFields[0].name}
						error={formFields[0].error}
						darkTheme={dark ? true : false}
						handleInputForm={handleChange}
						keyboardType='email-address'
						autoCapitalize='none'
						value={formFields[0].value}
					/>
					{/* 
					<FormSampleInputText
						inputLabel='E-mail cadastrado'
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/> */}
				</View>

				<CustomButtons title='CONFIRMAR' onPress={submitStartForgotPassword} />
			</View>
		</View>
	);
};

export default StartForgotPassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		marginVertical: 17,
		marginHorizontal: 17,
		flex: 1,
	},
});
