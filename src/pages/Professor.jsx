import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Professor = () => {
    const data = {
        'id': 'ID',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'facultyName': 'Faculty Name',
        'address': 'Address',
        'email': 'Email',
        'cellphone': 'Cellphone'
    }

    return (
        <div className="ps-3 pe-3">
            <Add entity="professor" data={data}/>
            <Table apiUrl="http://localhost:8080/university/api/professor" entity="professor"/>
        </div>
    )
}

export default Professor