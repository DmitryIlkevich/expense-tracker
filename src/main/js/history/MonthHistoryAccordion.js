import * as React from 'react';
import {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import DayHistoryAccordion from './DayHistoryAccordion'
import Typography from "@mui/material/Typography";

/**
 * Available months
 */
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

/**
 * Renders panel containing available months for the specific year
 */
const MonthHistoryAccordion = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const cancelTokenSource = axios.CancelToken.source();
    const [month, setMonth] = React.useState([]);
    const {year} = props;

    /**
     * Changes state for expanded panel
     */
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/history/date/year/${year}`, {
                    cancelToken: cancelTokenSource.token,
                });

                await Promise.all(
                    response.data.map(async (item, index) => {
                        const res = await axios.get(`spend/tracker/${year}/${item}`, {
                            cancelToken: cancelTokenSource.token,
                        });
                        month[index] = res.data;
                        setMonth(month)
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
                <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>

                    <AccordionSummary style={{backgroundColor: '#E5E5E5', marginTop: '5px'}}
                                      expandIcon={<ExpandMoreIcon/>} aria-controls={"panel" + index + "bh-content"}
                                      id={"panel" + index + "bh-header"}>
                        <Typography sx={{width: '95%', flexShrink: 0}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>{months[item - 1]}</div>
                                <div style={{textAlign: 'right', fontWeight: 'bold'}}>{month[index]} USD</div>
                            </div>
                        </Typography>
                    </AccordionSummary>

                    {expanded && (
                        <AccordionDetails>
                            <DayHistoryAccordion year={year} month={item}/>
                        </AccordionDetails>
                    )}
                </Accordion>
            </React.Fragment>
        ))
    );
}

export default MonthHistoryAccordion;