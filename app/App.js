import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	TransitionPresets,
	CardStyleInterpolators,
} from '@react-navigation/stack';

// icon
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import Preference from './screens/Preference';
import UserEdit from './screens/UserEdit';
import UserDelete from './screens/UserDelete';
import Login from './screens/Login';
import Signup from './screens/Signup';
import SetNewPassword from './screens/SetNewPassword';
import StartForgotPassword from './screens/StartForgotPassword';
import StartChangePassword from './screens/StartChangePassword';

const Routers = ({ navigation }) => {
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

	const headerTitleStyleCustom = {
		headerTitleStyle: {
			marginLeft: Platform.OS === 'ios' ? 0 : -14,
		},
	};

	return (
		<Stack.Navigator>
			{RdxStatus === 'LOGGED' ? (
				<>
					<Stack.Screen
						name='Hub'
						component={Hub}
						options={{
							...TransitionPresets.SlideFromRightIOS,
							headerStyle: {
								elevation: 0,
								shadowOpacity: 0,
							},
							headerRight: () => {
								return (
									<TouchableOpacity
										onPress={() => navigation.navigate('Preference')}
										style={styles.headerIconRight}
									>
										<Ionicons
											name='settings-outline'
											type='Ionicons'
											style={[styles.headerIconStyle, { fontSize: 22 }]}
										/>
									</TouchableOpacity>
								);
							},
						}}
					/>
					<Stack.Screen
						name='UserEdit'
						component={UserEdit}
						options={{
							title: 'UserEdit',
							...TransitionPresets.SlideFromRightIOS,
							...headerTitleStyleCustom,
						}}
					/>
					<Stack.Screen
						name='UserDelete'
						component={UserDelete}
						options={{
							title: 'UserDelete',
							...TransitionPresets.SlideFromRightIOS,
							...headerTitleStyleCustom,
						}}
					/>
					<Stack.Screen
						name='Preference'
						component={Preference}
						options={{
							title: 'Preference',
							...TransitionPresets.SlideFromRightIOS,
							...headerTitleStyleCustom,
							headerRight: () => {
								return (
									<TouchableOpacity
										onPress={() => navigation.navigate('About')}
										style={styles.headerIconRight}
									>
										<Ionicons
											name='information-circle-outline'
											type='Ionicons'
											style={styles.headerIconStyle}
										/>
									</TouchableOpacity>
								);
							},
						}}
					/>
					<Stack.Screen
						name='StartChangePassword'
						component={StartChangePassword}
						options={{
							title: 'StartChangePassword',
							...TransitionPresets.SlideFromRightIOS,
							...headerTitleStyleCustom,
						}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name='Login'
						component={Login}
						options={{
							cardStyleInterpolator: forFade,
							headerStyle: {
								elevation: 0,
								shadowOpacity: 0,
							},
							headerRight: () => {
								return (
									<TouchableOpacity
										onPress={() => navigation.navigate('About')}
										style={styles.headerIconRight}
									>
										<Ionicons
											name='information-circle-outline'
											type='Ionicons'
											style={styles.headerIconStyle}
										/>
									</TouchableOpacity>
								);
							},
						}}
					/>
					<Stack.Screen
						name='Signup'
						component={Signup}
						options={{
							title: 'Cadastrar',
							...TransitionPresets.SlideFromRightIOS,
							...headerTitleStyleCustom,
						}}
					/>
					<Stack.Screen
						name='StartForgotPassword'
						component={StartForgotPassword}
						options={{
							title: 'StartForgotPassword',
							...TransitionPresets.SlideFromRightIOS,
							...headerTitleStyleCustom,
						}}
					/>
				</>
			)}
			<Stack.Screen
				name='About'
				component={About}
				screenOptions={{ presentation: 'modal' }}
				options={{
					title: 'Sobre',
					cardStyleInterpolator:
						Platform.OS === 'ios'
							? CardStyleInterpolators.forModalPresentationIOS
							: CardStyleInterpolators.forRevealFromBottomAndroid,
					headerLeft: false,
					headerRight: () => {
						return (
							<TouchableOpacity
								onPress={() => navigation.goBack()}
								style={styles.headerIconRight}
							>
								<Ionicons
									name='chevron-down-outline'
									type='Ionicons'
									style={styles.headerIconStyle}
								/>
							</TouchableOpacity>
						);
					},
					// ...headerTitleStyleCustom,
				}}
			/>
			<Stack.Screen
				name='SetNewPassword'
				component={SetNewPassword}
				options={{
					title: 'SetNewPassword',
					...TransitionPresets.SlideFromRightIOS,
					...headerTitleStyleCustom,
				}}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Routers'
						component={Routers}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	headerIconRight: {
		aspectRatio: 1 / 1,
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		overflow: 'hidden',
		marginRight: 5,
	},
	headerIconStyle: {
		color: 'black',
		fontSize: 26,
	},
});
