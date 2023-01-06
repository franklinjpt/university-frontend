import TableMenu from "../components/TableMenu.jsx";

const Student = () => {
    return (
        <div>
            <TableMenu apiUrl="http://localhost:8080/university/api/student" entity="student" />
        </div>
    )
}

export default Student