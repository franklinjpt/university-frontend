import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Student = () => {
    const data = {
        'id': 'ID',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'facultyName': 'Faculty Name',
        'address': 'Address',
        'email': 'Email',
        'numberYear': 'Year'
    }


    return (
        <div className="ps-3 pe-3">
            <Add entity="student" data={data}/>
            <Table apiUrl="http://localhost:8080/university/api/student" entity="student" dataFields={data} />
        </div>
    )
}

export default Student