import * as React from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const EditEntity = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const dataFields = location.state.data;
    const apiUrl = location.state.apiUrl;

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
        axios.get(apiUrl + location.state.entity + '/' + location.state.id)
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

        switch (location.state.entity) {
            case 'student':
                if(data.firstName === '' || data.lastName === '' || data.facultyName === '') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all the fields!',
                    })
                }
                axios.put(apiUrl + 'student/', {
                    id: data.id,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    facultyName: data.facultyName.trim(),
                    address: data.address.trim(),
                    email: data.email.trim(),
                    numberYear: data.numberYear || 1,
                }).then(() => {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Student updated successfully!',
                    }).then(() => {
                        navigateTo('/student');
                    })
                }).catch(() => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
                break;
            case 'professor':
                if(data.firstName === '' || data.lastName === '' || data.facultyName === '') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all the fields!',
                    })
                }
                axios.put(apiUrl + 'professor/', {
                    id: data.id,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    facultyName: data.facultyName.trim(),
                    address: data.address.trim(),
                    email: data.email.trim(),
                    cellphone: data.cellphone.trim(),
                }).then(() => {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Professor updated successfully!',
                    }).then(() => {
                        navigateTo('/professor');
                    })
                }).catch(() => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
                break;
            case 'subject':
                if(data.name === '') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all the fields!',
                    })
                }
                axios.put(apiUrl + 'subject/', {
                    id: data.id,
                    name: data.name.trim(),
                    credits: data.credits || 1,
                }).then(() => {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Subject updated successfully!',
                    }).then(() => {
                        navigateTo('/subject');
                    })
                })
        }
    }

    const requires = ['id', 'firstName', 'lastName', 'facultyName', 'name', 'credits'];
    const numbers = ['numberYear', 'credits'];

    return (
        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h1>Edit {location.state.entity}</h1>
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
                    <button className="btn btn-danger ms-2 mt-3 mb-3" onClick={() => navigateTo("/"+location.state.entity)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditEntity;