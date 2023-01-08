import React,{useState} from 'react';
import {useLocation} from "react-router-dom";
import ModalStudent from "../components/ModalStudent";
import ModalProfessor from "../components/ModalProfessor";
import ListOfSubjectsAdded from "../components/ListOfSubjectsAdded.jsx";
import ListOfStudentsAdded from "../components/ListOfStudentsAdded.jsx";
import ListOfProfessorsAdded from "../components/ListOfProfessorsAdded.jsx";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
            {entity !== "subject" ? (
                <ListOfSubjectsAdded openModal={openModal} calculateCredits={calculateCredits} dataSubject={dataSubject}/>
            ) : (
                <div>
                    <ListOfStudentsAdded openModal={openModal} idEntity={idEntity}/>
                    <ListOfProfessorsAdded openModal={openModal} idEntity={idEntity}/>
                </div>
            )}
        </div>);
}
export default ViewEntity;