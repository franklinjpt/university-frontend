import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Student = (props) => {
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
            <h2 className="text-center mt-3">List of students</h2>
            <div className="text-center listSize">
                <Add apiUrl={props.apiUrl} entity="student" data={data}/>
                <Table apiUrl={props.apiUrl} entity="student" dataFields={data} />
            </div>
        </div>
    )
}

export default Student