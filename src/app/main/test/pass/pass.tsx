'use client'

import { axiosClassic } from '@/api/interceptors'
import { PassTestData, PassTestRequire } from '@/types/test.types'
import {
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Pass = () => {
	const { data } = useQuery({
		queryKey: ['getTest'],
		queryFn: () => axiosClassic.get<PassTestData>('test/get-test'),
	})

	const test = data?.data

	// State to keep track of the selected answers
	const [answers, setAnswers] = useState<Record<number, number>>({})

	// Handle answer change
	const handleAnswerChange = (
		questionArrangement: number,
		answerArrangement: number
	) => {
		setAnswers(prevAnswers => ({
			...prevAnswers,
			[questionArrangement]: answerArrangement,
		}))
	}

	const handleSubmit = () => {
		const formattedAnswers = Object.keys(answers).map(key => ({
			questionArrangement: parseInt(key),
			answerArrangement: answers[parseInt(key)],
		}))
		mutate(formattedAnswers)
	}

	const { mutate } = useMutation({
		mutationKey: ['postTest'],
		mutationFn: (data: PassTestRequire[]) => {
			return axiosClassic.post('/test/pass', data)
		},
	})

	return (
		<div className='flex flex-col gap-7'>
			<h1 className='flex w-full items-center justify-center mt-7 text-4xl'>
				Тест для {test?.kit}
			</h1>
			<FormControl>
				{test?.questions?.map(question => (
					<div
						key={question.arrangement}
						className='flex flex-col gap-2 bg-slate-800 rounded-2xl p-4 border-2 border-orange-500'
					>
						<div className='text-2xl'>
							{question.arrangement}. {question.text}
						</div>

						<RadioGroup
							aria-labelledby={`question-${question.arrangement}`}
							value={answers[question.arrangement] || ''}
							onChange={e =>
								handleAnswerChange(
									question.arrangement,
									parseInt(e.target.value)
								)
							}
							name={`radio-buttons-group-${question.arrangement}`}
						>
							{question.answers.map(answer => (
								<FormControlLabel
									key={answer.arrangement}
									value={answer.arrangement.toString()}
									control={<Radio />}
									label={answer.text}
								/>
							))}
						</RadioGroup>
					</div>
				))}
			</FormControl>

			<Button
				onClick={handleSubmit}
				variant='contained'
				color='primary'
				className='mt-7'
			>
				Submit Answers
			</Button>
		</div>
	)
}

export default Pass
