import React from 'react'
import './QuizLandnPg.css'
import { Link } from 'react-router-dom'

const QuizLandnPg = () => {
    return (
        <div className='wlkm__area'>

            <div className='abc411'>
                <h2 className='wlkm_phr'>WELCOME !</h2>

                <h4 className='quiz__lnk'>Click <Link to ='/quiz'>Here</Link> To Begin Quiz</h4>
            </div>
            
        </div>
    )
}

export default QuizLandnPg
