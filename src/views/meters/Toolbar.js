import React from 'react';
import PendMeters from './PendMeters';
import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';


const useStyles = makeStyles((theme) => ({
	root: {
		fontSize: '1.4rem',
		padding: '1.5rem',
		'& *': {
			fontSize: 'inherit',
		},
		'& svg': {
			alignSelf: 'center',
			width: '2.5rem',
			height: '2.5rem',
		},
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		height: 'fit-content'
	},
}));

const Toolbar = ({ search, className,data, ...rest }) => {
	const classes = useStyles();
	const { search: searchValue, setSearch } = search;
	//handles updating the search state of the customers parent component
	const handleChange = ({ target }) => {
		 setSearch(target.value);
	};

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Box display="flex" justifyContent="space-between">
				<PendMeters></PendMeters>	
					{/* // data={exportData(data)}
					// filename={`CustomersExport${getDate()}.csv`}
				 */}
					<Button color='primary' variant='contained' className={classes.exportButton} href='/export-monthly-readings'>
						Export Monthly Readings
					</Button>
				
			</Box>
			<Box mt={3}>
				<Card>
					<CardContent>
						<Box maxWidth={500}>
							<TextField
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SvgIcon fontSize="small" color="action">
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
								placeholder="Search Monthly Readings:Eg.September"
								variant="outlined"
								 onChange={handleChange}
								 value={searchValue}
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</div>
	);
};

export default Toolbar;
