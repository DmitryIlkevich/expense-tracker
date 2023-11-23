import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import axios from "axios";

/**
 * Contains form for creating new category.
 * @param onNotifyParentNewCategoryCreated After new category created notifies parent class
 */
const NewCategory = ({onNotifyParentNewCategoryCreated}) => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [newCategoryName, setNewCategoryName] = React.useState(false);
    const [newCategoryDescription, setNewCategoryDescription] = React.useState(false);

    /**
     * Opens dialog
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * Closes dialog
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Send POST request to backend to create new category.
     */
    const handleSave = async () => {
        const {data} = await axios.post('/category', {
                name: {newCategoryName}.newCategoryName,
                description: {newCategoryDescription}.newCategoryDescription
            }
            , {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        onNotifyParentNewCategoryCreated();
        handleClose();
    };

    /**
     * Updates category name state
     */
    const handleNameChange = (event) => {
        setNewCategoryName(event.target.value);
    };

    /**
     * Updates category description state
     */
    const handleDescriptionChange = (event) => {
        setNewCategoryDescription(event.target.value);
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
                <DialogTitle>Create new category</DialogTitle>
                <DialogContent>

                    <Box component="form" sx={{'& > :not(style)': {m: 1, width: '25ch'},}} noValidate
                         autoComplete="off">
                        <TextField onChange={handleNameChange} required id="filled-basic" label="Name" variant="filled"
                                   style={{width: '80%'}}/>
                        <br/>
                        <TextField onChange={handleDescriptionChange} id="filled-basic" label="Description"
                                   variant="filled" style={{width: '80%'}}/>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NewCategory;