import { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export const CustomButtons = ({
	style,
	title = 'BUTTON',
	onPress = null,
	type = 'PRIMARY',
}) => {
	// check if is pressed to tint the text inside pressable
	const [buttonPressed, setButtonPressed] = useState(false);

	return (
		<Pressable
			onPress={onPress}
			onPressIn={() => setButtonPressed(true)}
			onPressOut={() => setButtonPressed(false)}
			style={({ pressed }) => [
				customStyles.buttonDefault,

				type === 'PRIMARY' &&
					(pressed ? customStyles.primaryPressed : customStyles.primaryDefault),

				type === 'DANGER' &&
					(pressed ? customStyles.dangerPressed : customStyles.dangerDefault),

				type === 'PRIMARY_CLEAN' &&
					(pressed ? customStyles.cleanPressed : customStyles.cleanDefault),

				type === 'PRIMARY_EMPTY' &&
					(pressed
						? customStyles.primaryEmptyPressed
						: customStyles.primaryEmptyDefault),

				type === 'DANGER_CLEAN' &&
					(pressed ? customStyles.cleanPressed : customStyles.cleanDefault),

				type === 'DANGER_EMPTY' &&
					(pressed
						? customStyles.dangerEmptyPressed
						: customStyles.dangerEmptyDefault),

				style,
			]}
		>
			<Text
				style={[
					customStyles.text,
					type === 'PRIMARY_EMPTY' &&
						(buttonPressed ? { color: 'white' } : { color: '#049BFF' }),
					type === 'DANGER_EMPTY' &&
						(buttonPressed ? { color: 'white' } : { color: '#FF234A' }),
					type === 'PRIMARY_CLEAN' && { color: '#049BFF', fontSize: 14 },
					type === 'DANGER_CLEAN' && { color: '#FF234A', fontSize: 14 },
				]}
				numberOfLines={1}
			>
				{title}
			</Text>
		</Pressable>
	);
};

// link
export const CustomButtonLink = ({
	style,
	title = 'BUTTON',
	onPress = null,
	type = 'PRIMARY',
}) => {
	// check if is pressed to tint the text inside pressable
	const [buttonPressed, setButtonPressed] = useState(false);

	return (
		<Pressable
			onPress={onPress}
			onPressIn={() => setButtonPressed(true)}
			onPressOut={() => setButtonPressed(false)}
			style={({ pressed }) => [
				customStyles.linkDefault,

				type === 'PRIMARY' &&
					(pressed
						? customStyles.primaryLinkPressed
						: customStyles.primaryLinkDefault),

				type === 'DANGER' &&
					(pressed
						? customStyles.dangerLinkPressed
						: customStyles.dangerLinkDefault),

				style,
			]}
		>
			<Text
				style={[
					customStyles.linkText,
					type === 'PRIMARY' && { color: '#049BFF' },
					type === 'DANGER' && { color: '#FF234A' },
				]}
				numberOfLines={1}
			>
				{title}
			</Text>
		</Pressable>
	);
};

const customStyles = StyleSheet.create({
	buttonDefault: {
		borderRadius: 8,
		height: 40,
		padding: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	linkDefault: {
		height: 45,
		padding: 0,
		justifyContent: 'center',
	},

	// primary
	primaryDefault: {
		elevation: 1,
		backgroundColor: '#049BFF',
	},
	primaryPressed: {
		elevation: 1,
		backgroundColor: '#0091F2',
	},
	primaryEmptyDefault: {
		elevation: 1,
		borderWidth: 1,
		borderColor: '#049BFF',
	},
	primaryEmptyPressed: {
		elevation: 1,
		backgroundColor: '#049BFF',
	},

	// primary link
	primaryLinkDefault: {
		// elevation: 1,
		backgroundColor: 'white',
	},
	primaryLinkPressed: {
		// elevation: 1,
		backgroundColor: '#F5F3F3',
	},

	// danger
	dangerDefault: {
		elevation: 1,
		backgroundColor: '#FF234A',
	},
	dangerPressed: {
		elevation: 1,
		backgroundColor: '#EB1D42',
	},
	dangerEmptyDefault: {
		elevation: 1,
		borderWidth: 1,
		borderColor: '#FF234A',
	},
	dangerEmptyPressed: {
		elevation: 1,
		backgroundColor: '#FF234A',
	},

	// danger link
	dangerLinkDefault: {
		// elevation: 1,
		backgroundColor: 'white',
	},
	dangerLinkPressed: {
		// elevation: 1,
		backgroundColor: '#F5F3F3',
	},

	// clean
	cleanDefault: {
		backgroundColor: 'transparent',
	},
	cleanPressed: {
		backgroundColor: '#F5F3F3',
	},

	// text
	text: {
		fontSize: 16,
		fontWeight: 'normal',
		color: 'white',
	},

	// text
	linkText: {
		fontSize: 18,
		// fontWeight: 'bold',
		color: 'white',
	},
});
