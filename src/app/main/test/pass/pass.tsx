'use client'

import { axiosClassic } from '@/api/interceptors'
import { URL } from '@/cfg/pages-url.cfg'
import Download from '@/components/ui/download'
import { useCountdown } from '@/hooks/use-countdown'
import {
	PassTestData,
	PassTestRequire,
	PassTestResponse,
} from '@/types/test.types'
import {
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const Pass = () => {
	const router = useRouter()

	const { isBlock, isLoading: countdownLoading, refetch } = useCountdown()

	useEffect(() => {
		if (isBlock) {
			router.push(URL.COMPOSITION)
		}
	}, [isBlock, router])

	const { data, isLoading: testLoading } = useQuery({
		queryKey: ['getTest'],
		queryFn: () => axiosClassic.get<PassTestData>('test/get-test'),
	})

	const test = data?.data
	const questionRefs = useRef<(HTMLDivElement | null)[]>([])

	const [answers, setAnswers] = useState<Record<number, number>>({})

	const handleAnswerChange = (
		questionArrangement: number,
		answerArrangement: number
	) => {
		setAnswers(prevAnswers => ({
			...prevAnswers,
			[questionArrangement]: answerArrangement,
		}))
	}

	const handleSubmit = async () => {
		const formattedAnswers = Object.keys(answers).map(key => ({
			questionArrangement: parseInt(key),
			answerArrangement: answers[parseInt(key)],
		}))

		const unansweredQuestions = test?.questions.filter(
			question => !answers[question.arrangement]
		)

		if (unansweredQuestions?.length) {
			toast.error('Вы ответили не на все вопросы')

			const firstUnansweredQuestion = unansweredQuestions[0]

			const questionIndex = test?.questions.findIndex(
				question => question.arrangement === firstUnansweredQuestion.arrangement
			)

			if (questionIndex !== undefined && questionRefs.current[questionIndex]) {
				questionRefs.current[questionIndex]?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
				return
			}
		}

		mutate(formattedAnswers)

		await router.push(URL.TEST_HISTORY)
	}

	const { data: results, mutate } = useMutation({
		mutationKey: ['postTest'],
		mutationFn: (data: PassTestRequire[]) => {
			return axiosClassic.post<PassTestResponse>('/test/pass', data)
		},
	})

	if (countdownLoading || testLoading || isBlock) return <Download />

	return (
		<div className='flex flex-col gap-7'>
			<h1 className='flex w-full items-center justify-center mt-7 text-4xl'>
				Тест для {test?.kit}
			</h1>
			<FormControl className='flex flex-col gap-8'>
				{test?.questions?.map((question, index) => (
					<div
						key={question.arrangement}
						className='flex flex-col gap-2 bg-slate-800 rounded-2xl p-4 border-2 border-orange-500'
						ref={el => (questionRefs.current[index] = el) as any}
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
				color='warning'
				className='mt-7'
			>
				Отправить ответы
			</Button>
		</div>
	)
}

export default Pass
