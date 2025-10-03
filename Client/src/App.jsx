import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-blue-500'>
        FULL STACK WEB APPLICATION {count}
      </div>
    </>
  )
}

export default App
