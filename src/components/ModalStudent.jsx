import * as React from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const ModalStudent = (props) => {
    const {modalIsOpen, closeModal, calculateCredits, idEntity, dataSubject, setDataSubject} = props;
    const entity = "student";
    const [allSubjects, setAllSubjects] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:8080/university/api/subject')
            .then(res => {
                setAllSubjects(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Student Modal"
            ariaHideApp={false}
        >
            <h2>Add a subject</h2>
            <button className="btn btn-danger" onClick={closeModal}>close</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Credits</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {allSubjects.length > 0 ? (
                    allSubjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.name}</td>
                            <td>{subject.credits}</td>
                            <td>

                                <button className="btn btn-success" onClick={() => {
                                    if(calculateCredits() + subject.credits <= 30){
                                        axios.post('http://localhost:8080/university/api/'+ entity + '/addSubject/' + idEntity + '/' + subject.id)
                                            .then(() => {
                                                MySwal.fire({
                                                    title: <p>Subject added successfully!</p>,
                                                    icon: 'success',
                                                    confirmButtonText: 'Ok'
                                                }).then(() => {
                                                    axios.get('http://localhost:8080/university/api/subject/' + entity + '/' + idEntity)
                                                        .then(res => {
                                                            setDataSubject(res.data);
                                                        })
                                                        .catch(error => {
                                                            console.log(error);
                                                        });
                                                    closeModal();
                                                })
                                            })
                                            .catch(error => {
                                                MySwal.fire({
                                                    title: <p>Error!</p>,
                                                    html: <p>{error.request.response}</p>,
                                                    icon: 'error',
                                                    confirmButtonText: 'Ok'
                                                })
                                            });
                                    } else {
                                        MySwal.fire({
                                            title: <p>Error!</p>,
                                            html: <p>Max credits reached!</p>,
                                            icon: 'error',
                                            confirmButtonText: 'Ok'
                                        })
                                    }
                                }
                                }>Add</button>
                                <button className="btn btn-danger ms-1" onClick={() => {
                                    axios.delete('http://localhost:8080/university/api/'+ entity + '/removeSubject/' + idEntity + '/' + subject.id)
                                        .then(() => {
                                            MySwal.fire({
                                                title: <p>Subject deleted successfully!</p>,
                                                icon: 'success',
                                                confirmButtonText: 'Ok'
                                            }).then(() => {
                                                setDataSubject(dataSubject.filter((item) => item.id !== subject.id));
                                                closeModal();
                                            })

                                        })
                                        .catch(error => {
                                            MySwal.fire({
                                                title: <p>Error!</p>,
                                                html: <p>{error.request.response}</p>,
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        });
                                } }>Delete</button>
                            </td>
                        </tr>
                    ))

                ) : null
                }
                </tbody>
            </table>
        </Modal>
    )
}

export default ModalStudent;