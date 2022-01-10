import { useEffect, useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Alert,
	SafeAreaView,
	StatusBar,
} from 'react-native';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

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

// components
import {
	FormSampleInputText,
	FormSampleInputReadOnly,
} from '../components/FormSample';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

import { userEditData, getUserData } from '../Api/userHandle';

const UserEdit = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
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
			name: 'name',
			value: 'foo',
			error: '',
			type: 'text',
			isRequired: true,
		},
	]);

	// const [form, setForm] = useState({
	// 	name: '',
	// 	email: '',
	// });

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

	const submitEditUser = async () => {
		const isValid = validationForm();

		if (isValid) {
			await userEditData(formFields[1].value).then((responseEdit) => {
				if (responseEdit.data.status === 1) {
					navigation.goBack();
					Alert.alert(
						'Atualizado',
						'Seus dados foram atualizados com sucesso.'
					);
				} else {
					Alert.alert('Ops!', responseEdit.data.message);
				}
			});
		}
	};

	useEffect(async () => {
		// getting data
		await getUserData().then((responseData) => {
			if (responseData.data.status === 1) {
				setFormFields([
					{
						...formFields[0],
						value: responseData.data.user.email,
					},
					{
						...formFields[1],
						value: responseData.data.user.name,
					},
				]);

				setLoading(false);
			}
		});
	}, []);

	// const handleForm = (inputName, inputText) => {
	// 	setForm({
	// 		...form,
	// 		[inputName]: inputText,
	// 	});
	// };

	if (loading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<View>
					<TextInputGroupReadonly
						label='E-mail'
						value={formFields[0].value}
						darkTheme={dark ? true : false}
					/>

					<TextInputGroup
						label='Name'
						placeholder='Ex.: Carl John'
						name={formFields[1].name}
						error={formFields[1].error}
						handleInputForm={handleChange}
						darkTheme={dark ? true : false}
						keyboardType='default'
						value={formFields[1].value}
					/>

					{/* <FormSampleInputReadOnly inputLabel='E-mail' value={form.email} />

					<FormSampleInputText
						inputLabel='Nome'
						placeholder='Ex.: John Wayne'
						onChangeText={(text) => handleForm('name', text)}
						value={form.name}
					/> */}
				</View>

				<CustomButtons title='CONFIRMAR EDIÇÃO' onPress={submitEditUser} />
			</View>
		</SafeAreaView>
	);
};

export default UserEdit;

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
