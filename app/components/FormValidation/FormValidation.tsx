/* eslint-disable operator-linebreak */
import React from 'react';

type inputTypes =
	| 'text'
	| 'select'
	| 'radio'
	| 'checkbox'
	| 'textarea'
	| 'email'
	| 'password'
	| 'tel'
	| 'switcher';

interface IInput {
	name: string;
	value: string;
	error: string;
	type: inputTypes;
	maxLength?: number;
	minLength?: number;
	isEqual?: boolean | string;
	isRequired?: boolean;
}

export interface IForm {
	inputs: IInput[];
}

export const validateCheckbox = (inputField: IInput) => {
	const { value = '', isRequired = false } = inputField;

	let hasPassed = true;
	let errorMessage = '';

	const inputClean = value;
	if (isRequired) {
		if (!inputClean) {
			errorMessage = 'Check the checkbox';
			hasPassed = false;
		}
	}

	return { hasPassed, errorMessage };
};

//
export const validateInput = (
	inputField: IInput,
	formFields: IForm['inputs']
) => {
	const {
		value,
		type,
		maxLength = 100,
		minLength = 0,
		isEqual = false,
		isRequired = false,
	} = inputField;

	let hasPassed = true;
	let errorMessage = '';

	let inputClean = value;
	inputClean = inputClean.trim();
	inputClean = inputClean.replace(/  +/g, ' ');

	const isEmpty = inputClean.length === 0;

	if (isRequired) {
		// isEmpty
		if (isEmpty) {
			errorMessage = 'Input required';
			hasPassed = false;
		}

		if (type !== 'select' && type !== 'radio') {
			if (inputClean.length < minLength) {
				// min length
				errorMessage = `Less than ${minLength}`;
				hasPassed = false;
			}

			// max length
			if (inputClean.length > maxLength) {
				errorMessage = `Max than ${maxLength}`;
				hasPassed = false;
			}

			// isEmail
			if (type === 'email') {
				if (!inputClean.includes('@')) {
					errorMessage = 'not email ';
					hasPassed = false;
				}
			}

			// isEqual ( check if it needs to be the same string as another input )
			if (isEqual !== false) {
				let isEqualValue = '';
				formFields.forEach((field: any) => {
					if (field.name === inputField.isEqual) {
						isEqualValue = field.value;
					}
				});

				if (inputClean !== isEqualValue) {
					errorMessage = `Have to be equal to password input ${isEqual}`;
					hasPassed = false;
				}
			}
		}
	}

	return { hasPassed, errorMessage };
};

export const validateForm = (
	formFields: IForm['inputs'],
	setFormFields: React.Dispatch<React.SetStateAction<IForm['inputs']>>
) => {
	let hasPassed = true;
	let errorMessage = '';

	formFields.forEach((field) => {
		if (hasPassed) {
			let isValid: { hasPassed: boolean; errorMessage: string } = {
				hasPassed: false,
				errorMessage: '',
			};

			if (field.type === 'checkbox' || field.type === 'switcher') {
				isValid = validateCheckbox(field);
			} else {
				if (field.isEqual !== false) {
					isValid = validateInput(field, formFields);
				} else {
					isValid = validateInput(field, formFields);
				}
			}

			// if (
			// 	field.type === 'text' ||
			// 	field.type === 'email' ||
			// 	field.type === 'password' ||
			// 	field.type === 'radio' ||
			// 	field.type === 'select' ||
			// 	field.type === 'textarea'
			// ) {

			// }

			if (!isValid.hasPassed) {
				hasPassed = false;
				errorMessage = isValid.errorMessage;

				setFormFields(
					formFields.map((input: any) => {
						if (input.name === field.name) {
							return {
								...input,
								error: isValid.errorMessage,
							};
						}
						return { ...input };
					})
				);
			}
		}

		console.log('- ', hasPassed, ' value', field.name, ' ... ', field.value);
	});

	return { hasPassed, errorMessage };
};
