import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import CustomTableHead from '../../ui-component/CustomTableHead';
import applySortFilter from '../../utils/table-sort-filter';
import MoreMenu from './MoreMenu';

export default function CustomerTypeList({ data, columns }) {
    const [order, setOrder] = useState('');
    const [orderBy, setOrderBy] = useState('number');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = applySortFilter(data, order, orderBy);

    return (
        <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
                <CustomTableHead order={order} orderBy={orderBy} columns={columns} onRequestSort={handleRequestSort} />
                <TableBody>
                    {sortedData.map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return column.id === 'more' ? (
                                    <TableCell align="center" key={row.id}>
                                        <MoreMenu />
                                    </TableCell>
                                ) : (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
