import React from "react";
import { useState } from "react";
import "./Conversion.css";
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import UpdateIcon from '@mui/icons-material/Update';
import TextField from '@mui/material/TextField';


export function Conversion() {

    const [value, setValue] = useState("Los Angeles");
    const [meetingTime, setMeetingTime] = useState("");
    const [meetingTimeGuatemala, setMeetingTimeGuatemala] = useState("");
    const [animate, setAnimate] = useState(false);

    const handleChange = (event) => {
      if (value === "Los Angeles") {
        const date = new Date(`1970-01-01T${meetingTime}`);
        const guatemalaTime = new Date(date.getTime() - 1 * 60 * 60 * 1000);
        setMeetingTimeGuatemala(guatemalaTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      else if (value === "Pittsburgh") {
        const date = new Date(`1970-01-01T${meetingTime}`);
        const guatemalaTime = new Date(date.getTime() + 2 * 60 * 60 * 1000);
        setMeetingTimeGuatemala(guatemalaTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }

    return (
        <div className="conversion-container">
            <div className="conversion-content" >
                <h2>Set Meetings!</h2>
                <div className="input-container">
                  <div className="button-group">
                    <ToggleButtonGroup value={value} onChange={(event) => setValue(event.target.value)}>
                        <Button value="Los Angeles" size="lg">Los Angeles</Button>
                        <Button value="Pittsburgh" size="lg">Pittsburgh</Button>
                    </ToggleButtonGroup>
                  </div>
                  <div className="input-group">
                    <TextField id="outlined-number" label="Meeting time?" placeholder="24hr format" variant="outlined" color="secondary" value={meetingTime} onChange={(event) => setMeetingTime(event.target.value)} />
                    <Button variant="plain" color="primary" onClick={handleChange} size="lg"><UpdateIcon /></Button>
                  </div>
                </div>
                <label className={animate ? "response-label animate": "response-label"}>Set your meeting at<p>{meetingTimeGuatemala}</p>Guatemala time!</label>
            </div>
        </div>
    )
}
