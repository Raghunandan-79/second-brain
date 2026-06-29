import Button from './components/Button'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

const App = () => {
  return (
    <>
      <Button variant='primary' size='sm' startIcon={<ShareIcon size='md' />} text='Share' onClick={() => {

      }} />

      <Button variant='secondary' size='md' startIcon={<PlusIcon size='lg' />} text='Add Content' onClick={() => {

      }} />
    </>
  )
}

export default App