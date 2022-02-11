import {
    startOfDay,
    endOfDay,
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	isBefore,
    addMinutes,
    addHours,
	addDays,
	addWeeks,
	addMonths,
	isSameDay,
	isWithinInterval,
	isSameMonth,
	toDate,
	parseISO,
	isValid,
	min,
	max
} from "date-fns";
import { isSameMinute } from "date-fns/esm";





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

export const findRange = (dateRange) => {
    return getDefaultRanges(new Date()).find(range =>  isSameRange(dateRange, range))?.label;
}
export const findRangeByLabel = (label) => {
    return getDefaultRanges(new Date()).find(range => range.label === label);
}
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

export const generateYears = (relativeTo, count) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

export const isSameRange = (first, second) => {
	const { dateStart: fStart, dateEnd: fEnd, label: fLabel } = first;
	const { dateStart: sStart, dateEnd: sEnd, label: sLabel } = second;
    if (fLabel === sLabel) {
        return true;
    } else if (fStart && sStart && fEnd && sEnd) {
		return isSameMinute(fStart, sStart) && isSameMinute(fEnd, sEnd);
	}
	return false;
};

export const getValidatedMonths = (range, minDate, maxDate) => {
    let { dateStart, dateEnd } = range;
    if (dateStart && dateEnd) {
        const newStart = max([dateStart, minDate]);
        const newEnd = min([dateEnd, maxDate]);

        return [
            newStart,
            isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
        ];
    } else {
        return [dateStart, dateEnd];
    }
};

export const getDefaultRanges = (date) => [
    {
		label: "Last 5 minutes",
		dateStart: addMinutes(date, -5),
		dateEnd: date
	},{
		label: "Last 15 minutes",
		dateStart: addMinutes(date, -15),
		dateEnd: date
	},{
		label: "Last 30 minutes",
		dateStart: addMinutes(date, -30),
		dateEnd: date
	},{
		label: "Last 3 hours",
		dateStart: addHours(date, -3),
		dateEnd: date
	},{
		label: "Last 6 hours",
		dateStart: addHours(date, -6),
		dateEnd: date
	},{
		label: "Last 12 hours",
		dateStart: addHours(date, -12),
		dateEnd: date
	},{
		label: "Last 24 hours",
		dateStart: addHours(date, -24),
		dateEnd: date
	},
	{
		label: "Today",
		dateStart: startOfDay(date),
		dateEnd: endOfDay(date)
	},
	{
		label: "Yesterday",
		dateStart: startOfDay(addDays(date, -1)),
		dateEnd: endOfDay(addDays(date, -1))
	},
	{
		label: "This Week",
		dateStart: startOfWeek(date),
		dateEnd: endOfWeek(date)
	},
	{
		label: "Last Week",
		dateStart: startOfWeek(addWeeks(date, -1)),
		dateEnd: endOfWeek(addWeeks(date, -1))
	},
	{
		label: "Last 7 Days",
		dateStart: addWeeks(date, -1),
		dateEnd: date
	},
	{
		label: "This Month",
		dateStart: startOfMonth(date),
		dateEnd: endOfMonth(date)
	},
	{
		label: "Last Month",
		dateStart: startOfMonth(addMonths(date, -1)),
		dateEnd: endOfMonth(addMonths(date, -1))
	}
];

export const defaultRanges = getDefaultRanges(new Date());