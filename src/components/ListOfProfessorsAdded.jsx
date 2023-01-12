import * as React from 'react';
import axios from "axios";

const ListOfProfessorsAdded = (props) => {
    const {idEntity, apiUrl} = props;

    const [data, setData] = React.useState({});

    React.useEffect(() => {
        axios.get(apiUrl + 'professor/subject/' + idEntity)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    return (
        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h2>List of professors added</h2>

            <div className="row">
                {data.length > 0 ? data.map((professor, index) => {
                    return (
                        <div className="d-inline-flex" key={index}>
                            <p className="me-1 "><strong>Name:</strong></p><br/>
                            <p>{professor.firstName} {professor.lastName}</p>
                        </div>
                    )
                }) : <p className="text-secondary">Not specified</p>}
            </div>
        </div>
    )
}

export default ListOfProfessorsAdded;