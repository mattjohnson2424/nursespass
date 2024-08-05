import React from 'react'
import { Link } from 'react-router-dom'
import "./Log.css"
import dayjs from 'dayjs'
import useWindowDimensions from '../helpers/useWindowDimensions'

export const Log = ({ log }) => {

  const { width } = useWindowDimensions()


  return (
    <Link className="log-body" to={`/info/?id=${log.id}`}>
        <div className='log-body-text'>{log.student}</div>
        <div className='log-body-text'>{log.grade}</div>
        <div className='log-body-text'>{width > 768? dayjs(log.timeLeftClass).format("ddd, MMMM D [at] h:mma") : dayjs(log.timeLeftClass).format("h:mma")}</div>
        <div className='log-body-text'>{log.timeLeftNurse && dayjs(log.timeLeftNurse).format("h:mma")}</div>
        {width > 768 && <div className='log-body-text'>{log.reason}</div>}
        {width > 768 && <div className='log-body-text' style={{ color: `${log.complete ? "#02e853" : "red"}` }}>{log.complete ? "Complete" : "Incomplete"}</div>}
    </Link>
  )
}
