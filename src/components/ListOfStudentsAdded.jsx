import * as React from 'react';
import axios from "axios";

const ListOfStudentsAdded = (props) => {
    const {openModal, idEntity} = props;

    const [data, setData] = React.useState({});

    React.useEffect(() => {
        axios.get('http://localhost:8080/university/api/student/subject/' + idEntity)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    return (
        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h2>List of students added</h2>

            <div className="row">
                {data.length > 0 ? data.map((student, index) => {
                    return (
                        <div className="d-inline-flex" key={index}>
                            <p className="me-1 "><strong>Name:</strong></p><br/>
                            <p>{student.firstName} {student.lastName}</p>
                        </div>
                    )
                }) : <p className="text-secondary">Not specified</p>}
            </div>
        </div>
    )
}

export default ListOfStudentsAdded;