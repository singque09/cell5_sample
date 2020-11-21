import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useGames } from "../hooks/GameProvider";
import { useInput } from "../hooks/Inputs";

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 300,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
    toolbarButtons: {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(0),
            width: "100%",
            marginBottom: "30px",
          },
    },
    search: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "20px",
            width: "100%",
          },
    },
    toolbar: {
        display: "flex",
        flexWrap: "wrap",
    }
}));

export default function CrudToolbar() {
    const classes = useStyles();
    const { handleClickOpen, searchGames } = useGames();
    const [search] = useInput();
    const toolbarButtons = ["Rent"];
    return (
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
                Game Rentals
            </Typography>
            <FormControl className={classes.toolbarButtons}>
                <Input
                    placeholder="Search game title..."
                    {...search}
                    onChange={e => searchGames(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    className={classes.search}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        "aria-label": "weight"
                    }}
                />
            </FormControl>
            {toolbarButtons.map((item, index) => {
                return (
                    <Button
                        key={index}
                        variant={"contained"}
                        className={classes.toolbarButtons}
                        color="primary"
                        onClick={() => handleClickOpen()}
                    >
                        {item}
                    </Button>
                );
            })}

        </Toolbar>
    );
}
