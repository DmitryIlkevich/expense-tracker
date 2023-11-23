import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import axios from "axios";
import CategorySelect from "./CategorySelect";
import HistoryDate from "./HistoryDate";

/**
 * Responsible for creating new transaction history
 */
const NewTransactionHistory = ({onNotifySafe}) => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [cost, setNewCost] = React.useState(false);
    const [date, setNewDate] = React.useState('');
    const [comment, setNewComment] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = useState(-1);

    /**
     * Opens window popup
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * Closes window popup
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Saves new transaction history at database
     */
    const handleSave = async () => {
        const {data} = await axios.post('/history', {
                id: -1,
                cost: {cost}.cost,
                date: {date}.date,
                categoryId: {selectedCategory}.selectedCategory,
                comment: {comment}.comment
            }
            , {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        handleClose();
        onNotifySafe();
    };

    /**
     * Saves comment state
     */
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    /**
     * Saves date state
     */
    const handleDateChange = (event) => {
        console.log("set new date: " + event)
        setNewDate(event);
    };

    /**
     * Saves cost state
     */
    const handleCostChange = (event) => {
        setNewCost(event.target.value);
    };

    /**
     * Saves category selection
     */
    const notifyCategorySelect = (event) => {
        setSelectedCategory(event);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
                <DialogActions>
                    <Button onClick={handleClose}>X</Button>
                </DialogActions>
                <DialogTitle>Create new transaction history</DialogTitle>
                <DialogContent>

                    <Box component="form" sx={{'& > :not(style)': {m: 1, width: '25ch'},}} noValidate
                         autoComplete="off">
                        <HistoryDate onNotifyDateSelect={handleDateChange}/>
                        <br/>
                        <CategorySelect notifyCategorySelect={notifyCategorySelect}/>
                        <br/>
                        <TextField onChange={handleCostChange} id="filled-basic" label="Cost" variant="filled"
                                   style={{width: '80%'}}/>
                        <br/>
                        <TextField onChange={handleCommentChange} id="filled-basic" label="Comment" variant="filled"
                                   style={{width: '80%'}}/>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <React.Fragment>
                        <Button onClick={handleSave}>Save</Button>
                    </ React.Fragment>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NewTransactionHistory;