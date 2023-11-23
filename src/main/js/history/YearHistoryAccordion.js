import * as React from 'react';
import {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import MonthHistoryAccordion from './MonthHistoryAccordion'

/**
 * Retrieves all available years with contain transactions and renders them
 */
export default function YearHistoryAccordion() {
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const cancelTokenSource = axios.CancelToken.source();
    const [years, setYears] = React.useState([]);

    /**
     * Expands specific year panel
     */
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /**
     * Calls backend to get years to render
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/history/date/year', {
                    cancelToken: cancelTokenSource.token,
                })

                await Promise.all(
                    response.data.map(async (item, index) => {
                        const res = await axios.get(`spend/tracker/${item}`, {
                            cancelToken: cancelTokenSource.token,
                        });

                        years[index] = res.data;
                        setYears(years)
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

        return () => {
            cancelTokenSource.cancel('Component is unmounting');
        };
    }, []);

    return (
        data.map((item, index) => (
            <React.Fragment>
                <Accordion style={{backgroundColor: '#E4DECF', marginTop: '5px'}}
                           expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>

                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls={"panel" + index + "bh-content"}
                                      id={"panel" + index + "bh-header"}>
                        <Typography sx={{width: '95%', flexShrink: 0}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>{item}</div>
                                <div style={{textAlign: 'right', fontWeight: 'bold'}}>{years[index]} USD</div>
                            </div>
                        </Typography>
                    </AccordionSummary>

                    {expanded && (
                        <AccordionDetails>
                            <MonthHistoryAccordion year={item}/>
                        </AccordionDetails>
                    )}
                </Accordion>
            </React.Fragment>
        ))
    );
}