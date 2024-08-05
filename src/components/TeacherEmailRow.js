import React, { useEffect, useState } from 'react'
import { doc, updateDoc, deleteDoc } from "@firebase/firestore"
import { db } from '../firebase'
import "./TeacherEmailRow.css"

export const TeacherEmailRow = ({ teacher }) => {

    const [elcaChargersEmail, setElcaChargersEmail] = useState(teacher.elcaChargersEmail || teacher.email || teacher.id)
    const [eaglesLandingEmail, setEaglesLandingEmail] = useState(teacher.eaglesLandingEmail || "")
    const [saveDisabled, setSaveDisabled] = useState(true)

    const deleteTeacher = async () => {
        
        await deleteDoc(doc(db, 'teachers', teacher.id));
        
    }

    const updateTeacher = async () => {
        
        await updateDoc(doc(db, "teachers", teacher.id), {
            elcaChargersEmail: elcaChargersEmail,
            eaglesLandingEmail: eaglesLandingEmail
        })
        
    }

    useEffect(() => {
        setSaveDisabled(elcaChargersEmail === teacher.elcaChargersEmail && eaglesLandingEmail === teacher.eaglesLandingEmail)
    }, [teacher.elcaChargersEmail, teacher.eaglesLandingEmail, elcaChargersEmail, eaglesLandingEmail])

  return (
    <div className='teacher-email-row'>
        <input placeholder="Elca Chargers Email" value={elcaChargersEmail} onChange={e => setElcaChargersEmail(e.target.value)}/>
        <input placeholder="Eagles Landing Email" value={eaglesLandingEmail} onChange={e => setEaglesLandingEmail(e.target.value)}/>
        <button className='btn' onClick={updateTeacher} disabled={saveDisabled}>Save</button>
        <button className='btn' style={{ backgroundColor: "red" }} onClick={deleteTeacher}>Delete</button>
    </div>
  )
}
