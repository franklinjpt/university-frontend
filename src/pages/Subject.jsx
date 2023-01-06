import TableMenu from "../components/TableMenu.jsx";

const Subject = () => {
    return (
        <div>
            <TableMenu apiUrl="http://localhost:8080/university/api/subject" entity="subject" />
        </div>
    )
}

export default Subject