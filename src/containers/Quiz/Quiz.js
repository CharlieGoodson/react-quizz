import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {

    state = {
        quiz: [
            {
                answers: [
                    {text: 'Отлично!'},
                    {text: 'Хорошо'},
                    {text: 'Так себе...'},
                    {text: 'Плохо'}
                ]
            }
        ]
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz answers={this.state.quiz[0].answers} />
                </div>
            </div>
        )
    }
}

export default Quiz