import React from 'react';
import './sidebar.css';
import SideBarMenu from './SidebarMenu';
import { List, Add, Timeline, PersonAdd } from '@material-ui/icons';

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <SideBarMenu
          title='Putni nalozi'
          items={[
            {
              label: 'Prikaži',
              icon: <List className='sidebarIcon' />,
              route: '/',
            },
            {
              label: 'Kreiraj',
              icon: <Add className='sidebarIcon' />,
              route: '/PutniNalog/Novi',
            },
            {
              label: 'Statistika',
              icon: <Timeline className='sidebarIcon' />,
              route: '/',
            },
          ]}
        />
        {props.user.role === '1' ? (
          <>
            <SideBarMenu
              title='Zaposlenici'
              items={[
                {
                  label: 'Prikaži',
                  icon: <List className='sidebarIcon' />,
                  route: '/',
                },
                {
                  label: 'Zaposli',
                  icon: <PersonAdd className='sidebarIcon' />,
                  route: '/',
                },
                {
                  label: 'Statistika',
                  icon: <Timeline className='sidebarIcon' />,
                  route: '/',
                },
              ]}
            />
            <SideBarMenu
              title='Odjeli i uloge'
              items={[
                {
                  label: 'Prikaži',
                  icon: <List className='sidebarIcon' />,
                  route: '/',
                },
                {
                  label: 'Kreiraj',
                  icon: <Add className='sidebarIcon' />,
                  route: '/',
                },
                {
                  label: 'Statistika',
                  icon: <Timeline className='sidebarIcon' />,
                  route: '/',
                },
              ]}
            />
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
