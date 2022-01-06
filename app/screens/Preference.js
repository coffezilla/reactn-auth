import { Text, StyleSheet, View, Alert, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Constants from 'expo-constants';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// redux
import { actSetLogout } from '../redux/ducks/User';

// rest
import { getAuth, submitLogoutUser } from '../Api/authHandle';

// localstorage
import {
	writeItemToStorage,
	clearAllFromStorage,
} from '../helpers/handleStorage';

// components
import { HeadersText } from '../components/HeadersText/HeadersText';
import { CustomButtonLink } from '../components/CustomButtons/CustomButtons';

const Preference = ({ navigation }) => {
	const RdxRoot = useSelector((state) => state);
	const dispatch = useDispatch();
	const ManifestVersion = Constants.manifest.version;
	const ManifestName = Constants.manifest.name;

	const promptLogout = () => {
		Alert.alert(
			'Sair da sessão?',
			'Desejar sair da sessão e deslogar de sua conta?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: submitLogout,
				},
			]
		);
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
					});
				} else {
					console.log('Erro auth');
				}
			})
			.catch((error) => {
				console.log('Erro auth, try again');
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<View
					style={{
						flex: 1,
					}}
				>
					<View style={styles.section}>
						<HeadersText title='Geral' />
						<CustomButtonLink
							title='Editar dados pessoais'
							onPress={() => navigation.navigate('UserEdit')}
						/>
					</View>
					<View style={styles.section}>
						<HeadersText title='Acessos' />
						<CustomButtonLink
							title='Alterar senha'
							onPress={() => navigation.navigate('StartChangePassword')}
						/>
						<CustomButtonLink title='Sair da sessão' onPress={promptLogout} />
					</View>
					<View style={styles.section}>
						<HeadersText title='Avançado' />
						<CustomButtonLink
							title='Deletar conta'
							type='DANGER'
							onPress={() => navigation.navigate('UserDelete')}
						/>
					</View>
				</View>
				<Text style={styles.footer}>
					({ManifestName}) {ManifestVersion}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Preference;

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
	section: {
		marginBottom: 20,
	},
	footer: {
		textAlign: 'center',
		fontSize: 14,
		color: 'gray',
	},
});
