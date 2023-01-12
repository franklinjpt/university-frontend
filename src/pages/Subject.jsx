import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Subject = (props) => {
    const data = {
        'id': 'ID',
        'name': 'Name',
        'credits': 'Credits'
    }
    return (
        <div className="ps-3 pe-3">
            <h2 className="text-center mt-3">List of subjects</h2>
            <div className="text-center listSize">
                <Add apiUrl={props.apiUrl} entity="subject" data={data}/>
                <Table apiUrl={props.apiUrl} entity="subject" dataFields={data}/>
            </div>
        </div>
    )
}

export default Subject