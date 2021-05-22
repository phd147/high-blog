import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import styles from "./DonationButton.module.css";
import { FormControl, InputAdornment } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Fab } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { toast } from "react-toastify";
DonationButton.propTypes = {
  onDonateClick: PropTypes.func,
  isDonateLoading: PropTypes.bool,
};
DonationButton.defaultProps = {
  onDonateClick: null,
  isDonateLoading: false,
};

function DonationButton(props) {
  const { onDonateClick, isDonateLoading } = props;
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const amountRef = React.createRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    toast.error('Cancel Donate');
  };
  function handleDonateClick() {
    if (onDonateClick) onDonateClick(amountRef.current.value);
    if (!isDonateLoading) setOpen(false);
  }

  return (
    <div className={styles.container}>
      <Button
        style={{ height: "100%" }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        DONATE
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="donate-dialog">
        <DialogTitle id="form-dialog-title">Donation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the the amount of money you want to donate to writer
          </DialogContentText>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              inputRef={amountRef}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDonateClick} color="primary">
            DONATE
          </Button>
          {isDonateLoading && <CircularProgress />}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DonationButton;
