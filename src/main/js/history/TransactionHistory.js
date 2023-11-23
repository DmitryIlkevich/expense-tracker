import * as React from 'react';
import YearHistoryAccordion from "./YearHistoryAccordion";
import NewTransactionHistory from "./NewTransactionHistory";
import {useSnackbar} from "notistack";

/**
 * Main object for interacting with transaction histories.
 */
function TransactionHistory() {
    const {enqueueSnackbar} = useSnackbar();

    const handleClickVariant = (variant) => () => {
        enqueueSnackbar('Transaction created', {variant});
    };

    return (
        <div>
            <YearHistoryAccordion/>
            <br/>
            <NewTransactionHistory onNotifySafe={handleClickVariant('success')}/>
        </div>
    )
}

export default TransactionHistory