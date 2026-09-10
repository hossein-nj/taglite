import { useState } from 'react';
import { ProductTagsInput } from './components/SimpleTagInput';
import './components/SimpleTagInput/SimpleTagInput.css';


function App() {

  const [tags, setTags] = useState<string[]>([])

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='w-150 mx-auto'>

          <p className='mb-10'>React, Next js, Typescript</p>

          <ProductTagsInput
            value={tags || []}
            onChange={setTags}
            acceptOnBlur
            clearable

          />
        </div>
      </div>
    </>
  )
}

export default App
