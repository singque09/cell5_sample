import React from "react";
import Crud from "./pages/Crud";
import { Container, makeStyles } from "@material-ui/core";
import GameProvider from "./hooks/GameProvider";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "3rem"
    }
}));

export default function App() {
    const classes = useStyles();
    return (
        <GameProvider>
            <Container maxWidth={"md"} className={classes.root}>
                <Crud />
            </Container>
        </GameProvider>
    );
}
