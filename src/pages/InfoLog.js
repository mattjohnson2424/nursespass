import React, { useEffect, useState } from 'react'
import { Log } from "../components/Log"
import { Loading } from "../components/Loading"
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import "./InfoLog.css"
import useWindowDimensions from '../helpers/useWindowDimensions';

export const InfoLog = () => {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [schoolFilter, setSchoolFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [nameFilter, setNameFilter] = useState("")

  const { width } = useWindowDimensions()

  useEffect(() => {
    const q = query(collection(db, 'logs'));

    // Use the onSnapshot listener to react to changes in the "logs" collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dbLogs = [];

      querySnapshot.forEach((doc) => {
        dbLogs.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setLogs(dbLogs); // Update the state with the new data
    });

    // When the component unmounts, unsubscribe from the listener to prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // After setting the logs data in the state, you can set loading to false
    setLoading(false);
  }, [logs]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='info-log'>
        <div className='info-log-grid-container'>
          <input className='info-log-text-input' placeholder="Filter Name" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
          <select className='info-log-text-input' value={schoolFilter} onChange={e => setSchoolFilter(e.target.value)}>
            <option value="all">All Schools</option>
            <option value="lower">Lower School</option>
            <option value="middle">Middle School</option>
            <option value="high">High School</option>
          </select>
          <select className='info-log-text-input' value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
            <option value="all">All Grades</option>
            
            
              {(schoolFilter === "all" || schoolFilter === "lower") && 
                <>
                  <option value={"1"}>1st Grade</option>
                  <option value={"2"}>2nd Grade</option>
                  <option value={"3"}>3rd Grade</option>
                  <option value={"4"}>4th Grade</option>
                </>
              }
              {(schoolFilter === "all" || schoolFilter === "middle") && 
                <>
                  <option value={"5"}>5th Grade</option>
                  <option value={"6"}>6th Grade</option>
                  <option value={"7"}>7th Grade</option>
                  <option value={"8"}>8th Grade</option>
                </>
              }
              {(schoolFilter === "all" || schoolFilter === "high") && 
                <>
                  <option value={"9"}>9th Grade</option>
                  <option value={"10"}>10th Grade</option>
                  <option value={"11"}>11th Grade</option>
                  <option value={"12"}>12th Grade</option>
                </>
              }
            

          </select>
        </div>
        <div className='log-header-body'>
          <div className='log-body-text'>Student Name</div>
          <div className='log-body-text'>Grade</div>
          <div className='log-body-text'>Left Class</div>
          <div className='log-body-text'>Left Nurse</div>
          {width > 768 && 
            <>
              <div className='log-body-text'>Reason</div>
              <div className='log-body-text'>Status</div>
            </>
          }
          
        </div>
        {logs
        .filter(log => {
          if (nameFilter === "") return true
          return log.student.toLowerCase().includes(nameFilter)
        })
        .filter(log => {

          if (schoolFilter === "all") return true

          if (schoolFilter === "high") {
            return log.grade >= 9 && log.grade <= 12
          } else if (schoolFilter === "middle") {
            return log.grade >= 5 && log.grade <= 8
          }  else if (schoolFilter === "lower") {
            return log.grade >= 1 && log.grade <= 4
          }
          return true
        })
        .filter(log => {
          if (gradeFilter === "all") return true
          return log.grade === gradeFilter
        })
        .sort((a, b) => {
          return b.timeLeftClass - a.timeLeftClass
        })
        .map(log => {
            return <Log key={log.id} log={log}/>
        })}
    </div>
  )
}
