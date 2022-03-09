import { memo, VFC } from 'react'
import { Box, styled } from '@mui/material'

import { Answer } from '.'
import {  Answers } from '@prisma/client'

type Props = {
  answers: Pick<Answers, 'content' | 'nextId'>[]
  onClickAnswer: (answer: Pick<Answers, 'content' | 'nextId'>) => void
}

const AnswersList: VFC<Props> = (props) => {
  const { answers, onClickAnswer } = props
  return (
    <SBox>
      {answers.map((answer, index) => (
        <Answer
          key={index.toString()}
          content={answer.content}
          onClick={() => onClickAnswer(answer)}
        />
      ))}
    </SBox>
  )
}

export default memo(AnswersList)

const SBox = styled(Box)({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'flex-end',
  height: '192px',
})
