
const ListOfSubjectsAdded = (props) => {
    const {openModal, calculateCredits, entity, dataSubject} = props;

    return (
        <div className="container border border-1 mt-4 mb-4 w-50 text-center">
            <h2>List of subjects added</h2>
            <div className="text-start d-flex justify-content-between">
                <button className="btn btn-primary mb-3" onClick={openModal}>Add subject</button>
                <p><strong>Total credits:</strong> {calculateCredits()}</p>
                {entity === "student" ? (
                    <p><strong>Max credits:</strong> 30</p>
                ) : null}

            </div>

            <div className="row">
                {dataSubject.length > 0 ? dataSubject.map((subject, index) => {
                    return (
                        <div className="d-inline-flex" key={index}>
                            <p className="me-1 "><strong>Name:</strong></p><br/>
                            <p>{subject.name}</p>

                            <p className="ms-2 me-1"><strong>Credits: <br/></strong></p>
                            <p>{subject.credits}</p>
                        </div>
                    )
                }) : <p className="text-secondary">Not specified</p>}
            </div>
        </div>
    )
}

export default ListOfSubjectsAdded;