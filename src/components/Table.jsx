import * as React from 'react';
import axios from "axios";

export class DisplayTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get(this.props.apiUrl)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }

    deleteClick = (id) => {
        axios.delete(this.props.apiUrl + '/' + id)
            .then(res => {
                this.setState({ data: this.state.data.filter(item => item.id !== id) });
            })
    }

    render() {
        const { data } = this.state;
        return (
            <div className="table-wrapper">
                <table className="table table-hover caption-top" >
                    <caption>List of {this.props.entity + 's'}</caption>
                    <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        {this.props.entity === 'student' ? (
                            <>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Faculty Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Year</th>
                            </>
                        ) : (this.props.entity === 'professor' ? (
                            <>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Faculty Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Cellphone</th>
                            </>
                        ) : (
                            <>
                                <th>Name</th>
                                <th>Credits</th>
                            </>
                        ))}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {this.props.entity === 'student' ? (
                        <>
                            {data.map((row) => (
                                <tr key={row.id} >
                                    <td>{row.id}</td>
                                    <td>{row.firstName}</td>
                                    <td>{row.lastName}</td>
                                    <td>{row.facultyName}</td>
                                    <td>{row.address}</td>
                                    <td>{row.email}</td>
                                    <td>{row.numberYear}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.deleteClick(row.id)}>Delete</button>
                                    </td>
                                </tr>))}
                        </>
                    ) : (this.props.entity === 'professor' ? (
                        <>
                            {data.map((row) => (
                                <tr key={row.id} >
                                    <td>{row.id}</td>
                                    <td>{row.firstName}</td>
                                    <td>{row.lastName}</td>
                                    <td>{row.facultyName}</td>
                                    <td>{row.address}</td>
                                    <td>{row.email}</td>
                                    <td>{row.cellphone}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.deleteClick(row.id)}>Delete</button>
                                    </td>
                                </tr>))}
                        </>
                    ) : (
                        <>
                            {data.map((row) => (
                                <tr key={row.id} >
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.credits}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.deleteClick(row.id)}>Delete</button>
                                    </td>
                                </tr>))}
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DisplayTable;