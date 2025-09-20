'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

export default function TriviaQuiz90s() {
  const [questions] = useState<Question[]>([
    {
      id: '1',
      question: 'What year did Windows 95 launch?',
      options: ['1994', '1995', '1996', '1997'],
      correct: 1,
      explanation: 'Windows 95 was released on August 24, 1995!',
      category: 'Technology'
    },
    {
      id: '2',
      question: 'What was the maximum speed of a 56K modem?',
      options: ['56 Kbps', '56 KB/s', '56 Mbps', '56 MB/s'],
      correct: 0,
      explanation: '56K modems had a theoretical maximum of 56 kilobits per second!',
      category: 'Internet'
    },
    {
      id: '3',
      question: 'Which company created the dancing baby animation?',
      options: ['Microsoft', 'Netscape', 'Character Studio', 'Adobe'],
      correct: 2,
      explanation: 'The dancing baby was created using Character Studio by Kinetix!',
      category: 'Pop Culture'
    },
    {
      id: '4',
      question: 'What was the storage capacity of a 3.5" floppy disk?',
      options: ['720 KB', '1.2 MB', '1.44 MB', '2.88 MB'],
      correct: 2,
      explanation: 'Standard 3.5" floppy disks held 1.44 MB of data!',
      category: 'Technology'
    },
    {
      id: '5',
      question: 'Which search engine was the most popular in the 90s?',
      options: ['Google', 'Yahoo!', 'AltaVista', 'Excite'],
      correct: 1,
      explanation: 'Yahoo! was the dominant search engine before Google!',
      category: 'Internet'
    },
    {
      id: '6',
      question: 'What does "ASL" mean in 90s chat rooms?',
      options: ['American Sign Language', 'Age, Sex, Location', 'Always Stay Late', 'Awesome Super Link'],
      correct: 1,
      explanation: 'ASL stood for Age, Sex, Location - a common chat room greeting!',
      category: 'Internet'
    },
    {
      id: '7',
      question: 'Which video game console was released in 1995?',
      options: ['PlayStation', 'Nintendo 64', 'Sega Saturn', 'All of the above'],
      correct: 3,
      explanation: 'All three major consoles were released in 1995!',
      category: 'Gaming'
    },
    {
      id: '8',
      question: 'What was the name of the first web browser?',
      options: ['Netscape', 'Internet Explorer', 'Mosaic', 'Firefox'],
      correct: 2,
      explanation: 'Mosaic was the first popular web browser, released in 1993!',
      category: 'Internet'
    }
  ])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft > 0 && !showResult && !quizComplete) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1) // Time's up
    }
    return () => clearTimeout(timer)
  }, [timeLeft, showResult, quizComplete])

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setQuizComplete(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizComplete(false)
    setTimeLeft(30)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "EXCELLENT! You're a 90s expert! 🌟"
    if (percentage >= 70) return "GOOD JOB! You know your 90s stuff! 👍"
    if (percentage >= 50) return "NOT BAD! You remember some things! 😊"
    return "KEEP TRYING! The 90s were awesome! 🤔"
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return '#00ff00'
    if (percentage >= 70) return '#ffff00'
    if (percentage >= 50) return '#ff8000'
    return '#ff0000'
  }

  if (quizComplete) {
    return (
      <div style={{
        background: '#000080',
        color: '#ffffff',
        border: '2px solid #ffffff',
        padding: '20px',
        fontFamily: 'Courier New, monospace',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '20px', marginBottom: '16px', fontWeight: 'bold' }}>
          🎉 QUIZ COMPLETE! 🎉
        </div>
        
        <div style={{
          fontSize: '16px',
          marginBottom: '12px',
          color: getScoreColor()
        }}>
          Your Score: {score}/{questions.length}
        </div>
        
        <div style={{
          fontSize: '14px',
          marginBottom: '16px',
          color: '#ffffff'
        }}>
          {getScoreMessage()}
        </div>

        <div style={{
          background: '#008080',
          border: '1px solid #ffffff',
          padding: '12px',
          marginBottom: '16px',
          fontSize: '12px',
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quiz Summary:</div>
          <div>• Total Questions: {questions.length}</div>
          <div>• Correct Answers: {score}</div>
          <div>• Percentage: {Math.round((score / questions.length) * 100)}%</div>
          <div>• Categories: Technology, Internet, Pop Culture, Gaming</div>
        </div>

        <button
          onClick={restartQuiz}
          style={{
            background: '#008080',
            color: '#ffffff',
            border: '2px outset #008080',
            padding: '8px 16px',
            cursor: 'pointer',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div style={{
      background: '#000080',
      color: '#ffffff',
      border: '2px solid #ffffff',
      padding: '16px',
      fontFamily: 'Courier New, monospace',
      maxWidth: '500px'
    }}>
      {/* Header */}
      <div style={{
        background: '#008080',
        color: '#ffffff',
        padding: '8px',
        marginBottom: '12px',
        textAlign: 'center',
        border: '1px solid #ffffff'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          🧠 90s TRIVIA QUIZ 🧠
        </div>
        <div style={{ fontSize: '10px' }}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Timer */}
      <div style={{
        textAlign: 'center',
        marginBottom: '12px',
        fontSize: '12px',
        color: timeLeft <= 10 ? '#ff0000' : '#ffffff'
      }}>
        Time Left: {timeLeft} seconds
      </div>

      {/* Question */}
      <div style={{
        background: '#000080',
        border: '1px solid #ffffff',
        padding: '12px',
        marginBottom: '12px',
        fontSize: '12px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Category: {question.category}
        </div>
        <div style={{ lineHeight: '1.4' }}>
          {question.question}
        </div>
      </div>

      {/* Options */}
      {!showResult ? (
        <div style={{ marginBottom: '12px' }}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              style={{
                width: '100%',
                padding: '8px 12px',
                marginBottom: '4px',
                background: '#008080',
                color: '#ffffff',
                border: '2px outset #008080',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '11px',
                textAlign: 'left'
              }}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          {/* Result */}
          <div style={{
            background: selectedAnswer === question.correct ? '#008000' : '#800000',
            border: '1px solid #ffffff',
            padding: '8px',
            marginBottom: '8px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {selectedAnswer === question.correct ? '✅ CORRECT!' : '❌ WRONG!'}
          </div>

          {/* Explanation */}
          <div style={{
            background: '#000080',
            border: '1px solid #ffffff',
            padding: '8px',
            marginBottom: '12px',
            fontSize: '11px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Explanation:
            </div>
            <div>
              {question.explanation}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextQuestion}
            style={{
              width: '100%',
              padding: '8px',
              background: '#008080',
              color: '#ffffff',
              border: '2px outset #008080',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'SEE RESULTS'}
          </button>
        </div>
      )}

      {/* Progress */}
      <div style={{
        fontSize: '10px',
        textAlign: 'center',
        marginTop: '8px',
        color: '#ffffff'
      }}>
        Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
      </div>
    </div>
  )
}
