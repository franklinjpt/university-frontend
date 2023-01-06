import TableMenu from "../components/TableMenu.jsx";

const Professor = () => {
    return (
        <div>
            <TableMenu apiUrl="http://localhost:8080/university/api/professor" entity="professor" />
        </div>
    )
}

export default Professor