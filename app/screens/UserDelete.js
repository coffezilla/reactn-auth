import { useState } from 'react';
import { StyleSheet, View, Alert, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

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
import { FormSampleInputText } from '../components/FormSample';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

const UserDelete = () => {
	const [form, setForm] = useState({
		email: 'foo@gmail.com',
		password: '123',
	});

	const RdxRoot = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	// login user
	const submitDelete = async () => {
		await submitDeleteUser(form.email, form.password).then((responseDelete) => {
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
		});
	};

	const promptDeleteAccout = () => {
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
						inputLabel='E-mail'
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/>

					<FormSampleInputText
						inputLabel='Senha'
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('password', text)}
						value={form.password}
					/>
				</View>
				<CustomButtons
					title='DELETAR CONTA'
					type='DANGER'
					onPress={promptDeleteAccout}
				/>
			</View>
		</SafeAreaView>
	);
};

export default UserDelete;

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
