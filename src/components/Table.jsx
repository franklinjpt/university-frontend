import * as React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm caption-top">
                <caption>List of {props.entity + 's'}</caption>
                <thead className="table-dark">
                <tr>
                    {props.entity === 'subject' ? <th scope="col">Id</th> : null}
                    {Object.keys(props.dataFields).map((key, index) => {
                        return <th key={index}>{props.dataFields[key]}</th>
                    })}
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {props.entity === 'subject' ? <td>{item.id}</td> : null}
                        {Object.keys(props.dataFields).map((key, index) => {
                            return <td key={index}>{item[key]}</td>
                        })}

                        <td>
                            <button className="btn btn-warning" onClick={() => navigateTo('/editentity', {state: {entity: props.entity, data: props.dataFields, id: item.id}})}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DisplayTable;