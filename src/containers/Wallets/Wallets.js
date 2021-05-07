import React, {useEffect} from 'react';

import {Helmet} from "react-helmet";
import {
    Box, Chip,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import Budget from "../../themes/components/dashboard/Budget";
import {useDispatch, useSelector} from "react-redux";
import {getUserTransaction, getWallet} from "../../store/action/walletAction";

export default function Wallets(props){

    const balance = useSelector(state => state.wallet.balance);
    const transactions = useSelector(state => state.wallet.transactions)

    const dispatch = useDispatch();


    useEffect(() => {
        try {
            dispatch(getWallet());
            dispatch(getUserTransaction());

        }
        catch(err){
            console.log(err.response);
        }
    },[])

    return (
      <div>
          <>
              <Helmet>
                  <title>Dashboard | Material Kit</title>
              </Helmet>
              <Box
                  sx={{
                      backgroundColor: 'background.default',
                      minHeight: '100%',
                      py: 3
                  }}
              >
                  <Container maxWidth={false}>
                      <Grid
                          container
                          spacing={3}
                      >
                          <Grid
                              item
                              sm={4}


                              xs={12}
                          >
                              <Budget balance={balance} />
                          </Grid>
                          <Grid
                              item
                              sm={4}

                              xs={12}
                          >
                             <Paper>
                                 Withdrawal
                             </Paper>
                          </Grid>
                          <Grid
                              item
                              sm={4}


                              xs={12}
                          >
                              <Paper>
                                  Recharge
                              </Paper>
                          </Grid>
                          <Grid
                              item
                              lg={3}

                              xl={3}
                              xs={12}
                          >

                          </Grid>

                          <Grid
                              item
                              lg={4}
                              md={6}
                              xl={3}
                              xs={12}
                          >

                          </Grid>
                          <Grid
                              item

                              md={12}
                              xl={9}
                              xs={12}
                          >
                              <TableContainer component={Paper}>
                                  <Table  aria-label="simple table">
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
                                          {transactions.map((row) => (
                                              <TableRow key={row.id}>
                                                  <TableCell >
                                                      {row.id}
                                                  </TableCell>
                                                  <TableCell align="right">{row.amount}</TableCell>
                                                  <TableCell align="right">{row.balance}</TableCell>
                                                  <TableCell align="right">{row.paymentMethod}</TableCell>
                                                  <TableCell align="right">{row.paymentType}</TableCell>
                                                  <TableCell align="right">
                                                      <Chip
                                                          color="primary"
                                                          label={row.status}
                                                          size="small"
                                                      />
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </TableContainer>
                          </Grid>
                      </Grid>
                  </Container>
              </Box>
          </>
      </div>
    )
}