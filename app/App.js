import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// nav
import { NavigationContainer } from '@react-navigation/native';

// stack
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// rest
import { getAuth, checkAuth } from './Api/authHandle';

// redux
import { Provider } from 'react-redux';
import { store } from './redux/ConfigStore';
import { actSetLogin, actSetLogout } from './redux/ducks/User';

// localstorage
import {
	readItemFromStorage,
	writeItemToStorage,
	clearAllFromStorage,
} from './helpers/handleStorage';

// screens
import About from './screens/About';
import Hub from './screens/Hub';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Routers = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [hasToken, setHasToken] = useState(false); // can be used as loading instead
	// const [isLogged, setIsLogged] = useState(false);
	const RdxStatus = useSelector((state) => state.loginStatus);

	console.log('revoad ----------- ', RdxStatus);

	// get auth to make simple calls
	const getNewToken = async () => {
		console.log('constructor');
		await getAuth()
			.then((resAuth) => {
				console.log('authentication', resAuth);
				if (resAuth.data.status === 1) {
					writeItemToStorage(resAuth.data).then((response) => {
						console.log('ksjksdjfakdsf', response);
						// set loading apenas depois de pegar um token
						setHasToken(true);
						setLoading(false);
					});
				} else {
					console.log('Erro authz');
					clearAllFromStorage();
					dispatch(actSetLogout());
					// setIsLogged(false);
				}
			})
			.catch((error) => {
				console.log('Erro auth, try again');
				clearAllFromStorage();
				dispatch(actSetLogout());
				// setIsLogged(false);
			});
	};

	// checking local storage for some token authentication or email login
	const getCurrentStorage = async () => {
		await readItemFromStorage().then((responseStorage) => {
			if (responseStorage === null) {
				// if has nothing it means:
				// not auth to make any requests
				// not logged to access privated content
				// ROUTER: login
				console.log('no storage');
				getNewToken();
			} else {
				if (
					responseStorage.auth === undefined ||
					responseStorage.auth.timestamp === undefined ||
					responseStorage.auth.token === undefined
				) {
					console.log(
						'storage missing important data, cannot make requestes to the server'
					);
					// ROUTER: login
					getNewToken();
				} else {
					checkAuth(
						responseStorage.auth.email,
						responseStorage.auth.token,
						responseStorage.auth.timestamp
					).then((responseCheckAuth) => {
						console.log('checking auth');
						if (responseCheckAuth.data.status === 1) {
							console.log('authenticated');
							if (
								responseStorage.auth.email === undefined ||
								responseStorage.auth.email.length < 3
							) {
								dispatch(actSetLogout());
								console.log('has token: can make requests to the server');
							} else {
								dispatch(actSetLogin());
								console.log(
									'has token + logged: can make requests + access privated content'
								);
							}
							setHasToken(true);
							setLoading(false);
						} else {
							// not authenticated
							getNewToken();
						}
					});
				}
			}
		});
	};

	useEffect(() => {
		// clearAllFromStorage();
		// dispatch(actSetLogout());
		getCurrentStorage();
	}, []);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Checando Local Storage...</Text>
			</View>
		);
	}
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='About' component={About} />
				{RdxStatus === 'LOGGED' ? (
					<Stack.Screen name='Hub' component={Hub} />
				) : (
					<>
						<Stack.Screen name='Login' component={Login} />
						<Stack.Screen name='Signup' component={Signup} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<Routers />
		</Provider>
	);
}
