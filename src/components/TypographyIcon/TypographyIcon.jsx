import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

TypographyIcon.defaultProps = {
    align: "left",
    variant: "body1",
    justify: "flex-start"
}

function TypographyIcon({align, variant, justify, iconComponent, children}) {
    return (
        <Grid container
              justify={justify}
              alignItems="center"
        >
            {iconComponent}
            <Typography align={align}
                        variant={variant}
                        style={{paddingTop: 5, paddingLeft: 6}}>
                {children}
            </Typography>
        </Grid>
    )
}

export default TypographyIcon;