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

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// redux
import { actSetLogin, actSetLogout } from '../redux/ducks/User';

// rest
import {
	getAuth,
	submitLoginUser,
	submitLogoutUser,
	submitDeleteUser,
} from '../Api/authHandle';

// localstorage
import {
	readItemFromStorage,
	writeItemToStorage,
	clearAllFromStorage,
} from '../helpers/handleStorage';

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

	const askDeleteAccout = () => {
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
		<ScrollView style={styles.container}>
			<MenuDebugger />
			<MsDebugger name='delete' value={form} />
			{/* <MsDebuggerRedux /> */}
			{/* <MsDebuggerLocalStorage /> */}

			<View
				style={{
					borderWidth: 1,
					backgroundColor: 'yellow',
				}}
			>
				<Text>Deletar perfil</Text>
				<View>
					<Text>Email</Text>
					<TextInput
						style={styles.input}
						placeholder='Ex.: my@email.com'
						onChangeText={(text) => handleForm('email', text)}
						keyboardType='email-address'
						autoCapitalize='none'
						value={form.email}
					/>
				</View>
				<View>
					<Text>Password</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('password', text)}
						value={form.password}
					/>
				</View>
				<View style={{ padding: 3, flex: 1 }}>
					<Button title='DELETAR' onPress={askDeleteAccout} />
				</View>
			</View>
		</ScrollView>
	);
};

export default UserDelete;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	input: {
		borderWidth: 1,
		height: 40,
		marginBottom: 3,
	},
});
