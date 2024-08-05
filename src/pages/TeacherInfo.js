import React, { useState, useContext } from 'react'
import { addDoc, collection } from "@firebase/firestore"
import UserContext from '../contexts/UserContext'
import { db } from '../firebase'
import "./TeacherInfo.css"

/*
  Form Details: 
  teachers name
  students name
  reason
  notes
*/

export const TeacherInfo = () => {

  const user = useContext(UserContext)    

    const [student, setStudent] = useState("")
    const [reason, setReason] = useState("")
    const [grade, setGrade] = useState("")

    const onFormSubmit = async () => {


      if (user.eaglesLandingEmail) {


        await addDoc(collection(db, "logs"), {
          teacher: user.displayName,
          student: student,
          grade: grade,
          reason: reason,
          timeLeftClass: Date.now(),
          teacherEmail: user.eaglesLandingEmail,
          complete: false
        });

        setStudent("")
        setReason("")

        window.location.href = "/formsubmitted?exists=true"

      } else {
        await addDoc(collection(db, "logs"), {
          teacher: user.displayName,
          student: student,
          grade: grade,
          reason: reason,
          timeLeftClass: Date.now(),
          teacherEmail: "",
          complete: false
        });

        setStudent("")
        setReason("")

        window.location.href = "/formsubmitted?exists=false"



      }

        
    
        

      }

      const onGradeChange = e => {
        if (e.target.value > 12) {
          setGrade(12)
        } else if (e.target.value < 1) {
          setGrade(1)
        } else {
          setGrade(e.target.value)
        }
      }

  return (
    <div id="teacher-form" className='text-center'>
      <div className='allTitles'>{user.displayName} - Nurses Pass</div><br/>
      <input className='text-input' placeholder="Student Name" type='text' value={student} onChange={e => setStudent(e.target.value)}/>
      <br/>
      <input className='text-input' placeholder="Grade"type='number' value={grade} onChange={onGradeChange}/>
      <br/>
      <input className='text-input' placeholder="Reason" type='text' value={reason} onChange={e => setReason(e.target.value)}/>
      <br/>
      <button className='btn' onClick={onFormSubmit}>Submit Form</button>
    </div> 
  )
}
