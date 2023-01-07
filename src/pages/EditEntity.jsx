import * as React from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";


const EditEntity = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const dataFields = location.state.data;

    const [data, setData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        facultyName: '',
        address: '',
        email: '',
        numberYear: '',
        cellphone: '',
        name: '',
        credits: '',
    });

    React.useEffect(() => {
        axios.get('http://localhost:8080/university/api/' + location.state.entity + '/' + location.state.id)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (location.state.entity === "student") {
            const newStudent = {
                id: data.id.trim(),
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                facultyName: data.facultyName.trim(),
                address: data.address.trim(),
                email: data.email.trim(),
                numberYear: data.numberYear || 1
            };
            if (data.id === '' || data.firstName === '' || data.lastName === '' || data.facultyName === '') {
                alert('Please fill all the required fields!');
            } else {
                axios.put('http://localhost:8080/university/api/student', newStudent)
                    .then(res => {
                        alert('Student edited successfully!');
                        navigateTo('/student');
                    })
                    .catch(error => {
                        alert('Status: ' + error.request.status +' - Error creating student! ' + error.request.response );
                    });
            }
        } else if (location.state.entity === "professor") {
            const newProfessor = {
                id: data.id.trim(),
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                facultyName: data.facultyName.trim(),
                address: data.address.trim(),
                email: data.email.trim(),
                cellphone: data.cellphone.trim()
            };
            if (data.id === '' || data.firstName === '' || data.lastName === '' || data.facultyName === '') {
                alert('Please fill all the required fields!');
            } else {
                axios.put('http://localhost:8080/university/api/professor', newProfessor)
                    .then(res => {
                        alert('Professor edited successfully!');
                        navigateTo('/professor');
                    })
                    .catch(error => {
                        alert('Status: ' + error.request.status +' - Error creating professor! ' + error.request.response );
                    });
            }
        } else if (location.state.entity === "subject") {
            const newSubject = {
                id: data.id,
                name: data.name.trim(),
                credits: data.credits || 1
            };
            if (data.name === '') {
                alert('Please fill all the required fields!');
            } else {
                axios.put('http://localhost:8080/university/api/subject', newSubject)
                    .then(res => {
                        alert('Subject Edited successfully!');
                        navigateTo('/subject');
                    })
                    .catch(error => {
                        console.log(newSubject);
                        alert('Status: ' + error.request.status +' - Error creating subject! ' + error.request.response );
                    });
            }
        }
    }

    const requires = ['id', 'firstName', 'lastName', 'facultyName', 'name', 'credits'];
    const numbers = ['numberYear', 'credits'];

    return (
        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h1>Add {location.state.entity}</h1>
            <p className="text-danger">* Required</p>
            <form className="text-start ps-3 pe-3" onSubmit={handleSubmit} >

                {Object.keys(dataFields).map((key, index) => {
                    {if(key === 'id') {
                        return (
                            <div key={index} className="input-group flex-nowrap mb-3">
                                <label htmlFor={key} className="input-group-text labelSize">{dataFields[key]}</label>
                                <input type="text" className="form-control" id={key} name={key} value={data[key]} onChange={handleChange} disabled/>
                            </div>
                        )
                    }else {
                        return (
                            <div className="input-group flex-nowrap mb-3" key={index}>
                                <label htmlFor={key} className="input-group-text labelSize">{dataFields[key]} {requires.includes(key) ? <span className="text-danger">*</span> : null} </label>
                                <input type={numbers.includes(key) ? 'number' : 'text'} className="form-control" placeholder={dataFields[key]} id={key}
                                       name={key}  value={data[key]} onChange={handleChange}  />
                            </div>
                        )
                    }}

                })}


                <div className="text-center">
                    <button type="submit" className="btn btn-warning mt-3 mb-3">
                        Edit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditEntity;