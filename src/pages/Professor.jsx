import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Professor = (props) => {
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
                <Add apiUrl={props.apiUrl} entity="professor" data={data}/>
                <Table apiUrl={props.apiUrl} entity="professor" dataFields={data}/>
            </div>
        </div>
    )
}

export default Professor