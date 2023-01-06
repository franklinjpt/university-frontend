import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

export class TableMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        axios.get(this.props.apiUrl)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }

    render() {
        const { data } = this.state;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            {this.props.entity === 'student' ? (
                                <>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Faculty Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Year</TableCell>
                                </>
                            ) : ( this.props.entity === 'professor' ? (
                                <>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Faculty Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Cellphone</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Credits</TableCell>
                                </>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.entity === 'student' ? (
                            <>
                                {data.map((row) => (
                                    <TableRow key={row.id} >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.facultyName}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.numberYear}</TableCell>
                                    </TableRow>))}
                            </>
                        ) : ( this.props.entity === 'professor' ? (
                            <>
                                {data.map((row) => (
                                    <TableRow key={row.id} >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.facultyName}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.cellphone}</TableCell>
                                    </TableRow>))}
                            </>
                        ) : (
                            <>
                                {data.map((row) => (
                                    <TableRow key={row.id} >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.credits}</TableCell>
                                    </TableRow>))}
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default TableMenu;
