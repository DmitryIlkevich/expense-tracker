import * as React from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

/**
 * Class to pick transaction history date.
 */
export default function HistoryDate({onNotifyDateSelect}) {
    const [selectedDate, setSelectedDate] = React.useState(null);

    /**
     * Updates date at component state and notifies subscribers
     * @param date Date
     */
    const handleDateChange = (date) => {
        setSelectedDate(date);
        onNotifyDateSelect(date.format('DD-MM-YYYY'))
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{width: '80%'}}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}