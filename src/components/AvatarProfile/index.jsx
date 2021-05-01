import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FormDialog from '../EditAvatar';

function AvatarProfile(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
    const useStyles = makeStyles({
        root: {
          Width: '100%',
        },
        media: {
          width:'100%',
          height: 350,
        },
        large: {
          marginTop:-185,
          width:200,
          height:200,
          paddingBottom:10,
        },
        icon:{
          marginLeft:160,
          marginTop:-70,
        },
        button: {
          marginTop:300,
          marginRight:15,
        },
        dashboard:{
          marginLeft:50,
          backgroundColor:'#FFFFFF',
          borderRadius:"15%"
        },
        content:{
          backgroundColor:'#000000',
          marginLeft:50,
          marginRight:100,
        }
      });
    const classes = useStyles();
    const getForm = ()=>{
        if(open) {
            console.log('tuanthah')
            return <FormDialog open ={open} handleForm = {handleClose}/> }else{
                console.log('ko')
            }
    }
    return (
        <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image="https://sites.google.com/site/hinhanhdep24h/_/rsrc/1436687439788/home/hinh%20anh%20thien%20nhien%20dep%202015%20%281%29.jpeg"
                title="Contemplative Reptile"
                
              >

              <Grid item md={12} container direction="row" justify="flex-end" alignItems="flex-end">
              <Button variant = "contained" color = "#000000" className ={classes.button} onClick={handleClickOpen}>
              <CameraAltIcon/>Chỉnh sửa ảnh bìa
              </Button>
              </Grid>
              </CardMedia>
              
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <Grid container justify="center">
                <Avatar alt="Remy Sharp" src="" className={classes.large} />
                </Grid>
                <Grid  container justify="center">
                <Fab className={classes.icon} aria-label="add" size='small'>
                <CameraAltIcon />
                </Fab>
                </Grid>
                <Grid container justify="center">
                  Nguyễn Sỹ Tuấn Thành
                </Grid>
                </Typography>
                <Divider/>
                <Typography>
                    {getForm()}
                </Typography>
                </CardContent>
        </Card>
    )
}

export default AvatarProfile
