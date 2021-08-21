import React, {useEffect, useRef, useState} from "react";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@material-ui/core";
import Budget from "../../themes/components/dashboard/Budget";
import {useDispatch, useSelector} from "react-redux";
import {
    getUserTransaction,
    getWallet,
    withDrawalAction,
} from "../../store/action/walletAction";
import {Pagination} from "@material-ui/lab";
import ChipWithStatus from "../../components/ChipWithStatus/ChipWithStatus";
import PaypalSmartButton from "../../components/PaypalSmartButton/PaypalSmartButton";
import MetaTag from "../../components/MetaTag";

export default function Wallets(props) {
    const emailRef = useRef();
    const amountRef = useRef();
    const [amountDeposit, setAmountDeposit] = useState(1);

    const amountDepositChangeHandler = (e) => {
        setAmountDeposit(e.target.value);
    };

    const withDrawalHandler = () => {
        dispatch(
            withDrawalAction({
                email: emailRef.current.value,
                amount: amountRef.current.value,
            })
        );
    };

    const wallet = useSelector((state) => state.wallet);

    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        if (value === wallet.page) return;
        dispatch(getUserTransaction(value));
    };

    useEffect(() => {
        try {
            dispatch(getWallet());
            dispatch(getUserTransaction());
        } catch (err) {
            console.log(err.response);
        }
    }, []);

    return (
        <div>
            <>
                <Box
                    sx={{
                        backgroundColor: "background.default",
                        minHeight: "100%",
                        py: 3,
                    }}
                >
                    <Container maxWidth={false}>
                        <Grid container spacing={3}>
                            <Grid item sm={4} xs={12}>
                                <Budget balance={wallet.balance}/>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography component={"h2"}>Withdrawal</Typography>
                                        <div>
                                            <TextField
                                                style={{width: "100%"}}
                                                id="wallet-email"
                                                inputRef={emailRef}
                                                label="Email"
                                            />
                                        </div>
                                        <TextField
                                            id="wallet-amount"
                                            inputRef={amountRef}
                                            type={"number"}
                                            label="Amount"
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={withDrawalHandler}
                                        >
                                            Action
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography component={"h2"}>Deposit</Typography>
                                        <TextField
                                            onChange={amountDepositChangeHandler}
                                            defaultValue={1}
                                            id="standard-error-helper-text"
                                            helperText={amountDeposit <= 0 ? "Invalid amount" : null}
                                            error={amountDeposit <= 0}
                                            type={"number"}
                                            label="Amount"
                                        />
                                    </CardContent>

                                    <CardActions>
                                        {amountDeposit > 0 ? (
                                            <PaypalSmartButton amount={amountDeposit}/>
                                        ) : null}
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item lg={3} xl={3} xs={12}></Grid>

                            <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
                            <Grid item md={12} xl={12} xs={12}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                                <TableCell align="right">Balance</TableCell>
                                                <TableCell align="right">Payment method</TableCell>
                                                <TableCell align="right">Payment type</TableCell>
                                                <TableCell align="right">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {wallet.transactions.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.id}</TableCell>
                                                    {
                                                        row.paymentType !== 'DONATE' ?
                                                            <TableCell align="right">{row.amount}</TableCell> :
                                                            <TableCell
                                                                align="right">{row.receiver ? `+${row.amount}` : `-${row.amount}`}</TableCell>
                                                    }
                                                    <TableCell align="right">{row.balance}</TableCell>
                                                    <TableCell align="right">
                                                        {row.paymentMethod}
                                                    </TableCell>
                                                    <TableCell align="right">{row.paymentType}</TableCell>
                                                    <TableCell align="right">
                                                        <ChipWithStatus
                                                            status={row.status}
                                                            // style={{backgroundColor:'black'}}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid container justify={"center"}>
                                <Grid item>
                                    <Pagination
                                        variant={"outlined"}
                                        count={wallet.totalPage}
                                        page={wallet.page}
                                        onChange={handleChange}
                                        color={"primary"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <MetaTag>My Wallet</MetaTag>
            </>
        </div>
    );
}
