import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

export default function SidebarMenu({ title, items }) {
  const location = useLocation();
  return (
    <div className='sidebarMenu'>
      <h2 className='sidebarTitle'>{title}</h2>
      <ul className='sidebarList'>
        {items.map((item) => (
          <Link key={item.label} className='link' to={item.route}>
            <li
              className={
                item.route === location.pathname
                  ? 'sidebarListItem active'
                  : 'sidebarListItem'
              }
            >
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
  );
}
