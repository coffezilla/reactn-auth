/* eslint-disable */
export const convertMoneyToNumber = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const convertNumberToMoney = (number) => {
	number = parseInt(number);
	return '$ ' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const convertNumberToPercentage = (number) => {
	return number + ' %';
};

export const convertTimestampTo = (timestamp, timeFormat = 'BRAZIL') => {
	let time = '';
	const dateFormat = timestamp.replace(/-/g, '/');
	let timeStampConverted = Date.parse(dateFormat);
	let a = new Date(timeStampConverted);

	if (isNaN(a)) {
		time = timestamp;
	} else {
		let months = [
			'Jan',
			'Fev',
			'Mar',
			'Abr',
			'Mai',
			'Jun',
			'Jul',
			'Ago',
			'Set',
			'Out',
			'Nov',
			'Dez',
		];
		let year = a.getFullYear();
		let month = months[a.getMonth()];
		let monthNumber =
			parseInt(a.getMonth() + 1) < 10
				? '0' + (a.getMonth() + 1)
				: a.getMonth() + 1;
		let date = a.getDate();
		let hour = a.getHours();
		// let hourNumber = parseInt(a.getHours()) < 10 ? '0'+a.getHours() : a.getHours();
		let min = a.getMinutes();
		let minNumber =
			parseInt(a.getMinutes()) < 10 ? '0' + a.getMinutes() : a.getMinutes();
		let sec = a.getSeconds();

		if (timeFormat === 'BRAZIL') {
			time =
				date +
				'/' +
				monthNumber +
				'/' +
				year +
				' ' +
				hour +
				':' +
				minNumber +
				'h';
		} else if (timeFormat === 'BR_RESUME') {
			time =
				date +
				' ' +
				month +
				' ' +
				year +
				' ' +
				hour +
				':' +
				minNumber +
				':' +
				sec;
		} else if (timeFormat === 'BR_COMPLETE') {
			time =
				date +
				' ' +
				month +
				' ' +
				year +
				' ' +
				hour +
				':' +
				minNumber +
				':' +
				sec;
		} else if (timeFormat === 'BR_COMPLETE_DESCRITIVE') {
			time =
				date + ' ' + month + ' ' + year + ' ' + hour + ':' + minNumber + 'h';
		}
	}

	return time;
};
