import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const yearOptions = [
    {
        value: 2019,
        label: "2019"
    },
    {
        value: 2018,
        label: "2018"
    },
    {
        value: 2017,
        label: "2017"
    },
    {
        value: 2016,
        label: "2016"
    },
    {
        value: 2015,
        label: "2015"
    },
    {
        value: 2014,
        label: "2014"
    },
    {
        value: 2013,
        label: "2013"
    },
    {
        value: 2012,
        label: "2012"
    },
    {
        value: 2011,
        label: "2011"
    },
    {
        value: 2010,
        label: "2010"
    },
    {
        value: 2009,
        label: "2009"
    }
];

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
  }),
);

export const YearSelect = ({ selectedYear, setSelectedYear }) => {

    const classes = useStyles();

    const handleChange = (event) => setSelectedYear(event.target.value);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                onChange={handleChange}
            >
                {yearOptions.map(({ value, label }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
            </Select>
        </FormControl>
    );
}