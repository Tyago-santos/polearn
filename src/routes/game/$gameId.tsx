import beginnerQuiz from '@/api'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
export const Route = createFileRoute('/game/$gameId')({
  component: HeaderGame,
})

function HeaderGame() {

  const [answerCount ,setAnswerCount] = useState(beginnerQuiz.length)
  const [answerActive, setAnswerActive] =  useState(6)

  const calcAnswer = (answerActive / answerCount) *100
  console.log(calcAnswer)

  return <main className='px-4'>
    <header>
      <nav className='max-w-2xl m-auto flex items-center justify-between'>
        <img className='size-35' src="/logo.png" alt="logo" />


  <button className='border-2 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer px-4 py-2 font-bold text-red-500 rounded-full'>Desistir</button>
      </nav>

      

      <div className='max-w-2xl relative flex items-center justify-center m-auto h-10  rounded-lg  bg-text-secondary p-4 '>

           <span className='z-99 text-white'>   {answerActive}/{answerCount}</span>
        <div style={{width: `${calcAnswer}%`}} className='flex transition-width duration-1000 absolute right-0 bottom-0 top-0 left-0 bg-green-500 items-center justify-center rounded-lg '></div>
      </div>
    </header>

    <div className='max-w-2xl m-auto mt-10 '>
    <p className='text-3xl mb-10 font-bold'>{beginnerQuiz[answerActive].question}</p>



    
    {
      beginnerQuiz[answerActive].options.map((option, i)=>(
        <div key={i} className=''>
        <span className='flex item-center gap-4 text-xl border-2 border-text-secondary my-4 p-4 rounded-lg cursor-pointer hover:bg-green-500 transition-color duration-500 hover:text-white'>
          {option}
        </span>

        </div>
      ))
    }
      
      
    </div>
  </main>
}
