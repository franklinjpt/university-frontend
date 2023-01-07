import Table from "../components/Table.jsx";
import Add from "../components/Add.jsx";

const Subject = () => {
    const data = {
        'name': 'Name',
        'credits': 'Credits'
    }
    return (
        <div className="ps-3 pe-3">
            <Add entity="subject" data={data}/>
            <Table apiUrl="http://localhost:8080/university/api/subject" entity="subject" />
        </div>
    )
}

export default Subject