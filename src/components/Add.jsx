import * as React from 'react';
import {useNavigate} from "react-router-dom";

export default function Add(props) {
    const navigate = useNavigate();
    return (
        <div className="text-start me-3 mt-3 mb-3">
            <button type="button" className="btn btn-primary"
            onClick={() => navigate("/addentity", {state: {entity: props.entity, data: props.data, apiUrl: props.apiUrl}})}>
                Add {props.entity}
            </button>
        </div>
    )
}