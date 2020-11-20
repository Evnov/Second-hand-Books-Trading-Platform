import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    display: 'flex',
    paddingTop: theme.spacing(5),
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Loading(props) {
  const { onLoading } = props;
  const classes = useStyles();
  if (onLoading)
    return (
      <React.Fragment>
        <Grid container justify="center" className={classes.CircularProgress}>
          <Grid item>
            <CircularProgress />
          </Grid>
          <Grid item>
            <Typography>LOADING</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  else {
    return <></>;
  }
}
