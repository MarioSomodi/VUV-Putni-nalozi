import React from 'react';
import OUTable from '../../components/odjeliIUloge/Table/OUTable';

export default function OdjeliIUloge({ user }) {
  return (
    <div className='odjeliIUloge'>
      <OUTable user={user} />
    </div>
  );
}
