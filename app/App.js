import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// nav
import { NavigationContainer } from '@react-navigation/native';

// stack
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// redux
import { Provider } from 'react-redux';
import { store } from './redux/ConfigStore';

// screens
import About from './screens/About';
import Hub from './screens/Hub';
import Login from './screens/Login';
import Signup from './screens/Signup';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='About' component={About} />
					<Stack.Screen name='Hub' component={Hub} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Signup' component={Signup} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
