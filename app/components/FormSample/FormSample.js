import { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	Button,
	Alert,
	TextInput,
} from 'react-native';

export const FormSampleInputText = ({ ...props }) => {
	const { inputLabel, inputStyle } = props;
	return (
		<View>
			{inputLabel && <Text style={customStyles.label}>{inputLabel}</Text>}
			<TextInput style={[customStyles.inputText, inputStyle]} {...props} />
		</View>
	);
};

export const FormSampleInputReadOnly = ({ ...props }) => {
	const { inputLabel, inputStyle, value } = props;
	return (
		<View>
			{inputLabel && <Text style={customStyles.label}>{inputLabel}</Text>}
			<Text style={[customStyles.inputTextRead, inputStyle]} {...props}>
				{value}
			</Text>
		</View>
	);
};

const customStyles = StyleSheet.create({
	inputText: {
		borderColor: '#979797',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		fontSize: 18,
		height: 45,
		marginBottom: 15,
	},
	inputTextRead: {
		// borderColor: '#979797',
		backgroundColor: '#F5F5F5',
		lineHeight: 50,
		// borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		fontSize: 18,
		height: 45,
		marginBottom: 15,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 5,
	},
});
