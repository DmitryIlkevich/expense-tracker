import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import axios from "axios";

// Style table
const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.background,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

/**
 * Represents categories. Shows all available categories and allows to manipulate them.
 */
class Category extends React.Component {

    /**
     * Retrieve categories from backend
     * @param row category data
     */
    removeCategory = async (row) => {
        let categoryId = row.id;
        await axios.delete(`/category/${categoryId}`)
        this.props.onNotifyParentCategoryDeletion()
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 100}} aria-label="customized table">
                    <TableHead style={{backgroundColor: '#363636'}}>
                        <TableRow>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.categories.map((row) => (
                            <StyledTableRow hover>
                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                <StyledTableCell align="left">{row.description}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="outlined" onClick={() => this.removeCategory(row)}>
                                        REMOVE
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Category;