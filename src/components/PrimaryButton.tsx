import {FC} from 'react'
import { ButtonProps } from '../types/Interfaces'

const PrimaryButton:FC<ButtonProps> = ({text, onclick}) => {
  return (
    <button onClick={onclick} className='w-20 bg-blue-600 text-white rounded-md h-10 mx-3'>{text}</button>
  )
}

export default PrimaryButton