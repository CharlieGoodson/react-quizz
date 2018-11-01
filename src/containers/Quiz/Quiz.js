import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {

    state = {
        activeQuiz: 0,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 3,
                answers: [
                    {text: 'Черное', id: 1},
                    {text: 'Желтое', id: 2},
                    {text: 'Голубое', id: 3},
                    {text: 'Красное', id: 4}
                ]
            },
            {
                id: 2,
                question: 'Какая столица США?',
                rightAnswerId: 4,
                answers: [
                    {text: 'Вашингтон', id: 4},
                    {text: 'Атланта', id: 2},
                    {text: 'Cиэтл', id: 3},
                    {text: 'Нью-Йорк', id: 1}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        console.log('AnswerId:', answerId)
        this.setState({activeQuiz: this.state.activeQuiz + 1})
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuiz].answers} 
                        question={this.state.quiz[this.state.activeQuiz].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizNumber={this.state.activeQuiz + 1}
                        quizLength={this.state.quiz.length}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz