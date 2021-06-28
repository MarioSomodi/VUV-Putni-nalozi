import React from 'react';
import './topbar.css';
import { Settings } from '@material-ui/icons';
import Avatar from '../../images/avatar.jpg';

export default function Topbar() {
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>VUVPutniNalozi</span>
        </div>
        <div className='topRight'>
          <img src={Avatar} alt='Avatar' className='topAvatar' />
          <div className='topBarIconContainer'>
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}
