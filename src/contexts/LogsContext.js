import React, { createContext, useState, useEffect } from "react";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

export const LogsContext = createContext(null);

export const LogsContextWrapper = props => {

    const [logs, setLogs] = useState([])


    useEffect(() => {
        const q = query(collection(db, "logs"));
        const dbLogs = [];
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dbLogs.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setLogs(dbLogs);
        });


    }, [])

  return (
    <LogsContext.Provider value={logs}>
        {props.children}
    </LogsContext.Provider>
  )
}