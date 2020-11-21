import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import React from "react";
import { useGames } from "../hooks/GameProvider";
import { useInput } from "../hooks/Inputs";
import validate from "../hooks/validation";

export default function GameDialog() {
    const {
        addGame,
        updateGame,
        dialogEntry,
        open,
        isCreateDialog,
        handleCloseDialog
    } = useGames();
    const { title, publisher, rentDate, returnDate } = dialogEntry;
    const [gameTitle, setTitle] = useInput(title);
    const [gamePublisher, setPublisher] = useInput(publisher);
    const [gameRentDate, setRentDate] = useInput(rentDate);
    const [gameReturnDate, setReturnDate] = useInput(returnDate);
    const [errors, setErrors] = React.useState({
        title: "",
        publisher: "",
        rentDate: "",
        returnDate: ""
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleValidation = e => {
        e.preventDefault();
        setErrors(
            validate({
                title: gameTitle.value,
                publisher: gamePublisher.value,
                rentDate: gameRentDate.value,
                returnDate: gameReturnDate.value
            })
        );
        setIsSubmitting(true);
    };
    const handleSubmit = () => {
        if (isCreateDialog) {
            addGame(gameTitle.value, gamePublisher.value, gameRentDate.value);
        } else {
            var rentDate = new Date(gameRentDate.value);
            var returnDate = new Date(gameReturnDate.value);
            var differenceInTime = returnDate.getTime() - rentDate.getTime();
            var totalDays = differenceInTime / (1000 * 3600 * 24);
            updateGame(
                dialogEntry.id,
                gameTitle.value,
                gamePublisher.value,
                gameRentDate.value,
                gameReturnDate.value,
                totalDays
            );
        }
        setTitle("");
        setPublisher("");
        setRentDate("");
        setReturnDate("");
        handleCloseDialog();
        setIsSubmitting(false);
    };

    React.useEffect(() => {
        if (
            !errors.title.includes(" ") &&
            !errors.publisher.includes(" ") &&
            !errors.rentDate.includes(" ") &&
            !errors.returnDate.includes(" ") &&
            isSubmitting
        ) {
            handleSubmit();
        }
    }, [errors]);

    React.useEffect(() => {
        setTitle(title);
        setPublisher(publisher);
        setRentDate(rentDate);
        setReturnDate(returnDate);
        setErrors({
            title: "",
            publisher: "",
            rentDate: "",
            returnDate: ""
        });
        setIsSubmitting(false);
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={() => handleCloseDialog()}
            maxWidth="sm"
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={handleValidation}>
                <DialogTitle id="form-dialog-title">
                    Add Game Rental
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isCreateDialog
                            ? "Please fill the details below on the game that is to be rented."
                            : "Update the details below on the game that's been rented."}
                    </DialogContentText>
                    <TextField
                        error={errors.title.includes(" ") ? true : false}
                        margin="dense"
                        label="Game Title"
                        type="text"
                        {...gameTitle}
                        fullWidth
                        helperText={errors.title}
                    />
                    <TextField
                        error={errors.publisher.includes(" ") ? true : false}
                        margin="dense"
                        label="Publisher"
                        type="text"
                        {...gamePublisher}
                        fullWidth
                        helperText={errors.publisher}
                    />
                    <TextField
                        error={errors.rentDate.includes(" ") ? true : false}
                        margin="dense"
                        label="Rent Date"
                        type="date"
                        {...gameRentDate}
                        fullWidth
                        helperText={errors.rentDate}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    {isCreateDialog ? (
                        ""
                    ) : (
                        <TextField
                            error={
                                errors.returnDate.includes(" ") ? true : false
                            }
                            margin="dense"
                            label="Return Date"
                            type="date"
                            {...gameReturnDate}
                            min={gameRentDate.value}
                            fullWidth
                            helperText={errors.returnDate}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog()} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        {isCreateDialog ? "Rent" : "Update"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
