import {
	addDays,
	startOfWeek,
	endOfWeek,
	addWeeks,
	startOfMonth,
	endOfMonth,
	addMonths,
	addMinutes,
	addHours,
	addSeconds,
	startOfDay,
	endOfDay,
	getHours
} from "date-fns";

const getDefaultRanges = (date) => [
	{
		label: "Today",
		dateStart: startOfDay,
		dateEnd: endOfDay
	},
	{
		label: "Yesterday",
		dateStart: addDays(date, -1),
		dateEnd: addDays(date, -1)
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