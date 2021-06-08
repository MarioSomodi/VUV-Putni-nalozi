import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './columns';
import { SectionWrapper, SectionBox } from './PutniNaloziSElements';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import '../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const PutniNaloziS = () => {
  const [putniNalozi, setPutniNalozi] = useState([]);

  useEffect(() => {
    fetch(
      'http://localhost/Mario_Somodi/KV/VUV-Putni-nalozi/putniNaloziAPI/api/PutniNalog/getAll.php'
    )
      .then((res) => res.json())
      .then((data) => {
        setPutniNalozi(data);
      })
      .catch(console.log);
  });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => putniNalozi, [putniNalozi]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <SectionWrapper id='putniNalozi'>
        <SectionBox>
          <Table {...getTableProps()}>
            <Thead>
              <Tr>
                {headerGroups.map((headerGroup) => {
                  return (
                    <>
                      {headerGroup.headers.map((header) => {
                        return <Th>{header.Header}</Th>;
                      })}
                    </>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </SectionBox>
      </SectionWrapper>
    </>
  );
};

export default PutniNaloziS;
