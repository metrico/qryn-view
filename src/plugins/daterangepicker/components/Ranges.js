
import { List, ListItem, ListItemText } from "@material-ui/core";
import { isSameDay } from "date-fns";


const isSameRange = (first, second) => {
	const { dateStart: fStart, dateEnd: fEnd } = first;
	const { dateStart: sStart, dateEnd: sEnd } = second;
	if (fStart && sStart && fEnd && sEnd) {
		return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
	}
	return false;
};

const Ranges = props => {
	return (
		<List>
			{props.ranges.map((range, idx) => (
				<ListItem button key={idx} onClick={() => props.setRange(range)}>
					<ListItemText
						primaryTypographyProps={{
							variant: "body2",
							style: {
								fontWeight: isSameRange(range, props.selectedRange)
									? "bold"
									: "normal",
                                   color: isSameRange(range, props.selectedRange) ? 'orange' : 'white'
							}
						}}>
						{range.label}
					</ListItemText>
				</ListItem>
			))}
		</List>
	);
};

export default Ranges;