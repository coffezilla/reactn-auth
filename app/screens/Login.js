import { useState } from 'react';
import {
	StyleSheet,
	View,
	Alert,
	SafeAreaView,
	StatusBar,
	Text,
} from 'react-native';
import { useDispatch } from 'react-redux';

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
import { submitLoginUser } from '../Api/authHandle';
// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';
// localstorage
import { writeItemToStorage } from '../helpers/handleStorage';

// components
// import { FormSampleInputText } from '../components/FormSample';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const Login = ({ navigation }) => {
	const dispatch = useDispatch();
	const { colors, dark } = useTheme();

	const [formFields, setFormFields] = useState([
		{
			name: 'email',
			value: 'foo@gmail.com',
			error: '',
			type: 'email',
			isRequired: true,
		},
		{
			name: 'password',
			value: '123123',
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

	// login user
	const submitLogin = async () => {
		const isValid = validationForm();

		if (isValid) {
			await submitLoginUser(formFields[0].value, formFields[1].value).then(
				(responseLogin) => {
					if (responseLogin.data.status === 1) {
						writeItemToStorage(responseLogin.data).then((response) => {
							dispatch(actSetLogin());
						});
					} else {
						dispatch(actSetLogout());
						Alert.alert('Ops!', responseLogin.data.message);
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

					<TextInputGroup
						label='Password'
						name={formFields[1].name}
						error={formFields[1].error}
						darkTheme={dark ? true : false}
						placeholder='******'
						secureTextEntry={true}
						handleInputForm={handleChange}
						value={formFields[1].value}
					/>

					{/* <Text>{JSON.stringify(formFields, null, 1)}</Text> */}

					<CustomButtons title='LOGIN' onPress={submitLogin} />
				</View>
				<View>
					<CustomButtons
						title='CADASTRAR NOVA CONTA'
						type='PRIMARY_CLEAN'
						darkTheme={dark}
						onPress={() => navigation.navigate('Signup')}
						style={{ marginBottom: 0 }}
					/>
					<CustomButtons
						title='ESQUECI MINHA SENHA'
						type='PRIMARY_CLEAN'
						darkTheme={dark}
						onPress={() => navigation.navigate('StartForgotPassword')}
						style={{ marginBottom: 0 }}
					/>
				</View>
			</View>
			<StatusBar
				barStyle={dark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.card}
			/>
		</SafeAreaView>
	);
};

export default Login;

// style
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		marginVertical: 17,
		marginHorizontal: 17,
		justifyContent: 'space-between',
		flex: 1,
	},
});
