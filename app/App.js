import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// nav
import { NavigationContainer } from '@react-navigation/native';

// stack
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// screens
import About from './screens/About';
import Hub from './screens/Hub';
import Login from './screens/Login';
import Signup from './screens/Signup';

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='About' component={About} />
				<Stack.Screen name='Hub' component={Hub} />
				<Stack.Screen name='Login' component={Login} />
				<Stack.Screen name='Signup' component={Signup} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
