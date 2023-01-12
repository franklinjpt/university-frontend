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

const ModalProfessor = (props) => {
    const {modalIsOpen, closeModal, idEntity, dataSubject, setDataSubject, apiUrl} = props;
    const entity = "professor";
    const [allSubjects, setAllSubjects] = React.useState([]);

    React.useEffect(() => {
        axios.get(apiUrl + 'subject')
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
            contentLabel="Professor Modal"
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
                                    axios.post(apiUrl + entity + '/subject/' + idEntity + '/' + subject.id)
                                        .then(() => {
                                            MySwal.fire({
                                                icon: 'success',
                                                title: 'Subject added correctly',
                                                showConfirmButton: false,
                                                timer: 1500
                                            }).then(() => {
                                                axios.get(apiUrl + 'subject/' + entity + '/' + idEntity)
                                                    .then(res => {
                                                        setDataSubject(res.data);
                                                    })
                                                    .catch(error => {
                                                        console.log(error);
                                                    });
                                                closeModal();
                                            });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }}>Add</button>
                                <button className="btn btn-danger ms-1" onClick={() => {
                                    axios.delete(apiUrl + entity + '/subject/' + idEntity + '/' + subject.id)
                                        .then(() => {
                                            MySwal.fire({
                                                icon: 'success',
                                                title: 'Subject deleted correctly',
                                                showConfirmButton: false,
                                                timer: 1500
                                            }).then(() => {
                                                setDataSubject(dataSubject.filter((item) => item.id !== subject.id));
                                                closeModal();
                                            });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }
                                }>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No subjects</td>
                    </tr>
                )}
                </tbody>
            </table>
        </Modal>
    );
}

export default ModalProfessor;