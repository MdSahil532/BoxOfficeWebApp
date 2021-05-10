import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';

const Navs = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <NavList>
        <li>
          <LinkStyled to="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </LinkStyled>
        </li>
        <li>
          <LinkStyled
            to="/starred"
            className={pathname === '/starred' ? 'active' : ''}
          >
            Starred
          </LinkStyled>
        </li>
      </NavList>
    </div>
  );
};

export default memo(Navs);
