import { useState } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';

// rest
import { submitLoginUser } from '../Api/authHandle';
// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';
// localstorage
import { writeItemToStorage } from '../helpers/handleStorage';

// components
import { FormSampleInputText } from '../components/FormSample';
import { HeadersText } from '../components/HeadersText/HeadersText';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const Login = ({ navigation }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
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
	const submitLogin = async () => {
		await submitLoginUser(form.email, form.password).then((responseLogin) => {
			if (responseLogin.data.status === 1) {
				writeItemToStorage(responseLogin.data).then((response) => {
					dispatch(actSetLogin());
				});
			} else {
				dispatch(actSetLogout());
				Alert.alert('Ops!', responseLogin.data.message);
			}
		});
	};

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
						inputLabel='E-mail'
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/>
					<FormSampleInputText
						inputLabel='Password'
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('password', text)}
						value={form.password}
					/>
					<CustomButtons title='LOGIN' onPress={submitLogin} />
				</View>
				<View>
					<CustomButtons
						title='CADASTRAR NOVA CONTA'
						type='PRIMARY_CLEAN'
						onPress={() => navigation.navigate('Signup')}
						style={{ marginBottom: 0 }}
					/>
					<CustomButtons
						title='ESQUECI MINHA SENHA'
						type='PRIMARY_CLEAN'
						onPress={() => navigation.navigate('StartForgotPassword')}
						style={{ marginBottom: 0 }}
					/>
				</View>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	innerContainer: {
		marginVertical: 17,
		marginHorizontal: 17,
		justifyContent: 'space-between',
		flex: 1,
	},
});
