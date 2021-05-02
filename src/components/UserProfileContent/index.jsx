import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { MicNone } from '@material-ui/icons';
import Test from '../../containers/UserProfiles/Test';
import WriterInfoCard from '../WriterInfoCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} >
      <AppBar position="static" color="default" style = {{boxShadow:'none'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="POST" {...a11yProps(0)} />
          <Tab label="QUESTIONS" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <Grid container className = {classes.content} justify ='center'>
      <TabPanel value={value} index={0}>
        <Grid container spacing = {2}>
          <Grid item xs={12} ms = {12} md = {8}>
            <Test/>
          </Grid>
          <Grid item xs={0} ms = {0} md = {4}>
            <WriterInfoCard/>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Grid container justify = "center">
          <Test/>
          </Grid>
      </TabPanel>
      </Grid>
    </div>
  );
}
