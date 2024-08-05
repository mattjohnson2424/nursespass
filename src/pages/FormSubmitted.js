import React from 'react'
import { Link } from 'react-router-dom'

export const FormSubmitted = () => {

  const queryParameters = new URLSearchParams(window.location.search)
  const exists = queryParameters.get("exists")

  return (
    <div className='form-submitted-text'>
        {exists === "true" ? 
          <p>Your form has been submitted. You will receive an email to your eagleslanding.org when your student is on their way back from the nurse.</p>
          :
          <p>Your form has been submitted. Your email is not in our database so you will not receive updates for your student</p>
        }
        
        <Link to="/" className='btn'>Back to form</Link>
    </div>
  )
}
