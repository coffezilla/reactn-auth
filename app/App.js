import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionPresets } from '@react-navigation/stack';

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
	const RdxStatus = useSelector((state) => state.loginStatus);

	// get auth to make simple calls
	const getNewToken = async () => {
		await getAuth()
			.then((resAuth) => {
				if (resAuth.data.status === 1) {
					writeItemToStorage(resAuth.data).then((response) => {
						// set loading apenas depois de pegar um token
						setLoading(false);
					});
				} else {
					console.log('Erro auth');
					clearAllFromStorage();
					dispatch(actSetLogout());
				}
			})
			.catch((error) => {
				console.log('Erro auth, try again');
				clearAllFromStorage();
				dispatch(actSetLogout());
			});
	};

	// checking local storage for some token authentication or email login
	const getCurrentStorage = async () => {
		await readItemFromStorage().then((responseStorage) => {
			console.log('qual a boa', responseStorage);
			if (responseStorage === null) {
				// if has nothing it means:
				// not auth to make any requests
				// not logged to access privated content
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
					getNewToken();
				} else {
					checkAuth().then((responseCheckAuth) => {
						if (responseCheckAuth.data.status === 1) {
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

	// animation fade
	const forFade = ({ current }) => ({
		cardStyle: {
			// opacity: current.progress,
		},
	});

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{RdxStatus === 'LOGGED' ? (
					<Stack.Screen
						name='Hub'
						component={Hub}
						options={{
							cardStyleInterpolator: forFade,
						}}
					/>
				) : (
					<>
						<Stack.Screen
							name='Login'
							component={Login}
							options={{
								cardStyleInterpolator: forFade,
							}}
						/>
						<Stack.Screen
							name='Signup'
							component={Signup}
							options={{
								title: 'Cadastrar',
								...TransitionPresets.SlideFromRightIOS,
							}}
						/>
					</>
				)}
				<Stack.Screen
					name='About'
					component={About}
					options={{
						title: 'Sobre',
						...TransitionPresets.SlideFromRightIOS,
					}}
				/>
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
