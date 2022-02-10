import  List  from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import ListItemText  from '@mui/material/ListItemText'
import { isSameRange } from "../utils";

const Ranges = props => {
    console.log(props)
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