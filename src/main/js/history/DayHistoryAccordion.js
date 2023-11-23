import * as React from 'react';
import {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import HistoryList from './HistoryList'

/**
 * Shows money spend for the specific day for all transaction histories
 */
const DayHistoryAccordion = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const cancelTokenSource = axios.CancelToken.source();
    const [day, setDay] = React.useState([]);

    const {year, month} = props;

    /**
     * Handles panel change
     */
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /**
     * Retrieve all days available with transaction history for the specific month of the year
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/history/date/year/${year}/${month}`, {
                    cancelToken: cancelTokenSource.token,
                });

                await Promise.all(
                    response.data.map(async (item, index) => {
                        const res = await axios.get(`spend/tracker/${year}/${month}/${item}`, {
                            cancelToken: cancelTokenSource.token,
                        });

                        day[index] = res.data;
                        setDay(day)
                    }));

                setData(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();

        /**
         * Cleanup function to cancel the request when the component is unmounted
         */
        return () => {
            cancelTokenSource.cancel('Component is unmounting');
        };
    }, []);

    return (
        data.map((item, index) => (
            <React.Fragment>
                <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>

                    <AccordionSummary style={{backgroundColor: '#C6BFBF', marginTop: '5px'}}
                                      expandIcon={<ExpandMoreIcon/>} aria-controls={"panel" + index + "bh-content"}
                                      id={"panel" + index + "bh-header"}>
                        <Typography sx={{width: '95%', flexShrink: 0}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>{item}</div>
                                <div style={{textAlign: 'right', fontWeight: 'bold'}}>{day[index]} USD</div>
                            </div>
                        </Typography>
                    </AccordionSummary>

                    {expanded && (
                        <AccordionDetails>
                            <HistoryList year={year} month={month} day={item}/>
                        </AccordionDetails>
                    )}
                </Accordion>
            </React.Fragment>
        ))


    );
}

export default DayHistoryAccordion;