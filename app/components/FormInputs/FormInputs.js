import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	Pressable,
	Switch,
	SafeAreaView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { formStyles, formStylesColors } from './FormInputsTheme.js';

/*
Form input options
RadioInput: raw radiobox box
CheckInput: raw checkbox
RadioInputGroup: radiobox input with style
CheckInputGroup: checkbox input with style
SwitchInputGroup: switch input with style
TextInputGroup: input text with style
- text
- message area
- password
- phone
- email
FileInputGroup: input file to access Gallery / Camera


*/
// export const FileInputGroup = ({ style, ...props }) => {
// 	const { inputLabel, value } = props;
// 	return (
// 		<View>
// 			{inputLabel && <Text style={customformStyles.label}>{inputLabel}</Text>}
// 			<Text style={[customformStyles.inputTextRead, style]} {...props}>
// 				{value}
// 			</Text>
// 		</View>
// 	);
// };

// textarea
export const TextareaInputGroup = ({
	style,
	label,
	name,
	error,
	handleInputForm,
	darkTheme = false,
	params = {},
	...props
}) => {
	return (
		<View>
			{label && (
				<Text
					style={[
						formStyles.labelTop,
						{
							color: darkTheme
								? formStylesColors.dark.text
								: formStylesColors.default.text,
						},
					]}
				>
					{label}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</Text>
			)}
			<TextInput
				style={[
					formStyles.textareaInput,
					style,
					{
						backgroundColor: darkTheme
							? formStylesColors.dark.backgroundInput
							: formStylesColors.default.backgroundInput,
						color: darkTheme
							? formStylesColors.dark.text
							: formStylesColors.default.text,
						borderColor: darkTheme
							? formStylesColors.dark.textInputBorder
							: formStylesColors.default.textInputBorder,
					},
					error && formStyles.inputTextError,
				]}
				{...props}
				placeholderTextColor={
					darkTheme
						? formStylesColors.dark.placeholder
						: formStylesColors.default.placeholder
				}
				onChangeText={(value) => handleInputForm(value, name, params)}
			/>
		</View>
	);
};

// read only
export const TextInputGroupReadonly = ({
	style,
	label,
	name,
	value,
	error,
	darkTheme = false,
	params = {},
	...props
}) => {
	return (
		<View>
			{label && (
				<Text
					style={[
						formStyles.labelTop,
						{
							color: darkTheme
								? formStylesColors.dark.text
								: formStylesColors.default.text,
						},
					]}
				>
					{label}
				</Text>
			)}
			<Text
				style={[
					formStyles.inputTextReadOnly,
					style,
					{
						backgroundColor: darkTheme
							? formStylesColors.dark.backgroundWrap
							: formStylesColors.default.backgroundWrap,
						color: darkTheme
							? formStylesColors.dark.text
							: formStylesColors.default.text,
					},
				]}
				{...props}
			>
				{value}
			</Text>
		</View>
	);
};

export const TextInputGroup = ({
	mask = false,
	style,
	label,
	name,
	error,
	handleInputForm,
	darkTheme = false,
	params = {},
	...props
}) => {
	const handleMaskText = (value, name, params = {}) => {
		let currentVal = value;

		if (mask === 'NUMBER') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
		}

		if (mask === 'PHONE') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
			currentVal = currentVal.replace(/^(\d\d)(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos

			// check digit 9
			if (currentVal.length > 13) {
				currentVal = currentVal.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
			} else {
				currentVal = currentVal.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
			}
		}

		if (mask === 'CEP') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
			currentVal = currentVal.replace(/^(\d{5})(\d)/, '$1-$2'); //Esse é tão fácil que não merece explicações
		}

		if (mask === 'CPF') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
			currentVal = currentVal.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
			currentVal = currentVal.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
			currentVal = currentVal.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
		}

		handleInputForm(currentVal, name, params);
	};

	return (
		<View>
			{label && (
				<Text
					style={[
						formStyles.labelTop,
						{
							color: darkTheme
								? formStylesColors.dark.text
								: formStylesColors.default.text,
						},
					]}
				>
					{label}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</Text>
			)}
			<TextInput
				style={[
					formStyles.inputText,
					style,
					{
						backgroundColor: darkTheme
							? formStylesColors.dark.backgroundInput
							: formStylesColors.default.backgroundInput,
						color: darkTheme
							? formStylesColors.dark.text
							: formStylesColors.default.text,
						borderColor: darkTheme
							? formStylesColors.dark.textInputBorder
							: formStylesColors.default.textInputBorder,
					},
					error && formStyles.inputTextError,
				]}
				{...props}
				placeholderTextColor={
					darkTheme
						? formStylesColors.dark.placeholder
						: formStylesColors.default.placeholder
				}
				onChangeText={(value) =>
					mask
						? handleMaskText(value, name, params)
						: handleInputForm(value, name, params)
				}
			/>
		</View>
	);
};

export const SwitchInputGroup = ({
	label,
	labelHeader,
	name,
	value,
	error,
	handleInputForm,
	darkTheme = false,
	params = {},
}) => {
	return (
		<>
			<Text
				style={[
					formStyles.labelTop,
					{
						color: darkTheme
							? formStylesColors.dark.text
							: formStylesColors.default.text,
					},
				]}
			>
				<>
					{labelHeader}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</>
			</Text>

			<View
				style={[
					formStyles.SwitchInputGroup,
					{
						backgroundColor: darkTheme
							? formStylesColors.dark.backgroundWrap
							: formStylesColors.default.backgroundWrap,
					},
					error && formStyles.inputTextError,
				]}
			>
				<Text
					style={[
						formStyles.inlineLabel,
						{
							color: darkTheme
								? formStylesColors.dark.text
								: formStylesColors.default.text,
						},
					]}
				>
					{label}
				</Text>
				<Switch
					trackColor={{
						false: darkTheme
							? formStylesColors.dark.trackColorFalse
							: formStylesColors.default.trackColorFalse,
						true: darkTheme
							? formStylesColors.dark.trackColorTrue
							: formStylesColors.default.trackColorTrue,
					}}
					thumbColor={
						value
							? darkTheme
								? formStylesColors.dark.trackThumbColor
								: formStylesColors.default.trackThumbColor
							: darkTheme
							? formStylesColors.dark.trackThumbColor
							: formStylesColors.default.trackThumbColor
					}
					ios_backgroundColor={
						darkTheme
							? formStylesColors.dark.trackTBgIos
							: formStylesColors.default.trackTBgIos
					}
					onValueChange={() => handleInputForm(value, name, params, true)}
					value={value}
				/>
			</View>
		</>
	);
};

export const CheckInputGroup = ({
	label,
	labelHeader,
	name,
	value,
	error,
	handleInputForm,
	darkTheme = false,
	params = {},
}) => {
	return (
		<>
			<Text
				style={[
					formStyles.labelTop,
					{
						color: darkTheme
							? formStylesColors.dark.text
							: formStylesColors.default.text,
					},
				]}
			>
				{labelHeader}{' '}
				{error && (
					<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
				)}
			</Text>

			<View
				style={[
					formStyles.checkInputGroupWrap,
					{
						backgroundColor: darkTheme
							? formStylesColors.dark.backgroundWrap
							: formStylesColors.default.backgroundWrap,
					},
					error && formStyles.inputTextError,
				]}
			>
				<Pressable
					onPress={() => handleInputForm(value, name, params, true)}
					style={formStyles.checkInputGroupTouchable}
				>
					<CheckInput
						value={value}
						style={{ marginRight: 10 }}
						darkTheme={darkTheme}
						onPress={() => handleInputForm(value, name, params, true)}
					/>
					<Text
						style={[
							formStyles.inlineLabel,
							{
								color: darkTheme
									? formStylesColors.dark.text
									: formStylesColors.default.text,
							},
						]}
					>
						{label}
					</Text>
				</Pressable>
			</View>
		</>
	);
};

// group all radios
export const RadioInputGroupWrapper = ({
	label,
	error,
	children,
	darkTheme = false,
}) => {
	return (
		<View>
			<Text
				style={[
					formStyles.labelTop,
					{
						color: darkTheme
							? formStylesColors.dark.text
							: formStylesColors.default.text,
					},
				]}
			>
				<>
					{label}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</>
			</Text>
			{children}
		</View>
	);
};
//
export const RadioInputGroup = ({
	label,
	name,
	value,
	group,
	error,
	handleInputForm,
	darkTheme = false,
	params = {},
	style,
}) => {
	return (
		<>
			<View
				style={[
					formStyles.checkInputGroupWrap,
					{
						backgroundColor: darkTheme
							? formStylesColors.dark.backgroundWrap
							: formStylesColors.default.backgroundWrap,
					},
					style,
					error && formStyles.inputTextError,
				]}
			>
				<Pressable
					onPress={() => handleInputForm(name, group, params)}
					style={[formStyles.checkInputGroupTouchable]}
				>
					<RadioInput
						value={value}
						name={name}
						darkTheme={darkTheme}
						style={{ marginRight: 7 }}
						onPress={() => handleInputForm(name, group, params)}
					/>

					<Text
						style={[
							formStyles.inlineLabel,
							{
								color: darkTheme
									? formStylesColors.dark.text
									: formStylesColors.default.text,
							},
						]}
					>
						{label}
					</Text>
				</Pressable>
			</View>
		</>
	);
};

export const RadioInput = ({
	value,
	name,
	style,
	onPress,
	darkTheme = false,
	...props
}) => {
	return (
		<Pressable onPress={onPress}>
			<View
				style={[
					formStyles.checkboxIconWrap,
					{
						borderColor: value
							? darkTheme
								? formStylesColors.dark.radioPrimaryTrue
								: formStylesColors.default.radioPrimaryTrue
							: darkTheme
							? formStylesColors.dark.radioPrimaryFalse
							: formStylesColors.default.radioPrimaryFalse,

						backgroundColor: value
							? darkTheme
								? formStylesColors.dark.radioPrimaryBgTrue
								: formStylesColors.default.radioPrimaryBgTrue
							: darkTheme
							? formStylesColors.dark.radioPrimaryBgFalse
							: formStylesColors.default.radioPrimaryBgFalse,
					},
					style,
				]}
				{...props}
			>
				{value === name && (
					<Ionicons
						name='ellipse'
						type='Ionicons'
						style={[
							formStyles.radioboxIcon,
							{
								color: darkTheme
									? formStylesColors.dark.radioIconTrue
									: formStylesColors.default.radioIconTrue,
							},
						]}
					/>
				)}
			</View>
		</Pressable>
	);
};

export const CheckInput = ({
	value,
	name,
	style,
	onPress,
	darkTheme = true,
	...props
}) => {
	return (
		<Pressable onPress={onPress}>
			<View
				style={[
					formStyles.radioboxIconWrap,
					{
						borderWidth: value ? 0 : 2,
						borderColor: value
							? darkTheme
								? formStylesColors.dark.checkPrimaryTrue
								: formStylesColors.default.checkPrimaryTrue
							: darkTheme
							? formStylesColors.dark.checkPrimaryFalse
							: formStylesColors.default.checkPrimaryFalse,

						backgroundColor: value
							? darkTheme
								? formStylesColors.dark.checkPrimaryBgTrue
								: formStylesColors.default.checkPrimaryBgTrue
							: darkTheme
							? formStylesColors.dark.checkPrimaryBgFalse
							: formStylesColors.default.checkPrimaryBgFalse,
					},
					style,
				]}
				{...props}
			>
				{value && (
					<Ionicons
						name='checkmark'
						type='Ionicons'
						style={[
							formStyles.checkboxIcon,
							{
								color: darkTheme
									? formStylesColors.dark.checkIconTrue
									: formStylesColors.default.checkIconTrue,
							},
						]}
					/>
				)}
			</View>
		</Pressable>
	);
};
