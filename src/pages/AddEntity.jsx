import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const AddEntity = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const dataFields = location.state.data;
    const entity = location.state.entity;
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

    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        switch (entity) {
            case 'student':
                if(data.firstName === '' || data.lastName === '' || data.facultyName === '') {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all the fields!',
                    })
                }
                axios.post(apiUrl + 'student', {
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
                        title: 'Student added successfully!',
                    })
                    navigateTo('/student');
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
                axios.post(apiUrl + 'professor', {
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
                        title: 'Professor added successfully!',
                    })
                    navigateTo('/professor');
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
                axios.post(apiUrl + 'subject', {
                    name: data.name.trim(),
                    credits: data.credits || 1,
                }).then(() => {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Subject added successfully!',
                    })
                    navigateTo('/subject');
                }).catch(() => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        }
    }

    const requires = ['id', 'firstName', 'lastName', 'facultyName', 'name'];
    const numbers = ['numberYear', 'credits'];
    return (

        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h1>Add {entity}</h1>
            <p className="text-danger">* Required</p>
            <form className="text-start ps-3 pe-3" onSubmit={handleSubmit} >

                {entity === "subject"
                    ? Object.keys(dataFields).slice(1).map((key, index) => {
                        return (
                            <div className="input-group flex-nowrap mb-3" key={index}>
                                <label htmlFor={key} className="input-group-text labelSize">{dataFields[key]} {requires.includes(key) ? <span className="text-danger">*</span> : null} </label>
                                <input type={numbers.includes(key) ? 'number' : 'text'} className="form-control" placeholder={dataFields[key]} id={key}
                                       name={key}  value={data[key]} onChange={handleChange}/>
                            </div>
                        )
                    })
                    : Object.keys(dataFields).map((key, index) => {
                        return (
                            <div className="input-group flex-nowrap mb-3" key={index}>
                                <label htmlFor={key} className="input-group-text labelSize">{dataFields[key]} {requires.includes(key) ? <span className="text-danger">*</span> : null} </label>
                                <input type={numbers.includes(key) ? 'number' : 'text'} className="form-control" placeholder={dataFields[key]} id={key}
                                       name={key}  value={data[key]} onChange={handleChange}/>
                            </div>
                        )
                    })
                }

                 <div className="text-center">
                     <button type="submit" className="btn btn-primary mt-3 mb-3">
                         Submit
                     </button>
                     <button className="btn btn-danger ms-2 mt-3 mb-3" onClick={() => navigateTo("/"+entity)}>
                         Cancel
                     </button>
                 </div>
            </form>
        </div>
    )
}

export default AddEntity;