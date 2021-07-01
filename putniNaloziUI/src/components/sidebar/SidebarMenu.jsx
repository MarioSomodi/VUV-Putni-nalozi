import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5724c7',
    },
  },
});

export default function SidebarMenu(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='sidebarMenu'>
        <h2 className='sidebarTitle'>{props.title}</h2>
        <ul className='sidebarList'>
          {props.items.map((item) => (
            <Link className='link' to={item.route}>
              <li className='sidebarListItem'>
                <Button
                  type='button'
                  color='primary'
                  fullWidth='true'
                  className=''
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </MuiThemeProvider>
  );
}
