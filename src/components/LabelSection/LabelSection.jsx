import React from "react";
import { useEffect, useState } from "react";
import "./LabelSection.css";

export function LabelSection() {

    const [timeGuatemala, setTimeGuatemala] = useState("00:00:00");
    const [timePittsburgh, setTimePittsburgh] = useState("00:00:00");
    const [timeLosAngeles, setTimeLosAngeles] = useState("00:00:00");

    useEffect(() => {
        const fetchTime = async () => {

            try{
                const [guatemalaResponse, pittsburghResponse, losAngelesResponse] = await Promise.all([
                    fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=America/Guatemala"),
                    fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=America/Toronto"),
                    fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=America/Los_Angeles")
                ]);
    
                const [dataGuatemala, dataPittsburgh, dataLosAngeles] = await Promise.all([
                    guatemalaResponse.json(),
                    pittsburghResponse.json(),
                    losAngelesResponse.json()
                ]);
    
                setTimeGuatemala(dataGuatemala.time);
                setTimePittsburgh(dataPittsburgh.time);
                setTimeLosAngeles(dataLosAngeles.time);
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };
        fetchTime();
        const interval = setInterval(() => {
            fetchTime();
        }, 1000 * 5);
    }, []);

    return (
        <div className="label-container">
            <div className="label-content">
                <div className="label-locations">
                    <label className="country-label">Los Angeles</label>
                    <label className="country-time">{timeLosAngeles}</label>
                </div>
                <div className="label-locations">
                    <label className="country-label">Guatemala</label>
                    <label className="country-time">{timeGuatemala}</label>
                </div>
                <div className="label-locations">
                    <label className="country-label">Pittsburgh</label>
                    <label className="country-time">{timePittsburgh}</label>
                </div>
            </div>
        </div>
    );
}