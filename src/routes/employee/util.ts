import moment from 'moment';

export const calculateAge = (date: moment.Moment): number => {
	return Math.trunc(moment().diff(date, 'years'));
};

export const getLengthOfStay = (date: moment.Moment): string => {
	const yearsDiff = moment().diff(date, 'years');
	const monthsDiff: number = moment().diff(date, 'months');
	let formatted: string[] = [];
	if (yearsDiff > 0) {
		formatted.push(yearsDiff.toFixed(0) + 'y');
	}
	if (monthsDiff > 0) {
		const subtractor = Math.trunc(Number(yearsDiff.toFixed(0))) * 12;
		const monthsDiffTrunc = Math.trunc(monthsDiff) - subtractor;
		formatted.push(monthsDiffTrunc + 'm');
	}
	if (formatted.length == 0) return '0m';
	return formatted.join(' ');
};
