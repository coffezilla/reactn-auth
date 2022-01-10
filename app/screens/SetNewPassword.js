import { useState } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	SafeAreaView,
	StatusBar,
	Text,
} from 'react-native';

import { submitNewPasswordUser } from '../Api/authHandle';

import { useTheme } from '@react-navigation/native';

// form
import { validateForm } from '../components/FormValidation';
import { TextInputGroup } from '../components/FormInputs';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// localstorage
import { writeItemToStorageSupport } from '../helpers/handleStorage';

// components
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const SetNewPassword = ({ route, navigation }) => {
	const { colors, dark } = useTheme();
	const { pin, email, userStatus } = route.params;

	// without params
	if (route.params === undefined) {
		navigation.goBack();
		return false;
	}

	const [formFields, setFormFields] = useState([
		{
			name: 'pin',
			value: pin,
			error: '',
			type: 'text',
			isRequired: true,
		},
		{
			name: 'email',
			value: email,
			error: '',
			type: 'email',
			isRequired: true,
		},
		{
			name: 'password',
			value: '',
			error: '',
			type: 'password',
			isRequired: true,
		},
		{
			name: 'passwordConfirm',
			value: '',
			error: '',
			type: 'password',
			isRequired: true,
			isEqual: 'password',
		},
	]);

	const validationForm = () => {
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

	//
	const submitNewPassword = async () => {
		const isValid = validationForm();

		if (isValid) {
			await submitNewPasswordUser(
				formFields[0].value,
				formFields[1].value,
				formFields[2].value,
				formFields[3].value
			).then((responseNewPassword) => {
				if (responseNewPassword.data.status === 1) {
					Alert.alert(
						'Senha atualizada',
						'Sua senha foi atualizada com sucesso!'
					);
					writeItemToStorageSupport({ recovery_email: null }).then(
						(response) => {
							setFormFields([
								{
									name: 'pin',
									value: '',
								},
								{
									name: 'email',
									value: '',
								},
								{
									name: 'password',
									value: '',
								},
								{
									name: 'passwordConfirm',
									value: '',
								},
							]);

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
						}
					);
				} else {
					Alert.alert('Ops!', responseNewPassword.data.message);
				}
			});
		}
	};

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
						label='Password'
						name={formFields[2].name}
						error={formFields[2].error}
						darkTheme={dark ? true : false}
						placeholder='******'
						secureTextEntry={true}
						handleInputForm={handleChange}
						value={formFields[2].value}
					/>

					<TextInputGroup
						label='Confirm Password'
						name={formFields[3].name}
						error={formFields[3].error}
						darkTheme={dark ? true : false}
						placeholder='******'
						secureTextEntry={true}
						handleInputForm={handleChange}
						value={formFields[3].value}
					/>
				</View>
				<CustomButtons title='CONFIRMAR PASSWORD' onPress={submitNewPassword} />
			</View>

			<StatusBar
				barStyle={dark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.card}
			/>
		</SafeAreaView>
	);
};

export default SetNewPassword;

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
