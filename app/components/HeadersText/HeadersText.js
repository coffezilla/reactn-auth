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

export const HeadersText = ({ style, title = 'Title', size = 'H2' }) => {
	let titleSize = 10;
	if (size === 'H1') {
		titleSize = 22;
	}
	if (size === 'H2') {
		titleSize = 20;
	}
	if (size === 'H3') {
		titleSize = 18;
	}
	if (size === 'H4') {
		titleSize = 14;
	}

	return (
		<Text
			style={[
				{
					fontSize: titleSize,
				},
				customStyles.text,
			]}
		>
			{title}
		</Text>
	);
};

const customStyles = StyleSheet.create({
	text: {
		fontWeight: 'bold',
		marginBottom: 5,
	},
});
