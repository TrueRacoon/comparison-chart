import React from 'react';
import './Header.css';
import SvgIcon from '../SvgIcon/SvgIcon';
import Icon from '../../constants/Icon';

function Header(): JSX.Element {
  return (
    <header className="Header">
      <div className="Header__catalog-link">
        Каталог
      </div>
      <div className="Header__current-page-label-and-profile">
        <div className="Header__current-page-label">
          Сравнение
        </div>
        <div className="Header__profile">
          <div className="Header__profile-label">
            Личный кабинет
          </div>
          <div className="Header__profile-icon">
            <SvgIcon icon={Icon.User} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
