import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';

// rest
import { checkCurrentPassword } from '../Api/authHandle';

// components
import { FormSampleInputText } from '../components/FormSample';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const StartChangePassword = ({ navigation }) => {
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
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
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
				<CustomButtons
					title='CONFIRMAR SENHA'
					onPress={submitConfirmPassword}
				/>
			</View>
		</SafeAreaView>
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
