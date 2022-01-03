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
	checkCurrentPassword,
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

const StartChangePassword = ({ navigation }) => {
	const [emailRecovery, setEmailRecovery] = useState(false);
	const [form, setForm] = useState({
		currentPassword: '',
	});

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	const submitConfirmPassword = async () => {
		await checkCurrentPassword(form.currentPassword).then(
			(responseCurrentPassword) => {
				if (responseCurrentPassword.data.status === 1) {
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
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				{/* <Text>Start Change password</Text>
				<View
					style={{
						backgroundColor: 'white',
						marginBottom: 10,
						borderWidth: 1,
					}}
				> */}
				{/* <Text>Adicionar password atual</Text> */}
				{/* <View> */}
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<FormSampleInputText
						inputLabel='Senha atual'
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('currentPassword', text)}
						value={form.currentPassword}
					/>
				</View>
				{/* </View> */}
				{/* <View style={{ padding: 3 }}> */}
				<CustomButtons
					title='CONFIRMAR SENHA'
					onPress={submitConfirmPassword}
				/>
				{/* <Button title='CONFIRMAR PASSWORD' onPress={submitConfirmPassword} /> */}
				{/* </View> */}
				{/* </View> */}
			</View>
		</View>
	);
};

export default StartChangePassword;

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
