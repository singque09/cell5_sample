import {
    Box,
    Collapse,
    Hidden,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React from "react";
import { useGames } from "../hooks/GameProvider";

export default function ResponsiveTable({ row }) {
    const { removeGame, handleClickOpen } = useGames();
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow key={row.id} hover>
                <Hidden smUp>
                    <TableCell width={1}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    </TableCell>
                </Hidden>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <Hidden xsDown>
                    <TableCell align="right">{row.publisher}</TableCell>
                    <TableCell align="right">{row.rentDate}</TableCell>
                    <TableCell align="right">{row.returnDate}</TableCell>
                    <TableCell align="right">{row.totalDays}</TableCell>
                </Hidden>
                <TableCell align="right" width={70}>
                    <IconButton
                        onClick={() => handleClickOpen(row.id)}
                        color="primary"
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => removeGame(row.id)}
                        color="secondary"
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <Hidden smUp>
                <TableRow key={row.id}>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 0
                        }}
                        colSpan={6}
                    >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Additional Info
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                Publisher
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.publisher}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                Rent Date
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.rentDate}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                Return Date
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.returnDate}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                Days Rented
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.totalDays}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Hidden>
        </React.Fragment>
    );
}
