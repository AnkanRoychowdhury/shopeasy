
import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid black;
  padding: 10px;
`;

const Td = styled.td`
  border: 1px solid black;
  padding: 10px;
`;

const data = [
    {
        account: 'Cristiano Ronaldo',
        followers: '621.8M',
        er: '1.09%',
        email: true,
        platforms: ['Platform1', 'Platform2'],
        category: 'Football & Soccer',
        india: '16%'
    },
    // Add more data here
];

const MyTable = () => (
    <Table>
        <thead>
            <tr>
                <Th>Account</Th>
                <Th>Followers</Th>
                <Th>ER</Th>
                <Th>Email</Th>
                <Th>Platforms</Th>
                <Th>Category</Th>
                <Th>India</Th>
            </tr>
        </thead>
        <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    <Td>{row.account}</Td>
                    <Td>{row.followers}</Td>
                    <Td>{row.er}</Td>
                    <Td>{row.email ? 'Yes' : 'No'}</Td>
                    <Td>{row.platforms.join(', ')}</Td>
                    <Td>{row.category}</Td>
                    <Td>{row.india}</Td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default MyTable;