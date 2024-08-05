import React, { useContext, useState, useEffect } from 'react'
import { LogsContext } from "../contexts/LogsContext"
import { doc, updateDoc, deleteDoc } from "@firebase/firestore"
import { db } from '../firebase'
import { Loading } from "../components/Loading"
import "./NurseInfo.css"

export const NurseInfo = () => {

  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")

  const logs = useContext(LogsContext)
  const log = logs.find(log => log.id === id);

  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [reason, setReason] = useState("");
  const [grade, setGrade] = useState(1);
  const [notes, setNotes] = useState("");
  const [meds, setMeds] = useState("");

  const onGradeChange = e => {
    if (e.target.value > 12) {
      setGrade(12)
    } else if (e.target.value < 1) {
      setGrade(1)
    } else {
      setGrade(e.target.value)
    }
  }

  const onFormSubmit = async () => {
    await updateDoc(doc(db, "logs", log.id), {
      teacher: teacher,
      student: student,
      grade: grade,
      reason: reason,
      notes: notes,
      meds: meds,
      complete: true,
      timeLeftNurse: Date.now(),
    });

    window.location.href = "/"
  }

  const deleteLog = async () => {
    await deleteDoc(doc(db, 'logs', log.id));
    window.location.href = "/"
  }

  useEffect(() => {
    if (log) {
      setTeacher(log.teacher);
      setStudent(log.student);
      setReason(log.reason);
      setGrade(log.grade);
      setNotes(log.notes);
      setMeds(log.meds);
    }
  }, [log]);

  if (!log) {
    return <Loading/>
  }

  return (
    <div id="teacher-form" className='text-center'>
        <div className='allTitles'>Nurse Info</div><br/>
        <input className='text-input' placeholder="Teacher Name" type='text' value={teacher} onChange={e => setTeacher(e.target.value)} disabled={log?.teacher}/>
        <br/>
        <input className='text-input' placeholder="Student Name" type='text' value={student} onChange={e => setStudent(e.target.value)} disabled={log?.student}/>
        <br/>
        <input className='text-input' type='number' value={grade} onChange={onGradeChange} disabled={log?.grade}/>
        <br/>
        <input className='text-input' placeholder="Reason" type='text' value={reason} onChange={e => setReason(e.target.value)} disabled={log?.reason}/>
        <br/>
        <input className='text-input' placeholder="Medication" type='text' value={meds} onChange={e => setMeds(e.target.value)}/>
        <br/>
        <textarea className='text-area' placeholder="Additional Notes" type='text' value={notes} onChange={e => setNotes(e.target.value)}/>
        <br/>
        <div className='row'>
          <button className='btn' onClick={onFormSubmit}>Submit Form</button>
          {log.complete && 
            <button
              className="btn delete-log-btn"
              onClick={deleteLog}
            >
              Delete
            </button>
          }
          
        </div>
        
    </div> 
  )
}
