import React from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";

const ViewEntity = () => {
    const location = useLocation();
    const fields = location.state.data;

    const [data, setData] = React.useState({});

    React.useEffect(() => {
        axios.get('http://localhost:8080/university/api/' + location.state.entity + '/' + location.state.id)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (

        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h1>{location.state.entity}</h1>
            <div className="row">
                {Object.keys(data).map((key, index) => {
                    return (
                        <div className="d-inline-flex" key={index}>
                            <p className="me-1 "><strong>{fields[index]}: </strong></p>
                            {data[key] === "" ? <p className="text-secondary">Not specified</p> : <p>{data[key]}</p>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default ViewEntity;