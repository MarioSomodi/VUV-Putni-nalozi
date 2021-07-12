import React from 'react';
import ZTable from '../../components/zaposlenici/Table/ZTable';
import './zaposlenici.css';

export default function Zaposlenici(props) {
  return (
    <div className='zaposlenici'>
      <ZTable user={props.user} />
    </div>
  );
}
