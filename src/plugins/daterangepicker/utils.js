import {
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	isBefore,
	addDays,
	isSameDay,
	isWithinInterval,
	toDate,
	parseISO,
	isValid
} from "date-fns";




export const chunks = (array, size) => {
	return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
		array.slice(i * size, i * size + size)
	);
};

export const combine = (...args) => args.filter( f => f).join(" ");

// Date
export const getDaysInMonth = (date) => {
	const startWeek = startOfWeek(startOfMonth(date));
	const endWeek = endOfWeek(endOfMonth(date));
	const days = [];
	for (let curr = startWeek; isBefore(curr, endWeek); ) {
		days.push(curr);
		curr = addDays(curr, 1);
	}
	return days;
};

export const isStartOfRange = ({ dateStart }, day) =>
	(dateStart && isSameDay(day, dateStart));

export const isEndOfRange = ({ dateEnd }, day) =>
	(dateEnd && isSameDay(day, dateEnd));

export const inDateRange = ({ dateStart, dateEnd }, day) =>
	(dateStart &&
		dateEnd &&
		(isWithinInterval(day, {
			start: dateStart,
			end: dateEnd
		}) ||
			isSameDay(day, dateStart) ||
			isSameDay(day, dateEnd)));

export const isRangeSameDay = ({ dateStart, dateEnd }) => {
	if (dateStart && dateEnd) {
		return isSameDay(dateStart, dateEnd);
	}
	return false;
};



export const parseOptionalDate = (date, defaultValue) => {
	if (date instanceof Date) {
		const parsed = toDate(date);
		if (isValid(parsed)) return parsed;
	}

	if (date instanceof String) {
		const parsed = parseISO(date);
		if (isValid(parsed)) return parsed;
	}

	return defaultValue;
};