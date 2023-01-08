import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Subject = () => {
    const data = {
        'id': 'ID',
        'name': 'Name',
        'credits': 'Credits'
    }
    return (
        <div className="ps-3 pe-3">
            <h2 className="text-center mt-3">List of subjects</h2>
            <div className="text-center listSize">
                <Add entity="subject" data={data}/>
                <Table apiUrl="http://localhost:8080/university/api/subject" entity="subject" dataFields={data}/>
            </div>
        </div>
    )
}

export default Subject