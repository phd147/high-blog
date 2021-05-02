import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Avatar, Button, CardActionArea, DialogActions, DialogTitle, InputAdornment, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';

export default function FormDialog(props) {
  const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });
const classes = useStyles();
const [selectedFile, setselectedFile] = useState();
const fileSelectedHandler = (event) =>{
  //console.log(event.target.files[0])
  setselectedFile(event.target.files[0]);
  console.log(event.target.files[0])
}
  return (
    <div>
      <Dialog open={props.open} onClose = {()=>{props.handleForm()}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Đổi ảnh nào</DialogTitle>
        <DialogContent className = {classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <label style = {{display:'contents'}}>
              <ListItemIcon>
              <Avatar alt="Remy Sharp" src="https://d22tvc7yc0tvsy.cloudfront.net/packs/media/_/_/vcv_editor/app/javascript/assets/image/avatar-16635ceb9d1a8ef9e7077d97764039a5.png" className={classes.large} />
              <TextField type='file' onChange = {(event)=>{fileSelectedHandler(event)}}  style = {{display:'none'}}/>
              </ListItemIcon>
              <ListItemText primary="Bấm vào đây để chọn ảnh" />
              </label>


            </ListItem>
            <ListItem button>
              <ListItemIcon>
              <Avatar alt="Remy Sharp" src="" className={classes.large} />
              </ListItemIcon>
              <ListItemText primary="Không sử dụng ảnh" />
            </ListItem>

          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.handleForm()}}color="primary">
            Disagree
          </Button>
          <Button onClick={(item)=>{props.handleUpdateForm(selectedFile)}} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
