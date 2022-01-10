import { useState } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Alert,
	SafeAreaView,
	StatusBar,
	Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '@react-navigation/native';

// form
import { validateForm } from '../components/FormValidation';
import { TextInputGroup } from '../components/FormInputs';

// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';
// rest
import { getAuth, submitSignupUser } from '../Api/authHandle';
// localstorage
import { writeItemToStorage } from '../helpers/handleStorage';

// components
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const Signup = () => {
	const dispatch = useDispatch();
	const { colors, dark } = useTheme();

	const [formFields, setFormFields] = useState([
		{
			name: 'name',
			value: 'foo',
			error: '',
			type: 'text',
			isRequired: true,
		},
		{
			name: 'email',
			value: 'foo@gmail.com',
			error: '',
			type: 'email',
			isRequired: true,
		},
		{
			name: 'password',
			value: '123',
			error: '',
			type: 'password',
			isRequired: true,
		},
		{
			name: 'passwordConfirm',
			value: '123',
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

	// login user
	const submitSignup = async () => {
		const isValid = validationForm();

		if (isValid) {
			await submitSignupUser(
				formFields[1].value,
				formFields[0].value,
				formFields[2].value
			).then((responseSignup) => {
				if (responseSignup.data.status === 1) {
					getAuth(formFields[1].value.email)
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
					Alert.alert('Ops!', responseSignup.data.message);
				}
			});
		}
	};

	return (
		<ScrollView style={styles.container}>
			<SafeAreaView>
				<View style={styles.innerContainer}>
					<TextInputGroup
						label='Name'
						placeholder='Ex.: Carl John'
						name={formFields[0].name}
						error={formFields[0].error}
						handleInputForm={handleChange}
						darkTheme={dark ? true : false}
						keyboardType='default'
						value={formFields[0].value}
					/>

					<TextInputGroup
						label='E-mail'
						placeholder='Ex.: my@email.com'
						name={formFields[1].name}
						error={formFields[1].error}
						darkTheme={dark ? true : false}
						handleInputForm={handleChange}
						keyboardType='email-address'
						autoCapitalize='none'
						value={formFields[1].value}
					/>

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

					<CustomButtons title='CADASTRAR' onPress={submitSignup} />
				</View>

				<StatusBar
					barStyle={dark ? 'light-content' : 'dark-content'}
					backgroundColor={colors.card}
				/>
			</SafeAreaView>
		</ScrollView>
	);
};

export default Signup;

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
