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
            <h2 className="text-center mt-3">List of professors</h2>
            <div className="text-center listSize">
                <Add entity="professor" data={data}/>
                <Table apiUrl="http://localhost:8080/university/api/professor" entity="professor" dataFields={data}/>
            </div>
        </div>
    )
}

export default Professor