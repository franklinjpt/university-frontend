import React,{useState} from 'react';
import {useLocation} from "react-router-dom";
<<<<<<< Updated upstream
import axios from "axios";
import Modal from 'react-modal';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

=======
import ModalStudent from "../components/ModalStudent";
import ModalProfessor from "../components/ModalProfessor";
import ListOfSubjectsAdded from "../components/ListOfSubjectsAdded.jsx";
import ListOfStudentsAdded from "../components/ListOfStudentsAdded.jsx";
import ListOfProfessorsAdded from "../components/ListOfProfessorsAdded.jsx";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

>>>>>>> Stashed changes
const MySwal = withReactContent(Swal)

const ViewEntity = () => {
    const location = useLocation();
    const fields = location.state.data;
    const entity = location.state.entity;
    const idEntity = location.state.id;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }


    const [data, setData] = React.useState({});
    const [dataSubject, setDataSubject] = React.useState({});
<<<<<<< Updated upstream
    const [allSubjects, setAllSubjects] = React.useState([]);
=======
>>>>>>> Stashed changes

    React.useEffect(() => {
        axios.get('http://localhost:8080/university/api/' + entity + '/' + idEntity)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:8080/university/api/subject/' + entity + '/' + idEntity)
            .then(res => {
                setDataSubject(res.data);
            })
            .catch(error => {
                console.log(error);
            });
<<<<<<< Updated upstream
        axios.get('http://localhost:8080/university/api/subject')
            .then(res => {
                setAllSubjects(res.data);
            })
            .catch(error => {
                console.log(error);
            });
=======
>>>>>>> Stashed changes
    },[]);

    const calculateCredits = () => {
        let credits = 0;
        if(dataSubject.length > 0){
            dataSubject.forEach(subject => {
                credits += subject.credits;
            });
        }
        return credits;
    }

    return (
        <div id="view">
            <div>
<<<<<<< Updated upstream
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
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

=======
                {entity === "student" ? (
                    <ModalStudent modalIsOpen={modalIsOpen} closeModal={closeModal}
                                  calculateCredits={calculateCredits} idEntity={idEntity}
                                  dataSubject={dataSubject} setDataSubject={setDataSubject}
                    />
                ) : entity === "professor" ? (
                    <ModalProfessor modalIsOpen={modalIsOpen} closeModal={closeModal}
                                    idEntity={idEntity} dataSubject={dataSubject}
                                    setDataSubject={setDataSubject}
                    />
                ) : null}
>>>>>>> Stashed changes
            </div>
            <div className="container border border-1 mt-4 mb-4 w-50 text-center">
                <h2>{entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>
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
<<<<<<< Updated upstream
            <div className="container border border-1 mt-4 mb-4 w-50 text-center">
                <h2>List of subjects added</h2>
                <div className="text-start d-flex justify-content-between">
                    <button className="btn btn-primary mb-3" onClick={openModal}>Add subject</button>
                    <p><strong>Total credits:</strong> {calculateCredits()}</p>
                    <p><strong>Max credits:</strong> 30</p>
                </div>

                <div className="row">
                    {dataSubject.length > 0 ? dataSubject.map((subject, index) => {
                        return (
                            <div className="d-inline-flex" key={index}>
                                <p className="me-1 "><strong>Name:</strong></p><br/>
                                {subject.name === "" ? <p className="text-secondary">Not specified</p> : <p>{subject.name}</p>}

                                <p className="ms-2 me-1"><strong>Credits: <br/></strong></p>
                                {subject.credits === "" ? <p className="text-secondary">Not specified</p> : <p>{subject.credits}</p>}
                            </div>
                        )
                    }) : <p className="text-secondary">Not specified</p>}

                </div>
            </div>
=======

            {entity !== "subject" ? (
                <ListOfSubjectsAdded openModal={openModal} calculateCredits={calculateCredits} dataSubject={dataSubject}/>
            ) : (
                <div>
                    <ListOfStudentsAdded openModal={openModal} idEntity={idEntity}/>
                    <ListOfProfessorsAdded openModal={openModal} idEntity={idEntity}/>
                </div>
            )}
>>>>>>> Stashed changes
        </div>);
}
export default ViewEntity;