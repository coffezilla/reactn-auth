import { useState } from 'react';
import {
	StyleSheet,
	View,
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

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// redux
import { actSetLogout } from '../redux/ducks/User';

// rest
import { getAuth, submitDeleteUser } from '../Api/authHandle';

// localstorage
import {
	writeItemToStorage,
	clearAllFromStorage,
} from '../helpers/handleStorage';

// components
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const UserDelete = () => {
	const { colors, dark } = useTheme();

	const [formFields, setFormFields] = useState([
		{
			name: 'email',
			value: '',
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

	// const RdxRoot = useSelector((state) => state);
	const dispatch = useDispatch();

	// login user
	const submitDelete = async () => {
		const isValid = validationForm();

		if (isValid) {
			await submitDeleteUser(formFields[0].value, formFields[1].value).then(
				(responseDelete) => {
					if (responseDelete.data.status === 1) {
						Alert.alert(
							'Conta deletada',
							'Sua conta foi deletada com sucesso. Não é possível recuperá-la novamente.'
						);

						dispatch(actSetLogout());
						clearAllFromStorage();
						getAuth()
							.then((resAuth) => {
								if (resAuth.data.status === 1) {
									writeItemToStorage(resAuth.data).then((response) => {
										// set loading apenas depois de pegar um token
									});
								} else {
									console.log('Erro auth');
								}
							})
							.catch((error) => {
								console.log('Erro auth, try again');
							});
					} else {
						Alert.alert('Ops!', responseDelete.data.message);
					}
				}
			);
		}
	};

	const promptDeleteAccout = () => {
		const isValid = validationForm();
		if (isValid) {
			Alert.alert(
				'Deletar conta?',
				'Pressione OK para confirmar a exclusão definitiva desta conta. Esta operação não pode ser desfeita.',
				[
					{
						text: 'Cancelar',
						style: 'cancel',
					},
					{ text: 'OK', onPress: submitDelete },
				]
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
				</View>
				<CustomButtons
					title='DELETAR CONTA'
					type='DANGER'
					onPress={promptDeleteAccout}
				/>
			</View>
			<StatusBar
				barStyle={dark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.card}
			/>
		</SafeAreaView>
	);
};

export default UserDelete;

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
