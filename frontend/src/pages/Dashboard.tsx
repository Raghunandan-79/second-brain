import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import CreateContentModal from '../components/CreateContentModal'
import PlusIcon from '../icons/PlusIcon'
import ShareIcon from '../icons/ShareIcon'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Sidebar />

      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-gray-100 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        <div className='flex justify-end gap-4'>
          <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon size='md' />} />
          <Button onClick={() => {
            setModalOpen(true)
          }} variant='primary' text='Add content' startIcon={<PlusIcon size='lg' />} />
        </div>

        <div className='flex gap-4 mt-7'>
          <Card type='twitter' link='https://x.com/raghu__79/status/2064031035113996414' title='raghu' />
          <Card type='youtube' link='https://www.youtube.com/watch?v=EVDblXLpFxY' title='1st year students' />
        </div>
      </div>
    </div>
  )
}

export default Dashboard