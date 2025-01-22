import { screen, render, fireEvent } from '@testing-library/react'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const mockedQuestion = {
  title: 'About Philosophy',
  text: 'Who created buddhism?',
  answers: [
    {
      id: '1',
      text: 'Buddha Shakyamuni',
      isCorrect: true
    },
    {
      id: '2',
      text: 'Jordan Belfort',
      isCorrect: false
    }
  ],
  type: 'oneAnswer',
  category: {
    _id: 'some-text-id-123',
    name: 'Philosophy'
  }
}

const mockedQuestionWithOpenAnswer = {
  type: 'openAnswer',
  text: 'Who created buddhism?',
  answers: [],
  openAnswer: 'Test'
}

const handleInputChangeMock = vi.fn()
const handleNonInputValueChangeMock = vi.fn()

describe('QuestionEditor', () => {
  it('should renders question input field', () => {
    render(
      <QuestionEditor
        data={mockedQuestion}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )

    const questionInput = screen.getByRole('textbox', { name: /question/i })

    expect(questionInput).toBeInTheDocument()
    expect(questionInput).toHaveValue(mockedQuestion.text)
  })

  it('should renders a open answer', () => {
    render(
      <QuestionEditor
        data={mockedQuestionWithOpenAnswer}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )

    const openAnswerInput = screen.getByRole('textbox', { name: /answer/i })

    expect(openAnswerInput).toBeInTheDocument()
    expect(openAnswerInput).toHaveValue(mockedQuestionWithOpenAnswer.openAnswer)
  })

  it('should change question type', () => {
    render(
      <QuestionEditor
        data={mockedQuestion}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )

    const selectInput = screen.getByTestId('app-select')
    fireEvent.change(selectInput, { target: { value: 'multipleChoice' } })

    expect(handleNonInputValueChangeMock).toHaveBeenCalledWith(
      'type',
      'multipleChoice'
    )
  })

  it('should change question input field', () => {
    render(
      <QuestionEditor
        data={mockedQuestion}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )
    const questionInput = screen.getByRole('textbox', { name: /question/i })
    fireEvent.change(questionInput, { target: { value: 'New question' } })

    expect(handleInputChangeMock).toHaveBeenCalledWith('text')
  })

  it('should change answer input field', () => {
    render(
      <QuestionEditor
        data={mockedQuestionWithOpenAnswer}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )
    const openAnswerInput = screen.getByRole('textbox', { name: /answer/i })
    fireEvent.change(openAnswerInput, { target: { value: 'New answer' } })

    expect(handleInputChangeMock).toHaveBeenCalledWith('openAnswer')
  })
})
