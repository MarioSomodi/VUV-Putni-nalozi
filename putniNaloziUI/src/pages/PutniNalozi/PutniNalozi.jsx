import React from 'react';
import Table from '../../components/putniNalozi/Table/PNTable';
import './putniNalozi.css';

export default function PutniNalozi(props) {
  return (
    <div className='putniNalozi'>
      <Table user={props.user} />
    </div>
  );
}
