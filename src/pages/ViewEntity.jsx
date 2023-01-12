import React,{useState} from 'react';
import {useLocation} from "react-router-dom";
import ModalStudent from "../components/ModalStudent";
import ModalProfessor from "../components/ModalProfessor";
import ListOfSubjectsAdded from "../components/ListOfSubjectsAdded.jsx";
import ListOfStudentsAdded from "../components/ListOfStudentsAdded.jsx";
import ListOfProfessorsAdded from "../components/ListOfProfessorsAdded.jsx";
import axios from "axios";

const ViewEntity = () => {
    const location = useLocation();
    const fields = location.state.data;
    const entity = location.state.entity;
    const idEntity = location.state.id;
    const apiUrl = location.state.apiUrl;

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
        axios.get(apiUrl + entity + '/' + idEntity)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(apiUrl + entity + '/' + idEntity)
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
                                  apiUrl={apiUrl}
                    />
                ) : entity === "professor" ? (
                    <ModalProfessor modalIsOpen={modalIsOpen} closeModal={closeModal}
                                    idEntity={idEntity} dataSubject={dataSubject}
                                    setDataSubject={setDataSubject} apiUrl={apiUrl}
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
                    <ListOfStudentsAdded idEntity={idEntity} apiUrl={apiUrl}/>
                    <ListOfProfessorsAdded  idEntity={idEntity} apiUrl={apiUrl}/>
                </div>
            )}
        </div>);
}
export default ViewEntity;