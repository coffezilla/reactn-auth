import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert, SafeAreaView } from 'react-native';

import MenuDebugger from '../components/Debuggers/MenuDebugger';
import MsDebugger, {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

// components
import {
	FormSampleInputText,
	FormSampleInputReadOnly,
} from '../components/FormSample';
import { CustomButtons } from '../components/CustomButtons/CustomButtons';

import { userEditData, getUserData } from '../Api/userHandle';

const UserEdit = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({
		name: '',
		email: '',
	});

	const submitEditUser = async () => {
		await userEditData(form.name).then((responseEdit) => {
			if (responseEdit.data.status === 1) {
				Alert.alert('Atualizado', 'Seus dados foram atualizados com sucesso.');
			} else {
				Alert.alert('Ops!', responseEdit.data.message);
			}
		});
	};

	useEffect(async () => {
		// getting data
		await getUserData().then((responseData) => {
			if (responseData.data.status === 1) {
				setForm({
					name: responseData.data.user.name,
					email: responseData.data.user.email,
				});
				setLoading(false);
			}
		});
	}, []);

	const handleForm = (inputName, inputText) => {
		setForm({
			...form,
			[inputName]: inputText,
		});
	};

	if (loading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<View>
					<FormSampleInputReadOnly inputLabel='E-mail' value={form.email} />

					<FormSampleInputText
						inputLabel='Nome'
						placeholder='Ex.: John Wayne'
						onChangeText={(text) => handleForm('name', text)}
						value={form.name}
					/>
				</View>

				<CustomButtons title='CONFIRMAR EDIÇÃO' onPress={submitEditUser} />
			</View>
		</SafeAreaView>
	);
};

export default UserEdit;

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
