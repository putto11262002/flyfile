import { useEffect, useState, } from 'react'
import client from "./api/client"
function App() {
const [status, setStatus] = useState<undefined | string>(undefined)
  useEffect(() => {
    getServerHealth()
  }, [])

  const getServerHealth = async () => {
    const res = await client.api.health.$get()
    const data = await res.json()
    setStatus(data.status)
  }

  return (
    <p className='py-2 text-green-800 font-bold'>
 Status : {status} 
    </p>
  )
}

export default App