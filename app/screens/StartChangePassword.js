import { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	SafeAreaView,
	StatusBar,
	Text,
} from 'react-native';

// rest
import { checkCurrentPassword } from '../Api/authHandle';

import { useTheme } from '@react-navigation/native';

// form
import { validateForm } from '../components/FormValidation';
import { TextInputGroup } from '../components/FormInputs';

// components
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const StartChangePassword = ({ navigation }) => {
	const { colors, dark } = useTheme();

	const [formFields, setFormFields] = useState([
		{
			name: 'password',
			value: '',
			error: '',
			type: 'password',
			isRequired: true,
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

	const submitConfirmPassword = async () => {
		const isValid = validationForm();

		if (isValid) {
			await checkCurrentPassword(formFields[0].value).then(
				(responseCurrentPassword) => {
					if (responseCurrentPassword.data.status === 1) {
						setFormFields([
							{
								name: 'password',
								value: '',
							},
						]);

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
						name={formFields[0].name}
						error={formFields[0].error}
						darkTheme={dark ? true : false}
						placeholder='******'
						secureTextEntry={true}
						handleInputForm={handleChange}
						value={formFields[0].value}
					/>
				</View>
				<CustomButtons
					title='CONFIRMAR SENHA'
					onPress={submitConfirmPassword}
				/>
			</View>
			<StatusBar
				barStyle={dark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.card}
			/>
		</SafeAreaView>
	);
};

export default StartChangePassword;

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
