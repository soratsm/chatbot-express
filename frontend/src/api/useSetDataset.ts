import { useState, useCallback } from 'react'
import axios from 'axios'
import { Questions, Answers } from '@prisma/client'

type dataset = Questions & { answers: Pick<Answers, 'content' | 'nextId'>[] }

export const useSetDataset = () => {
  const [dataset, setDataset] = useState<dataset[]>([])

  const getCollections = useCallback(async () => {
    axios.get('http://localhost:8000/api/v1/chats').then((res) => {
      console.log(res.data)
      setDataset(res.data)
      console.log(dataset)
    })
  }, [])
  return { getCollections, dataset }
}
