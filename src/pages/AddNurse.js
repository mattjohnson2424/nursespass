import React, { useState, useEffect } from 'react'
import { functions } from '../firebase'
import { httpsCallable } from "@firebase/functions"
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import { Loading } from '../components/Loading';
import { NurseEmailRow } from '../components/NurseEmailRow';

export const AddNurse = () => {
    const [elcaChargersEmail, setElcaChargersEmail] = useState()
    const [eaglesLandingEmail, setEaglesLandingEmail] = useState()
    const [filter, setFilter] = useState("")
    const [loading, setLoading] = useState(false)
    const [nurses, setNurses] = useState([])

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        // create user without logging in
        const createTeacher = httpsCallable(functions, 'createNurse');
        await createTeacher({
            elcaChargersEmail: elcaChargersEmail,
            eaglesLandingEmail: eaglesLandingEmail
        })
        setElcaChargersEmail("")
        setEaglesLandingEmail("")
        setLoading(false)
    }

    useEffect(() => {
        const nursesInit = async () => {
            const q = query(collection(db, "nurses"));
            await onSnapshot(q, (querySnapshot) => {
                const dbNurses = [];
                querySnapshot.forEach(doc => {
                    dbNurses.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setNurses(dbNurses)
            })
        }
        nursesInit()
    }, [])

    if (loading) {
        return <Loading/>
    }

  return (
    <div className='add-teacher-container'>
        <form className='add-teacher-form'>
            <h2>Add New Nurse</h2>
            
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
            {nurses.filter(nurse => {
                if (filter === "") return true;

                if (!nurse.email) nurse.email = ""
                if (!nurse.elcaChargersEmail) nurse.elcaChargersEmail = ""
                if (!nurse.eaglesLandingEmail) nurse.eaglesLandingEmail = ""
                

                return (nurse.email.includes(filter) || nurse.elcaChargersEmail.includes(filter) || nurse.eaglesLandingEmail.includes(filter))
            }).map(nurse => (
                <NurseEmailRow nurse={nurse} key={nurse.id}/>
            ))}
        </div>
    </div>
  )
}
