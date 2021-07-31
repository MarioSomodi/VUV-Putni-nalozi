import React from 'react';
import './odjeliIUloge.css';
import OUTable from '../../components/odjeliIUloge/Table/OUTable';

export default function OdjeliIUloge(props) {
  return (
    <div className='odjeliIUloge'>
      <OUTable user={props.user} />
    </div>
  );
}
