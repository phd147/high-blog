import { Helmet } from 'react-helmet';
import {
    Avatar,
    Box, Button, Card, CardActions, CardContent, CardHeader,
    Container, Divider,
    Grid, TextField, Typography
} from '@material-ui/core';
import AccountProfile from '../../themes/components/account/AccountProfile';
import AccountProfileDetails from '../../themes/components/account/AccountProfileDetails';
import moment from "moment";

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

const Account = () => (
  <>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
              <Card >
                  <CardContent>
                      <Box
                          sx={{
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'column'
                          }}
                      >
                          <Avatar
                              src={user.avatar}
                              sx={{
                                  height: 100,
                                  width: 100
                              }}
                          />
                          <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h3"
                          >
                              {user.name}
                          </Typography>
                          <Typography
                              color="textSecondary"
                              variant="body1"
                          >
                              {`${user.city} ${user.country}`}
                          </Typography>
                          <Typography
                              color="textSecondary"
                              variant="body1"
                          >
                              {`${moment().format('hh:mm A')} ${user.timezone}`}
                          </Typography>
                      </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                      <Button
                          color="primary"
                          fullWidth
                          variant="text"
                      >
                          Upload picture
                      </Button>
                  </CardActions>
              </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
              <form
                  autoComplete="off"
                  noValidate

              >
                  <Card>
                      <CardHeader
                          subheader="The information can be edited"
                          title="Profile"
                      />
                      <Divider />
                      <CardContent>
                          <Grid
                              container
                              spacing={3}
                          >
                              <Grid
                                  item
                                  md={6}
                                  xs={12}
                              >
                                  <TextField
                                      fullWidth
                                      helperText="Please specify the first name"
                                      label="First name"
                                      name="firstName"

                                      required

                                      variant="outlined"
                                  />
                              </Grid>
                              <Grid
                                  item
                                  md={6}
                                  xs={12}
                              >
                                  <TextField
                                      fullWidth
                                      label="Last name"
                                      name="lastName"

                                      required

                                      variant="outlined"
                                  />
                              </Grid>
                              <Grid
                                  item
                                  md={6}
                                  xs={12}
                              >
                                  <TextField
                                      fullWidth
                                      label="Email Address"
                                      name="email"

                                      required

                                      variant="outlined"
                                  />
                              </Grid>
                              <Grid
                                  item
                                  md={6}
                                  xs={12}
                              >
                                  <TextField
                                      fullWidth
                                      label="Phone Number"
                                      name="phone"

                                      type="number"

                                      variant="outlined"
                                  />
                              </Grid>
                              <Grid
                                  item
                                  md={6}
                                  xs={12}
                              >
                                  <TextField
                                      fullWidth
                                      label="Country"
                                      name="country"

                                      required

                                      variant="outlined"
                                  />
                              </Grid>
                              <Grid
                                  item
                                  md={6}
                                  xs={12}
                              >
                                  <TextField
                                      fullWidth
                                      label="Select State"
                                      name="state"

                                      required

                                      SelectProps={{ native: true }}

                                      variant="outlined"
                                  >

                                  </TextField>
                              </Grid>
                          </Grid>
                      </CardContent>
                      <Divider />
                      <Box
                          sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              p: 2
                          }}
                      >
                          <Button
                              color="primary"
                              variant="contained"
                          >
                              Save details
                          </Button>
                      </Box>
                  </Card>
              </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
