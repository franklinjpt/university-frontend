import * as React from 'react';
import {useNavigate} from "react-router-dom";

export default function Add(props) {
    const navigate = useNavigate();
    return (
        <div className="text-end me-3 mt-3">
            <button type="button" className="btn btn-primary"
            onClick={() => navigate("/addentity", {state: {entity: props.entity, data: props.data}})}>
                Add {props.entity}
            </button>
        </div>
    )
}