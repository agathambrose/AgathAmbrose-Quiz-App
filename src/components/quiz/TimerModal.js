import React, {useState} from 'react';
import "antd/dist/antd.css";
import Modal from 'react-bootstrap/Modal';
import { TimePicker } from "antd";



export const TimerModal = (props) => {
const [time, setTime] = useState();

return (
<div>
<Modal 
    {...props} 
    size="md"  
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header>Set Timer</Modal.Header>
    <Modal.Body>
    <TimePicker
    showNow={false}
    value={time}
    size="large"
    style={{ width: "100%" }}
    onChange={(time, timeString) => {
        setTime(time);
        props.setTimeString(timeString);
    }}
    />
    </Modal.Body>
    <Modal.Footer>
    <p 
     onClick={props.onHide} 
     style={{ cursor: 'pointer', color: 'var(--accent-main)', fontWeight: '600'}}>
     Close
    </p>
    </Modal.Footer>
    </Modal>
</div>
)
}
