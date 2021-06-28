import React from 'react';
import './sidebar.css';
import { List, Add, Timeline, PersonAdd } from '@material-ui/icons';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h2 className='sidebarTitle'>Putni nalozi</h2>
          <ul className='sidebarList'>
            <li className='sidebarListItem active'>
              <List className='sidebarIcon' />
              Prikaži
            </li>
            <li className='sidebarListItem'>
              <Add className='sidebarIcon' />
              Kreiraj
            </li>
            <li className='sidebarListItem'>
              <Timeline className='sidebarIcon' />
              Statistika
            </li>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h2 className='sidebarTitle'>Zaposlenici</h2>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <List className='sidebarIcon' />
              Prikaži
            </li>
            <li className='sidebarListItem'>
              <PersonAdd className='sidebarIcon' />
              Zaposli
            </li>
            <li className='sidebarListItem'>
              <Timeline className='sidebarIcon' />
              Statistika
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
