import * as React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
<<<<<<< Updated upstream
=======
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
>>>>>>> Stashed changes

const DisplayTable = (props) => {
    const navigateTo = useNavigate();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get(props.apiUrl)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    const deleteClick = (id) => {
        axios.delete(props.apiUrl + '/' + id)
            .then(res => {
                setData(data.filter(item => item.id !== id));
<<<<<<< Updated upstream
                alert('Deleted successfully!');
            })
            .catch(error => {
                alert('Status: ' + error.request.status +' - Error deleting! ' + error.request.response );
=======
                MySwal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Entity deleted successfully!'
                })
            })
            .catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
>>>>>>> Stashed changes
            });
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead className="table-dark">
                <tr>
                    {Object.keys(props.dataFields).map((key, index) => {
                        return <th key={index}>{props.dataFields[key]}</th>
                    })}
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(props.dataFields).map((key, index) => {
                            return <td key={index}>{item[key]}</td>
                        })}

                        <td>
                            <button className="btn btn-warning me-1" onClick={() => navigateTo('/editentity', {state: {entity: props.entity, data: props.dataFields, id: item.id}})}>Edit</button>
                            <button className="btn btn-danger me-1" onClick={() => deleteClick(item.id) }>Delete</button>
                            <button className="btn btn-primary" onClick={() => navigateTo('/viewentity', {state: {entity: props.entity, data: Object.values(props.dataFields), id: item.id}})}>View</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DisplayTable;