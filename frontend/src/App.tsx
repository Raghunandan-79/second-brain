import { useState } from 'react'
import Button from './components/Button'
import Card from './components/Card'
import CreateContentModal from './components/CreateContentModal'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

const App = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className='p-4'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className='flex justify-end gap-4'>
        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon size='md' />} />
        <Button onClick={() => {
          setModalOpen(true)
        }} variant='primary' text='Add content' startIcon={<PlusIcon size='lg' />} />
      </div>

      <div className='flex gap-4'>
        <Card type='twitter' link='https://x.com/raghu__79/status/2064031035113996414' title='raghu' />
        <Card type='youtube' link='https://www.youtube.com/watch?v=EVDblXLpFxY' title='1st year students' />
      </div>
    </div>
  )
}

export default App