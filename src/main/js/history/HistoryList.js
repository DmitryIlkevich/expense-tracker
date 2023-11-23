import * as React from 'react';
import {useEffect} from 'react';
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

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
 * Prints all available transaction histories for the specific date.
 */
const HistoryList = (props) => {
    const [data, setData] = React.useState([]);
    const cancelTokenSource = axios.CancelToken.source();
    const {year, month, day} = props;

    /**
     * Retrieves all transaction histories for the specific day by REST call
     */
    const fetchData = async () => {
        try {
            const response = await axios.get(`/history/date/year/${year}/${month}/${day}`, {
                cancelToken: cancelTokenSource.token,
            });
            console.log(response.data)
            setData(response.data);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            cancelTokenSource.cancel('Component is unmounting');
        };
    }, []);

    /**
     * Sends request to delete transaction history
     */
    const removeHistory = async (id) => {
        await axios.delete(`/history/${id}`)
        fetchData()
    }

    /**
     * Render histories if available
     */
    if (data.length > 0) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead style={{backgroundColor: '#363636'}}>
                            <TableRow style={{backgroundColor: '#363636'}}>
                                <StyledTableCell width='10%'>Category name</StyledTableCell>
                                <StyledTableCell width='15%' align="left">Cost</StyledTableCell>
                                <StyledTableCell width='65%' align="left">Comment</StyledTableCell>
                                <StyledTableCell width='10%' align="left"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <StyledTableRow hover>
                                    <StyledTableCell align="left">
                                        {item.category.name}

                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {item.transactionValue} $
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {item.comment === null ? "" : item.comment}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button variant="outlined" onClick={() => removeHistory(item.id)}>
                                            REMOVE
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    } else {
        return (<div></div>);
    }
}

export default HistoryList;