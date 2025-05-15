import React from "react";
import { useState } from "react";
import "./Conversion.css";
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import UpdateIcon from '@mui/icons-material/Update';
import TextField from '@mui/material/TextField';


export function Conversion() {

    const [value, setValue] = useState("Los Angeles");
    const [meetingTime, setMeetingTime] = useState("12:00");
    const [meetingTimeGuatemala, setMeetingTimeGuatemala] = useState("");
    const [meetingTimePittsburgh, setMeetingTimePittsburgh] = useState("");
    const [meetingTimeLosAngeles, setMeetingTimeLosAngeles] = useState("");
    const [animateMainLabel, setAnimateMainLabel] = useState(false);
    const [animateLocations, setAnimateLocations] = useState(false);
    const [unhide, setUnhide] = useState(false);
    

    const handleChange = (event) => {
      if (value === "Los Angeles") {
        const date = new Date(`1970-01-01T${meetingTime}`);
        const guatemalaTime = new Date(date.getTime() + 1 * 60 * 60 * 1000);
        const pittsburghTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
        setMeetingTimeLosAngeles(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setMeetingTimeGuatemala(guatemalaTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setMeetingTimePittsburgh(pittsburghTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      else if (value === "Pittsburgh") {
        const date = new Date(`1970-01-01T${meetingTime}`);
        const guatemalaTime = new Date(date.getTime() - 2 * 60 * 60 * 1000);
        const losAngelesTime = new Date(date.getTime() - 3 * 60 * 60 * 1000);
        setMeetingTimePittsburgh(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setMeetingTimeGuatemala(guatemalaTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setMeetingTimeLosAngeles(losAngelesTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      setUnhide(true);
      setAnimateMainLabel(true);
      setAnimateLocations(true);
      setTimeout(() => {
        setAnimateMainLabel(false);
        setAnimateLocations(false);
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
                    <TextField type="time" id="outlined" label="Meeting time?" variant="outlined" color="secondary" value={meetingTime} onChange={(event) => setMeetingTime(event.target.value)} slotProps={{inputLabel: {shrink: true}, htmlInput: {step: 300}}}/>
                    <Button variant="plain" color="primary" onClick={handleChange} size="lg"><UpdateIcon /></Button>
                  </div>
                </div>
                {unhide && <label className={animateMainLabel ? "response-label animate-main-label": "response-label"}>Set your meeting at<p>{meetingTimeGuatemala.replace(/\s/g, '')}</p>Guatemala time!</label>}
                {unhide && <div className="locations-container">
                  <div className="location-label">
                    <p>Los Angeles time is &#8594; <div className="animation-frame"><span className={animateLocations ? "animate-locations": ""}>{meetingTimeLosAngeles.replace(/\s/g, '')}</span></div></p>
                  </div>
                  <div className="location-label">
                    <p>Guatemala time is &#8594; <div className="animation-frame"><span className={animateLocations ? "animate-locations": ""}>{meetingTimeGuatemala.replace(/\s/g, '')}</span></div></p>
                  </div>
                  <div className="location-label">
                    <p>Pittsburgh time is &#8594; <div className="animation-frame"><span className={animateLocations ? "animate-locations": ""}>{meetingTimePittsburgh.replace(/\s/g, '')}</span></div></p>
                  </div>
                </div>
                }
            </div>
        </div>
    )
}
