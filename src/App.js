import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "@firebase/auth";
import { getDocs, query, collection } from "@firebase/firestore";
import { auth, db } from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from "./contexts/UserContext"
import { LogsContextWrapper } from "./contexts/LogsContext"
import { TeacherInfo } from './pages/TeacherInfo';
import { NurseInfo } from './pages/NurseInfo';
import { InfoLog } from './pages/InfoLog';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { LoginAbove } from './pages/LoginAbove';
import { Loading } from './components/Loading';
import { FormSubmitted } from './pages/FormSubmitted';
import { AddUser } from './pages/AddUser';
import { AddNurse } from './pages/AddNurse';

function App() {
  
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {

        const dbNurses = []
        const q = query(collection(db, "nurses"));
        const nursesSnapshot = await getDocs(q)
        nursesSnapshot.forEach(doc => {
          dbNurses.push(doc.id)
        })
        if (dbNurses.includes(user.uid)) {
          user.nurse = true
        } else {
          user.nurse = false
        }

        const dbAdmins = []
        const s = query(collection(db, "admins"));
        const adminsSnapshot = await getDocs(s)
        adminsSnapshot.forEach(doc => {
          dbAdmins.push(doc.id)
        })
        if (dbAdmins.includes(user.uid)) {
          user.admin = true
        } else {
          user.admin = false
        }

        const dbTeachers = []
        const r = query(collection(db, "teachers"));
        const teacherSnapshot = await getDocs(r)
        teacherSnapshot.forEach(doc => {
          dbTeachers.push(doc.id)
        })
        if (dbTeachers.includes(user.uid)) {
          user.teacher = true
          teacherSnapshot.forEach(doc => {
            if (doc.id === user.uid) {
              user.elcaChargersEmail = doc.data().elcaChargersEmail;
              user.eaglesLandingEmail = doc.data().eaglesLandingEmail;
            }
          })
        } else {
          user.teacher = false
        }


        user.signedIn = true  
        setUser(user)
      } else {
        const user = {}
        user.teacher = false
        user.nurse = false
        user.signedIn = false
        setUser(user)
      }
      setLoading(false)
    })
    return () => unsubscribe();
  }, [])

  if (loading) {
    return <Loading/>
  }

  return (
    
      <Router>
        <UserContext.Provider value={user}>
          <LogsContextWrapper>
            <Navbar/>
            <Routes>
              {(user && user.nurse) && <Route exact path="/" element={<InfoLog/>}/>}
              {(user && user.nurse) && <Route exact path="/info/*" element={<NurseInfo/>}/>}
              {(user && user.nurse) && <Route exact path="/teacherform" element={<TeacherInfo/>}/>}
              {(user && user.admin) && <Route exact path="/addnurse" element={<AddNurse/>}/>}
              {(user && user.admin) && <Route exact path="/adduser" element={<AddUser/>}/>}
              {(user && user.teacher) && <Route exact path="/" element={<TeacherInfo/>}/>}
              {(user && (user.nurse || user.teacher)) && <Route exact path="/formsubmitted/*" element={<FormSubmitted/>}/>}
              {(user && user.signedIn) && <Route path="/*" element={<NotFound/>}/>}
              <Route exact path="/*" element={<LoginAbove/>}/>
            </Routes>
          </LogsContextWrapper>
        </UserContext.Provider>
      </Router>
    
  );
}
export default App;


