import React from 'react';
import {Typography, Link, Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    foot: {
        height: '5vh',
    }
}))
export default function Footer() {
    const classes = useStyles();

    const Copyright = () => {
        return (
            <Typography variant='body2' color='textSecondary' align='center'>
                {'Copyright © '}
                <Link color='inherit' href='http://localhost:3000/'>
                    UCI Yeahoo
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    };
    return(
        <div>
            <footer className={classes.foot}>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </footer>
        </div>
    );
}