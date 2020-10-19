import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Footer from './layout/footer'
import NavBar from './layout/navbar'
import Routes from './routes'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '5rem',
  }
}))

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.content}>
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
