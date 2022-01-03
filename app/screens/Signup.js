import { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	Button,
	TextInput,
	Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';
// rest
import { getAuth, submitSignupUser } from '../Api/authHandle';
// localstorage
import { writeItemToStorage } from '../helpers/handleStorage';

// components
import { FormSampleInputText } from '../components/FormSample';
import { HeadersText } from '../components/HeadersText/HeadersText';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const Signup = () => {
	const dispatch = useDispatch();
	const RdxRoot = useSelector((state) => state);
	const [form, setForm] = useState({
		name: 'foo',
		email: 'foo@gmail.com',
		password: '123',
	});

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	// login user
	const submitSignup = async () => {
		await submitSignupUser(form.email, form.name, form.password).then(
			(responseSignup) => {
				if (responseSignup.data.status === 1) {
					getAuth(form.email)
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
			}
		);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.innerContainer}>
				<FormSampleInputText
					inputLabel='Nome'
					placeholder='Ex.: John Wayne'
					onChangeText={(text) => handleForm('name', text)}
					value={form.name}
				/>
				<FormSampleInputText
					inputLabel='E-mail'
					placeholder='Ex.: my@email.com'
					autoCapitalize='none'
					onChangeText={(text) => handleForm('email', text)}
					keyboardType='email-address'
					value={form.email}
				/>
				<FormSampleInputText
					inputLabel='Senha'
					secureTextEntry={true}
					placeholder='******'
					onChangeText={(text) => handleForm('password', text)}
					value={form.password}
				/>

				<CustomButtons title='CADASTRAR' onPress={submitSignup} />
			</View>
		</ScrollView>
	);
};

export default Signup;

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
