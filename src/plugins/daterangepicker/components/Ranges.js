
import { List, ListItem, ListItemText } from "@mui/material";
import { isSameRange } from "../utils";

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