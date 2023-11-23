import * as React from 'react';
import Button from '@mui/material/Button';
import {SnackbarProvider, useSnackbar} from 'notistack';

/**
 * After saving transaction history to database shows success popup
 */
function Popup() {
    const {enqueueSnackbar} = useSnackbar();

    const handleClickVariant = (variant) => () => {
        enqueueSnackbar('This is a success message!', {variant});
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
        </React.Fragment>
    );
}

/**
 * Renders success popup
 */
export default function SuccessPopup() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Popup/>
        </SnackbarProvider>
    );
}