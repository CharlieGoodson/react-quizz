import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {},
        isFinished: true,
        activeQuiz: 0,
        answerState: null,
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
                question: 'Столицей США является...',
                rightAnswerId: 1,
                answers: [
                    {text: 'Вашингтон', id: 1},
                    {text: 'Атланта', id: 2},
                    {text: 'Cиэтл', id: 3},
                    {text: 'Нью-Йорк', id: 4}
                ]
            },
            {
                id: 3,
                question: 'Когда началась Вторая Мировая Война?',
                rightAnswerId: 2,
                answers: [
                    {text: '1938', id: 1},
                    {text: '1939', id: 2},
                    {text: '1936', id: 3},
                    {text: '1941', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') return
        }

        const currentQuestion = this.state.quiz[this.state.activeQuiz]
        const results = this.state.results

        if (currentQuestion.rightAnswerId === answerId) {
            if (!results[currentQuestion.id]) {
                results[currentQuestion.id] = 'success'
            }
            this.setState({
                answerState: { [answerId]: 'success'},
                results
            })
            
            const timeout = setTimeout(() => {
                if (this.isQuizFinish()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuiz: this.state.activeQuiz + 1,
                        answerState: null
                    })
                }            
                clearTimeout(timeout)
            }, 1000)
        } else {
            results[currentQuestion.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error'},
                results   
            })
        }
    }

    isQuizFinish() {
        return this.state.activeQuiz + 1 === this.state.quiz.length
    }

    retryHandler = () =>
        this.setState({
            results: {},
            isFinished: false,
            activeQuiz: 0,
            answerState: null
        })

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz 
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuiz].answers} 
                            question={this.state.quiz[this.state.activeQuiz].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizNumber={this.state.activeQuiz + 1}
                            quizLength={this.state.quiz.length}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz