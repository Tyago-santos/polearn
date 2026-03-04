import beginnerQuiz from "@/api";
import { useState } from "react";

import ModalAlert from '@/components/ModalAlert'


export default function  GameQuestion (){

  const [answerCount ,] = useState(beginnerQuiz.length)
  const [answerActive, ] =  useState(6)
  const [openModal, setOpenModal] = useState(false)

  const calcAnswer = (answerActive / answerCount) *100

  return <div>

        <div className='max-w-2xl relative flex items-center justify-center m-auto h-10  rounded-lg  bg-text-secondary p-4 '>

           <span className='z-99 text-white'>   {answerActive}/{answerCount}</span>
        <div style={{width: `${calcAnswer}%`}} className='flex transition-width duration-1000 absolute right-0 bottom-0 top-0 left-0 bg-green-500 items-center justify-center rounded-lg '></div>
      </div>

       <div className='max-w-2xl m-auto mt-10 '>
        <p className='text-3xl mb-10 font-bold'>{beginnerQuiz[answerActive].question}</p>



        
        {
          beginnerQuiz[answerActive].options.map((option, i)=>(
            <div key={i} className=''>
            <span onClick={()=>setOpenModal(true)} className='flex item-center gap-4 text-xl border-2 border-text-secondary my-4 p-4 rounded-lg cursor-pointer hover:bg-green-500 transition-color duration-500 hover:text-white'>
              {option}
            </span>

            </div>
          ))
        }
      
    </div>

   {openModal&& <ModalAlert onClose={setOpenModal}/>}
  </div> 
} 