import React, { createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function createData(
    componentId,
    id,
    title,
    publisher,
    rentDate,
    returnDate,
    totalDays
) {
    return {
        componentId,
        id,
        title,
        publisher,
        rentDate,
        returnDate,
        totalDays
    };
}

const baseURL = "http://localhost:8000/api/games";

const GameContext = createContext();
export const useGames = () => useContext(GameContext);

export default function GameProvider({ children }) {
    const [originalGames, setOriginalGames] = React.useState([]);
    const [games, setGames] = React.useState([]);
    const [dialogEntry, setDialogEntry] = React.useState({
        title: "",
        publisher: "",
        rentDate: "",
        returnDate: ""
    });
    const [open, setOpen] = React.useState(false);
    const [isCreateDialog, setIsCreateDialog] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [alertMessage, setAlertMessage] = React.useState({
        open: false,
        type: "",
        body: ""
    });

    const GetData = async () => {
        const result = await axios(baseURL);
        setOriginalGames(
            result.data.data.map(game =>
                createData(
                    uuidv4(),
                    game.id,
                    game.name,
                    game.publisher,
                    game.rent_date,
                    game.return_date,
                    game.days_rented
                )
            )
        );
        setIsLoading(false);
    };

    useEffect(() => {
        GetData();
    }, []);

    useEffect(() => {
        setGames(originalGames);
    }, [originalGames]);

    const addGame = (title, publisher, rentDate) => {
        let data = {
            name: title,
            publisher,
            rent_date: rentDate
        };
        axios
            .post(baseURL, data)
            .then(res =>
                setAlertMessage({
                    open: true,
                    type: "success",
                    body: res.data.message
                })
            )
            .catch(err => {
                console.log(err);
            });
        GetData();
    };

    const updateGame = (
        id,
        title,
        publisher,
        rentDate,
        returnDate,
        totalDays
    ) => {
        let data = {
            name: title,
            publisher,
            rent_date: rentDate,
            return_date: returnDate,
            days_rented: totalDays
        };
        axios.put(`${baseURL}/${id}`, data).then(res =>
            setAlertMessage({
                open: true,
                type: "info",
                body: res.data.message
            })
        );
        GetData();
    };

    const removeGame = id => {
        axios.delete(`${baseURL}/${id}`).then(res =>
            setAlertMessage({
                open: true,
                type: "warning",
                body: res.data.message
            })
        );
        GetData();
    };

    const handleClickOpen = val => {
        if (val) {
            const index = games.findIndex(game => game.id === val);
            setDialogEntry(games[index]);
            setIsCreateDialog(false);
        } else {
            setIsCreateDialog(true);
        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setDialogEntry({
            title: "",
            publisher: "",
            rentDate: "",
            returnDate: ""
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertMessage({
            open: false,
            type: "",
            body: ""
        });
    };

    const searchGames = title =>
        setGames(
            originalGames.filter(game =>
                game.title.toLowerCase().includes(title.toLowerCase())
            )
        );
    return (
        <GameContext.Provider
            value={{
                open,
                dialogEntry,
                games,
                isCreateDialog,
                isLoading,
                alertMessage,
                addGame,
                removeGame,
                updateGame,
                handleClickOpen,
                handleCloseDialog,
                handleCloseSnackbar,
                searchGames
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
