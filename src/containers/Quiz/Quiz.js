import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {

    state = {
        activeQuiz: 0,
        answerState: null,
        quiz: [
            {
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
        const currentQuestion = this.state.quiz[this.state.activeQuiz]

        if (currentQuestion.rightAnswerId === answerId) {
            this.setState({ answerState: { [answerId]: 'success'} })
            const timeout = setTimeout(() => {
                
                if (this.isQuizFinish()) {
                    console.log('Finished!')
                } else {
                    this.setState({
                        activeQuiz: this.state.activeQuiz + 1,
                        answerState: null
                    })
                }            
                clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({ answerState: { [answerId]: 'error'} })
        }
    }

    isQuizFinish() {
        return this.state.activeQuiz + 1 === this.state.quiz.length
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
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz