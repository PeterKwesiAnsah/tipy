import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	LinearProgress,
	Typography,
	makeStyles,
	colors,
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%',
	},
	avatar: {
		backgroundColor: colors.orange[600],
		height: 56,
		width: 56,
	},
}));

const TasksProgress = ({ className, count, ...rest }) => {
	const classes = useStyles();

	//get the status count for LLW
	const { read, customers } = count;
	//calculates the meter readings
	const percentage = () => {
		let perc = 0;
		let percStr = '0';
		if (read > 0 && customers > 0) {
			perc = Number((read / customers) * 100).toFixed(1);
      percStr = String(perc);
      
		}
console.log( perc,percStr)
		return [perc, percStr];
	};

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Grid container justify="space-between" spacing={3}>
					<Grid item>
						<Typography color="textSecondary" gutterBottom variant="h6">
							METER READINGS PROGRESS
						</Typography>
						<Typography color="textPrimary" variant="h3">
							{`${percentage()[1]}%`}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<InsertChartIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box mt={3}>
					<LinearProgress value={parseInt(percentage()[0])} variant="determinate" />
				</Box>
			</CardContent>
		</Card>
	);
};

TasksProgress.propTypes = {
	className: PropTypes.string,
};

export default TasksProgress;
