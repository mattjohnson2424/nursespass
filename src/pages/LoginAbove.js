import React from 'react'
import "./LoginAbove.css"

export const LoginAbove = () => {
  return (
    <div className='login-above-container'>
      <img 
        className='background-image'
        src="https://firebasestorage.googleapis.com/v0/b/nursespass.appspot.com/o/nurses.jpeg?alt=media&token=802a76c7-9a10-4892-ac3c-2987a130897f&_gl=1*ekp912*_ga*MjA3MDIzMzU1MC4xNjgyOTY0ODI2*_ga_CW55HF8NVT*MTY5Njg1NTczNi4xMDkuMS4xNjk2ODU2NjU2LjQwLjAuMA.." 
        alt="nurses pass"
      />
      <div className='login-text'>
        <div className='title-text'>Nurses Pass</div>
        <div className='subtitle-text'>Sign In Above</div>
      </div>
    </div>
  )
}
