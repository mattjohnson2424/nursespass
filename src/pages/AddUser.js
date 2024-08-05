import React, { useEffect, useState } from 'react'
import { functions } from '../firebase'
import { httpsCallable } from "@firebase/functions"
import { Loading } from "../components/Loading"
import "./AddUser.css"
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import { TeacherEmailRow } from '../components/TeacherEmailRow'


export const AddUser = () => {

    const [elcaChargersEmail, setElcaChargersEmail] = useState()
    const [eaglesLandingEmail, setEaglesLandingEmail] = useState()
    const [filter, setFilter] = useState("")
    const [loading, setLoading] = useState(false)
    const [teachers, setTeachers] = useState([])

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        // create user without logging in
        const createTeacher = httpsCallable(functions, 'createTeacher');
        await createTeacher({
            elcaChargersEmail: elcaChargersEmail,
            eaglesLandingEmail: eaglesLandingEmail
        })
        setElcaChargersEmail("")
        setEaglesLandingEmail("")
        setLoading(false)
    }

    useEffect(() => {
        const teachersInit = async () => {
            const q = query(collection(db, "teachers"));
            await onSnapshot(q, (querySnapshot) => {
                const dbTeachers = [];
                querySnapshot.forEach(doc => {
                    dbTeachers.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setTeachers(dbTeachers)
            })
        }
        teachersInit()
    }, [])

    if (loading) {
        return <Loading/>
    }

  return (
    <div className='add-teacher-container'>
        <form className='add-teacher-form'>
            <h2>Add New Teacher</h2>
            
                <input id="elca-chargers-email" placeholder="Elca Chargers Email" className="text-input add-teacher-input" type='text' value={elcaChargersEmail} onChange={e => setElcaChargersEmail(e.target.value)}/>
                <input id="eagles-landing-email" placeholder="Eagles Landing Email" className="text-input add-teacher-input" type='text' value={eaglesLandingEmail} onChange={e => setEaglesLandingEmail(e.target.value)}/>
           
            <br/>
            <input className='btn add-teacher-btn' type='submit' onClick={onSubmit}/>
        </form>
        <div className='filter-email-container'>
            <label htmlFor='filter-email'>Filter Email</label>
            <input id="filter-email" placeholder="Filter Email" className="text-input filter-email" value={filter} onChange={e => setFilter(e.target.value)}/>
        </div>
        <div className='email-pair-container'>
            {/* <div className='email-pair-header'>
                <div>Elca Chargers Email</div>
                <div>Eagles Landing Email</div>
                <div>Save</div>
                <div>Delete</div>
            </div> */}
            {teachers.filter(teacher => {
                if (filter === "") return true;

                if (!teacher.email) teacher.email = ""
                if (!teacher.elcaChargersEmail) teacher.elcaChargersEmail = ""
                if (!teacher.eaglesLandingEmail) teacher.eaglesLandingEmail = ""
                

                return (teacher.email.includes(filter) || teacher.elcaChargersEmail.includes(filter) || teacher.eaglesLandingEmail.includes(filter))
            }).map(teacher => (
                <TeacherEmailRow teacher={teacher} key={teacher.id}/>
            ))}
        </div>
    </div>
  )
}
