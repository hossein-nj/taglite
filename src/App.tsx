import { useState } from 'react';
import { ProductTagsInput } from './components/SimpleTagInput';
import './components/SimpleTagInput/SimpleTagInput.css';


function App() {

  const [tags, setTags] = useState<string[]>([])

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='w-150 mx-auto'>
          <ProductTagsInput
            value={tags || []}
            onChange={setTags}
            maxTags={5}
            allowDuplicates={false}
            separators={['Enter', ',', 'Tab', ';']}
            acceptOnBlur
            clearable
            normalizeTag={tag =>
              tag.trim().toLowerCase()
            }
            validateTag={tag =>
              tag.length >= 3 ||
              'Tag must contain at least 3 characters'
            }
            onInvalidTag={(tag, reason) => {
              console.log('Invalid:', tag, reason)
            }}
            onTagAdd={(tag, index) => {
              console.log('Added:', tag, index)
            }}
            onTagRemove={(tag, index) => {
              console.log('Removed:', tag, index)
            }}
            onClear={() => {
              console.log('All tags cleared')
            }}
          // tagIcon={<CiHashtag />}
          // removeIcon={<MdDelete />}
          />
        </div>
      </div>
    </>
  )
}

export default App
