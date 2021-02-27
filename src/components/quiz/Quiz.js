import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../header/Header'
import { getQuiz } from '../redux/features/quiz/quizSlice'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { IoIosArrowRoundBack } from 'react-icons/io'
import QuizData from './QuizData'
import './Quiz.css'
import axios from 'axios'
import history from '../utils/history'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast'
import { Timer } from './Timer'
//import { useToast } from "@chakra-ui/react"

const Quiz = () => {
    const dispatch = useDispatch();
    const { quizInfo, loading } = useSelector((state) => state.quiz);
    const [userAnswers, setUserAnswers] = useState([]);
    const [submitQuiz, setSubmitQuiz] = useState(false);
    
    const spinner = loading ? <div><Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto'/></div> : null

    useEffect(() => {
        const getQuizData = dispatch(getQuiz())
        console.log(getQuizData)
    }, [dispatch]);

/*     useEffect(() => {
        const questionprops = JSON.stringify(quizInfo.questions);
        localStorage.setItem('questions', questionprops)
    }, [quizInfo.questions]); */

    
    const setAnswers = (thisAnswer) => {
        const fetchAnswer = userAnswers.find(quizAnswer => quizAnswer.questionId === thisAnswer.questionId);
        if (fetchAnswer){
            setUserAnswers(thoseAnswers => (
                thoseAnswers.map(thenAnswer => (
                    thenAnswer.questionId === thisAnswer.questionId ? {
                        ...thoseAnswers,
                        selectedAnswer : thisAnswer.selectedAnswer,
                    }
                    : thenAnswer
                ))
            ))
        } else{
            setUserAnswers(thoseAnswers => [...thoseAnswers, thisAnswer])
        }
    }


    const submitQuizHandler = async(event) => {
        event.preventDefault();
        setSubmitQuiz(true)
        try{
            const response = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
            { userAnswers, quizId: quizInfo.questions[0].quizId })
            console.log(response);
            const { totalScore } = response.data.meta;
            history.push('/quiz-landing-page');
            setSubmitQuiz(false)
            Swal.fire({
                icon: 'success',
                title: 'Quiz Completed!',
                text: `Your total score is ${totalScore} out of ${quizInfo.totalQuestions}`,
                footer: '<a href="/quiz-landing-page">Take Quiz Again</a>'
            })
        } catch (e){
            console.log(e)
            toast.error('OOPs! An error occurred!')
            setSubmitQuiz(false)
        }
    }


    return (
        <div>
            <div 
            style = {{
                margin: '30px', display: 'flex', alignItems: 'center'
            }}
            >
            
            <Link to = '/quiz-landing-page'>
            
            <IoIosArrowRoundBack 
            style = {{
                fontSize: '2rem', color: 'rgba(6, 6, 158, 0.562'
            }}
            />
            </Link>
            
            Back
            
            </div>

            <Header/>

            <form onSubmit = {submitQuizHandler}>
                {loading ? (<span style = {{margin: '3rem'}}>
                {spinner}
                </span>) :

                (<section>
                
                <div className='timer-quiz mx-auto mb-3 px-4'>
                {quizInfo.questions.length > 0 && quizInfo.totalTime && (
                    <Timer totalTime={quizInfo.totalTime} submit={submitQuizHandler} />
                  )}
                </div>

                <div>
                    {quizInfo.questions.map(question => (
                        <QuizData key = {question.id} question = {question} setAnswers = {setAnswers} userAnswers = {userAnswers}/>
                    ))}
                </div>

                </section>)}


                <div className='footer__area'>

                <div className = 'buttons__quiz'>
                    <button className='quiz-btns'>{submitQuiz ? (<Spinner animation='border' variant='secondary' />) : (<span>Submit</span>)}
                    </button>
                </div>
                </div>
            </form>
            
            
        </div>
    )
}

export default Quiz
