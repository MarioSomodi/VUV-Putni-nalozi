import React from 'react';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavBarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLink,
  AdminButton,
  ButtonLink,
} from './NavbarElements';

const Navbar = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavBarContainer>
          <NavLogo to='/'>VUVPutniNalozi</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLink to='/putniNalozi'>Putni nalozi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/putniNalog/novi'>Novi putni nalog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/zaposlenici'>Zaposlenici</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/zaposlenik/novi'>Novi zaposlenik</NavLink>
            </NavItem>
          </NavMenu>
          <AdminButton>
            <ButtonLink to='/signin'>Administracija</ButtonLink>
          </AdminButton>
        </NavBarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
