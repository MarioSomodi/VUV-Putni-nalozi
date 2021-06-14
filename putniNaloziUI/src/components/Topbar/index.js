import React from 'react';
import {
  TopbarContainer,
  Icon,
  CloseIcon,
  TopbarWrapper,
  TopbarMenu,
  TopbarLink,
  TopbarAdminBtn,
  TopbarButtonLink,
} from './TopbarElements';

const Topbar = ({ isOpen, toggle }) => {
  return (
    <>
      <TopbarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <TopbarWrapper>
          <TopbarMenu>
            <TopbarLink onClick={toggle} to='/putniNalozi'>
              Putni nalozi
            </TopbarLink>
            <TopbarLink onClick={toggle} to='/putniNalog/novi'>
              Novi putni nalog
            </TopbarLink>
            <TopbarLink onClick={toggle} to='/zaposlenici'>
              Zaposlenici
            </TopbarLink>
            <TopbarLink onClick={toggle} to='/zaposlenik/novi'>
              Novi zaposlenik
            </TopbarLink>
          </TopbarMenu>
          <TopbarAdminBtn>
            <TopbarButtonLink to='/signin'>Administracija</TopbarButtonLink>
          </TopbarAdminBtn>
        </TopbarWrapper>
      </TopbarContainer>
    </>
  );
};

export default Topbar;
