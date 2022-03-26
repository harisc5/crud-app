import {
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import {useState} from "react";
import {useSelector} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    {id: 'name', label: 'Name', minWidth: 200},
    {id: 'age', label: 'Age', minWidth: 200},
    {id: 'email', label: 'Email', minWidth: 200},
    {id: 'actions', label: 'Actions', minWidth: 200},
];

const Table = ({setUserToEdit, setUserToDelete}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const {users} = useSelector(state => state.users);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <MuiTable stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth, fontWeight: 'bold'}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((user) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                        {columns.map((column) => {
                                            if (column.id !== 'actions') {
                                                const value = user[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell key={column.id}>
                                                    <EditIcon className='hover' onClick={() => setUserToEdit(user)}/>
                                                    <DeleteIcon className='hover'
                                                                onClick={() => setUserToDelete(user)}/>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </MuiTable>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default Table;
