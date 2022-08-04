import React from 'react';
import ZTable from '../../components/zaposlenici/Table/ZTable';

export default function Zaposlenici({ user }) {
  return (
    <div className='zaposlenici'>
      <ZTable user={user} />
    </div>
  );
}
