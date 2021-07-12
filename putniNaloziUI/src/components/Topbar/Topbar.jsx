import React from 'react';
import './topbar.css';
import { Settings, ExitToApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(5.7),
    height: theme.spacing(5.7),
    marginRight: '10px',
    marginTop: '5px',
  },
  iconButton: {
    marginTop: '5px',
  },
}));

export default function Topbar(props) {
  const classes = useStyles();
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <Link className='link' to='/'>
          <div className='topLeft'>
            <span className='logo'>VUVPutniNalozi</span>
          </div>
        </Link>
        <div className='topRight'>
          <Avatar
            alt='Avatar'
            src={
              'https://eu.ui-avatars.com/api/?background=5724c7&color=fff&rounded=true&bold=true&name=' +
              props.user.ime +
              '+' +
              props.user.prezime
            }
            className={classes.large}
          />
          <IconButton className={classes.iconButton} aria-label='Postavke'>
            <Link
              className='linkSettinga'
              to={'/Zaposlenik/Azuriraj/id/' + props.user.id}
            >
              <Settings />
            </Link>
          </IconButton>
          <IconButton
            onClick={props.logOut}
            className={classes.iconButton}
            aria-label='Odjavi se'
          >
            <ExitToApp />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
