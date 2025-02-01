import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'

import QuestionEditor from '~/components/question-editor/QuestionEditor'

const mockedData = {
  type: 'multipleChoice',
  text: '',
  answers: [],
  openAnswer: ''
}

const handleInputChangeMock = vi.fn()
const handleNonInputValueChangeMock = vi.fn()
const onCancelMock = vi.fn()
const onEditMock = vi.fn()
const onSaveMock = vi.fn()

describe('QuestionEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should renders question input field', () => {
    render(
      <QuestionEditor
        data={mockedData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
        onCancel={onCancelMock}
        onEdit={onEditMock}
        onSave={onSaveMock}
      />
    )
    const questionInput = screen.getByRole('textbox', { name: /question/i })
    expect(questionInput).toBeInTheDocument()
  })

  it('it should renders a open answer', () => {
    render(
      <QuestionEditor
        data={{ ...mockedData, type: 'openAnswer' }}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
        onCancel={onCancelMock}
        onEdit={onEditMock}
        onSave={onSaveMock}
      />
    )
    const openAnswerInput = screen.getByRole('textbox', { name: /answer/i })
    expect(openAnswerInput).toBeInTheDocument()
  })

  it('it should renders questionType multipleChoice', () => {
    render(
      <QuestionEditor
        data={mockedData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )
    const select = screen.getByRole('combobox', {
      value: 'questionPage.questionType.multipleChoice'
    })
    expect(select).toBeInTheDocument()
  })

  it('it should renders questionType openAnswer', () => {
    render(
      <QuestionEditor
        data={mockedData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )
    const select = screen.getByRole('combobox', {
      value: 'questionPage.questionType.openAnswer'
    })
    expect(select).toBeInTheDocument()
  })

  it('it should renders questionType oneAnswer', () => {
    render(
      <QuestionEditor
        data={mockedData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )
    const select = screen.getByRole('combobox', {
      value: 'questionPage.questionType.oneAnswer'
    })
    expect(select).toBeInTheDocument()
  })

  it('it should renders addNewOne ', () => {
    render(
      <QuestionEditor
        data={mockedData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
      />
    )
    const checkbox = screen.getByRole('checkbox', {
      name: 'questionPage.addNewOne'
    })
    expect(checkbox).toBeInTheDocument()
  })

  it('should change question type', async () => {
    render(
      <QuestionEditor
        data={mockedData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
        onCancel={onCancelMock}
        onEdit={onEditMock}
        onSave={onSaveMock}
      />
    )
    const questionInput = screen.getByRole('textbox', { name: /question/i })
    await userEvent.type(questionInput, 'text')
    expect(handleInputChangeMock).toHaveBeenCalledWith('text')
  })

  it('should change answer input field', async () => {
    render(
      <QuestionEditor
        data={{
          ...mockedData,
          type: 'openAnswer'
        }}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
        onCancel={onCancelMock}
        onSave={onSaveMock}
      />
    )
    const openAnswerInput = screen.getByLabelText('questionPage.answer')
    await userEvent.type(openAnswerInput, 'New answer')
    expect(handleInputChangeMock).toHaveBeenCalledWith('openAnswer')
  })

  // it('it should click on edit title and category', async () => {
  //   render(
  //     <QuestionEditor
  //       data={mockedData}
  //       handleInputChange={handleInputChangeMock}
  //       handleNonInputValueChange={handleNonInputValueChangeMock}
  //       onCancel={onCancelMock}
  //       onEdit={onEditMock}
  //       onSave={onSaveMock}
  //     />
  //   )

  // })
})
