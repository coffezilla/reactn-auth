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

// constant colors
const primaryColorDefault = '#6E00F0';
const primaryColorDark = '#E2C1FF';

// themes
export const formStylesColors = {
	dark: {
		primary: 'green',
		backgroundWrap: '#343434',
		text: '#C0C0C0',
		placeholder: '#575757',

		// switch
		trackColorFalse: '#262626',
		trackColorTrue: '#6edc5f',
		trackThumbColor: '#eee',
		trackTBgIos: '#3A393E',

		// radio
		radioPrimaryTrue: primaryColorDark,
		radioPrimaryBgTrue: '#2c2c2c',
		radioIconTrue: primaryColorDark,

		// check
		checkPrimaryTrue: primaryColorDark,
		checkPrimaryBgTrue: primaryColorDark,
		checkPrimaryFalse: '#606060',
		checkPrimaryBgFalse: '#2c2c2c',
		checkIconTrue: '#2c2c2c',

		// input
		textInputBorder: '#606060',
		backgroundInput: '#2c2c2c',
	},
	default: {
		primary: 'red',
		backgroundWrap: '#eee',
		text: '#545454',
		placeholder: '#BFBEBE',

		// switch
		trackColorFalse: '#cdcdcd',
		trackColorTrue: '#6edc5f',
		trackThumbColor: '#fff',
		trackTBgIos: '#cdcdcd',

		// radio
		radioPrimaryTrue: primaryColorDefault,
		radioPrimaryBgTrue: '#fff',
		radioIconTrue: primaryColorDefault,

		// check
		checkPrimaryTrue: primaryColorDefault,
		checkPrimaryBgTrue: primaryColorDefault,
		checkPrimaryFalse: primaryColorDefault,
		checkPrimaryBgFalse: '#fff',
		checkIconTrue: '#fff',

		// input
		textInputBorder: '#D1D1D1',
		backgroundInput: '#fff',
	},
};

export const formStyles = StyleSheet.create({
	// basic icon check
	checkboxIcon: {
		borderWidth: 0,
		lineHeight: 19,
		color: 'white',
		fontSize: 17,
		textAlign: 'center',
	},
	checkboxIconWrap: {
		width: 20,
		height: 20,
		borderRadius: 22,
		borderWidth: 2,
	},
	// basic icon radio
	radioboxIcon: {
		borderWidth: 0,
		paddingLeft: 1, // hack
		lineHeight: 16,
		color: '#6E00F0',
		fontSize: 13,
		textAlign: 'center',
	},
	radioboxIconWrap: {
		width: 20,
		height: 20,
		borderRadius: 3,
	},
	// label
	inlineLabel: {
		fontSize: 16,
		marginLeft: 7,
		color: 'black',
	},
	labelTop: {
		fontWeight: 'bold',
		marginBottom: 5,
		color: 'black',
	},
	// checkbox group
	checkInputGroupWrap: {
		backgroundColor: '#eee',
		borderRadius: 8,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden',
	},
	checkInputGroupTouchable: {
		paddingHorizontal: 15,
		height: 45,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
	},
	// switch group
	SwitchInputGroup: {
		backgroundColor: '#eee',
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 45,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	// input text
	inputText: {
		borderColor: '#D1D1D1',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 18,
		height: 45,
		marginBottom: 15,
	},
	inputTextReadOnly: {
		backgroundColor: '#F5F5F5',
		lineHeight: 45,
		borderRadius: 8,
		overflow: 'hidden',
		paddingHorizontal: 15,
		fontSize: 18,
		height: 45,
		marginBottom: 15,
	},
	textareaInput: {
		borderColor: '#D1D1D1',
		alignItems: 'flex-start',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 18,
		minHeight: 80,
		maxHeight: 200,
		marginBottom: 15,
		paddingTop: 10,
		paddingBottom: 8,
		textAlignVertical: 'top', // hack Android
	},
	// error
	inputTextError: {
		borderWidth: 1,
		borderColor: 'red',
	},
});
