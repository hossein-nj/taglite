import { useState } from 'react';
import { SimpleTagInput } from './components/SimpleTagInput';
import './components/SimpleTagInput/SimpleTagInput.css';


function App() {

  const [tags, setTags] = useState<string[]>([])

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='w-150 mx-auto space-y-5'>

          <p className='mb-10'>React, Next js, Typescript</p>

          <SimpleTagInput value={tags} onChange={setTags} />

          <SimpleTagInput
            value={tags}
            onChange={setTags}
            accentColor="#7B61E8"
          />

          <SimpleTagInput
            value={tags}
            onChange={setTags}
            theme="dark"
            accentColor="#7B61E8"
          />

          <SimpleTagInput
            value={tags}
            onChange={setTags}
            theme="retro"
            accentColor="rgb(16, 185, 129)"
          />

        </div>
      </div>
    </>
  )
}

export default App
