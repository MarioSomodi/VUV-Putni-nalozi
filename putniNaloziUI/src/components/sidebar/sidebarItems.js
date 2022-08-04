import { List, Add, Timeline, PersonAdd } from '@material-ui/icons';
import React from 'react';

const subNavTitlesAndTheirItems = [
  {
    role: 0,
    title: 'Putni nalozi',
    items: [
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
        route: '/PutniNalog/Statistika',
      },
    ],
  },
  {
    role: 1,
    title: 'Zaposlenici',
    items: [
      {
        label: 'Prikaži',
        icon: <List className='sidebarIcon' />,
        route: '/Zaposlenici',
      },
      {
        label: 'Zaposli',
        icon: <PersonAdd className='sidebarIcon' />,
        route: '/Zaposlenik/Novi',
      },
      {
        label: 'Statistika',
        icon: <Timeline className='sidebarIcon' />,
        route: '/Zaposlenik/Statistika',
      },
    ],
  },
  {
    role: 1,
    title: 'Odjeli i uloge',
    items: [
      {
        label: 'Prikaži',
        icon: <List className='sidebarIcon' />,
        route: '/Odjeli-i-Uloge',
      },
      {
        label: 'Kreiraj',
        icon: <Add className='sidebarIcon' />,
        route: '/Odjel-i-Uloga/Kreiraj',
      },
    ],
  },
];

export default subNavTitlesAndTheirItems;
