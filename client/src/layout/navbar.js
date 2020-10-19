import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      width: '4rem',
      padding: theme.spacing(2, 5),
      fontFamily: 'Arial',
      color: 'white',
      fontSize: '15px',
      textDecoration: 'none',
    },
    gap: {
        flexGrow: 5,
    },
    logo: {
        fontFamily: 'Arial',
        color: 'white',
        padding: theme.spacing(2),
        fontSize: '30px',
    },
    appbar: {
        background: 'black',
        minHeight: '5rem',
    }
}));

export default function NavBar() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Link to="/">
                <Button className={classes.logo}>
                    YEAHOO
                </Button>
              </Link>
              <Link to="/"> 
                    <Button className={classes.title} type="link">
                        Home
                    </Button>
                </Link>
              <Link to="/buy"> 
                    <Button className={classes.title} type="link">
                        Buy
                    </Button>
                </Link>
              <Link to="/borrow"> 
                    <Button className={classes.title} type="link">
                        Borrow
                        
                    </Button>
                </Link>
            <Typography variant="h6" className={classes.gap} />
            <Link to="/login"> 
                <Button className={classes.title} type="link">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
}