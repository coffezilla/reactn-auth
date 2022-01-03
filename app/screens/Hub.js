import { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	Button,
	TextInput,
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

const Hub = () => {
	const [form, setForm] = useState({
		email: 'foo@gmail.com',
		password: '123',
	});
	const [formPassword, setFormPassword] = useState({
		currentPassword: '123',
		newPassword: '222',
		newPasswordConfirm: '222',
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
			console.log('game', responseDelete);
			if (responseDelete.data.status === 1) {
				console.log('conta deletada');
				dispatch(actSetLogout());
				clearAllFromStorage();
				getAuth()
					.then((resAuth) => {
						if (resAuth.data.status === 1) {
							writeItemToStorage(resAuth.data).then((response) => {
								// set loading apenas depois de pegar um token
								// setHasToken(true);
								// setLoading(false);
							});
						} else {
							console.log('Erro auth');
						}
					})
					.catch((error) => {
						console.log('Erro auth, try again');
					});
			} else {
				alert(responseDelete.data.message);
			}
		});
	};

	// loggout user
	const submitLogout = async () => {
		await submitLogoutUser().then((responseLogout) => {
			clearAllFromStorage();
			dispatch(actSetLogout());
		});

		await getAuth()
			.then((resAuth) => {
				if (resAuth.data.status === 1) {
					writeItemToStorage(resAuth.data).then((response) => {
						// set loading apenas depois de pegar um token
						// setHasToken(true);
						// setLoading(false);
					});
				} else {
					console.log('Erro auth');
				}
			})
			.catch((error) => {
				console.log('Erro auth, try again');
			});
	};

	//
	const submitNewPassword = async () => {
		alert('Saudade');
	};

	return (
		<ScrollView style={styles.container}>
			<MenuDebugger />
			<MsDebugger name='delete' value={form} />
			{/* <MsDebuggerRedux /> */}
			{/* <MsDebuggerLocalStorage /> */}
			<View>
				<Text>LOGIN</Text>
				<View style={{ padding: 3, flex: 1 }}>
					<Button title='LOGOUT' onPress={submitLogout} />
				</View>
			</View>
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
					<Button title='DELETAR' onPress={submitDelete} />
				</View>
			</View>
			{/* <View
				style={{
					borderWidth: 1,
					backgroundColor: 'orange',
				}}
			>
				<Text>Alterar senha</Text>
				<View>
					<Text>Password atual</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('currentPassword', text)}
						value={formPassword.currentPassword}
					/>
				</View>
				<View>
					<Text>Novo</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('newPassword', text)}
						value={formPassword.newPassword}
					/>
				</View>
				<View>
					<Text>Confirmar</Text>
					<TextInput
						style={styles.input}
						placeholder='******'
						secureTextEntry={true}
						onChangeText={(text) => handleForm('newPasswordConfirm', text)}
						value={formPassword.newPasswordConfirm}
					/>
				</View>
				<View style={{ padding: 3, flex: 1 }}>
					<Button title='ATUALIZAR PASSWORD' onPress={submitNewPassword} />
				</View>
			</View> */}
		</ScrollView>
	);
};

export default Hub;

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
