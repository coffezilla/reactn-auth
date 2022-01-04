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

export const FormSampleInputText = ({ style, ...props }) => {
	const { inputLabel } = props;
	return (
		<View>
			{inputLabel && <Text style={customStyles.label}>{inputLabel}</Text>}
			<TextInput style={[customStyles.inputText, style]} {...props} />
		</View>
	);
};

export const FormSampleInputReadOnly = ({ style, ...props }) => {
	const { inputLabel, value } = props;
	return (
		<View>
			{inputLabel && <Text style={customStyles.label}>{inputLabel}</Text>}
			<Text style={[customStyles.inputTextRead, style]} {...props}>
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
		height: 40,
		marginBottom: 15,
	},
	inputTextRead: {
		// borderColor: '#979797',
		backgroundColor: '#F5F5F5',
		lineHeight: 40,
		// borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		fontSize: 18,
		height: 40,
		marginBottom: 15,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 5,
	},
});
