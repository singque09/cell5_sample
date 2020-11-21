import {
    Hidden,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import React from "react";
import { useGames } from "../hooks/GameProvider";
import TablePaginationActions from "./GameTablePagination";
import ResponsiveTable from "./ResponsiveTable";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableCell(props) {
    const {
        classes,
        order,
        orderBy,
        onRequestSort,
        numeric,
        id,
        label
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableCell
            align={numeric ? "right" : "left"}
            sortDirection={orderBy === id ? order : false}
        >
            <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : "asc"}
                onClick={createSortHandler(id)}
            >
                {label}
                {orderBy === id ? (
                    <span className={classes.visuallyHidden}>
                        {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                    </span>
                ) : null}
            </TableSortLabel>
        </TableCell>
    );
}

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
        [theme.breakpoints.down("xs")]: {
            minWidth: 270
        }
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

export default function GameTable() {
    const classes = useStyles();
    const { games } = useGames();

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("title");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const rows = games;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <Hidden smUp>
                            <TableCell />
                        </Hidden>
                        <EnhancedTableCell
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            numeric={Boolean(false)}
                            id={"title"}
                            label={"Title"}
                        />
                        <Hidden xsDown>
                            <EnhancedTableCell
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                numeric={Boolean(true)}
                                id={"publisher"}
                                label={"Publisher"}
                            />
                            <EnhancedTableCell
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                numeric={Boolean(true)}
                                id={"rentDate"}
                                label={"Rent Date"}
                            />
                            <EnhancedTableCell
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                numeric={Boolean(true)}
                                id={"returnDate"}
                                label={"Return Date"}
                            />
                            <EnhancedTableCell
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                numeric={Boolean(true)}
                                id={"daysRented"}
                                label={"Days Rented"}
                            />
                        </Hidden>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                            <ResponsiveTable row={row} />
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Hidden smUp>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                colSpan={3}
                                labelRowsPerPage="Games per page:"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </Hidden>
                        <Hidden xsDown>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                colSpan={6}
                                labelRowsPerPage="Games per page:"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </Hidden>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
