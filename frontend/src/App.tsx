import React from 'react'
import Button from './components/Button'
import PlusIcon from './icons/PlusIcon'

const App = () => {
  return (
    <>
      <Button variant='primary' size='sm' text='Share' onClick={() => {

      }} />

      <Button variant='secondary' size='md' startIcon={<PlusIcon />} text='Add Content' onClick={() => {

      }} />
    </>
  )
}

export default App