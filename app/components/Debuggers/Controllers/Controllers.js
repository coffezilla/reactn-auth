import { View, Text, Button } from 'react-native';
import { submitLoginUser, submitLogoutUser } from '../../../Api/authHandle';
import { useDispatch } from 'react-redux';

// redux
import { actSetLogin, actSetLogout } from '../../../redux/ducks/User';

// rest
import { getAuth } from '../../../Api/authHandle';

// localstorage
import {
	readItemFromStorage,
	writeItemToStorage,
	clearAllFromStorage,
} from '../../../helpers/handleStorage';

//
const Controllers = () => {
	const dispatch = useDispatch();

	const form = {
		email: 'renato@gmail.com',
		password: '123123',
	};

	// login user
	const submitLogin = async () => {
		await submitLoginUser(form.email, form.password).then((responseLogin) => {
			if (responseLogin.data.status === 1) {
				getAuth(form.email)
					.then((resAuth) => {
						if (resAuth.data.status === 1) {
							writeItemToStorage(resAuth.data).then((response) => {
								dispatch(actSetLogin());
							});
						} else {
							console.log('Erro auth');
						}
					})
					.catch((error) => {
						console.log('Erro auth, try again');
					});
			} else {
				dispatch(actSetLogout());
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

	const cleanStorage = async () => {
		await clearAllFromStorage().then((responseClean) => {
			// recreate new token
		});
	};

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<View style={{ padding: 3, flex: 1 }}>
				<Button title='LOGIN' onPress={submitLogin} />
			</View>
			<View style={{ padding: 3, flex: 1 }}>
				<Button title='LOGOUT' onPress={submitLogout} />
			</View>
			<View style={{ padding: 3, flex: 1 }}>
				<Button title='CLEAR STR' onPress={cleanStorage} />
			</View>
		</View>
	);
};

export default Controllers;
