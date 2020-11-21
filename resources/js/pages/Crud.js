import React from "react";
import {
    Paper,
    makeStyles,
    Grid,
    CircularProgress,
    Backdrop,
    Snackbar
} from "@material-ui/core";
import CrudToolbar from "../components/Toolbar";
import GameTable from "../components/GameTable";
import GameDialog from "../components/GameDialog";
import MuiAlert from '@material-ui/lab/Alert';
import { useGames } from "../hooks/GameProvider";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 300,
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1
    },
    toolbarButtons: {
        marginLeft: theme.spacing(2)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "white"
    }
}));

export default function Crud() {
    const { isLoading, alertMessage, handleCloseSnackbar } = useGames();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    if (isLoading) {
        return (
            <Backdrop className={classes.backdrop} open={Boolean(true)}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <CrudToolbar />
                        <GameTable />
                    </Paper>
                </Grid>
            </Grid>
            <GameDialog />
            <Snackbar
                open={alertMessage.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={alertMessage.type}>
                    {alertMessage.body}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
