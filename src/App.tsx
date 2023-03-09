import React, { useState, useEffect } from 'react';

type newColorType = {
  id: string,
  name: string,
  code: string
}

function App() {

  const [colors, setColors] = useState<newColorType[]>([])

  const [formTextVal, setFormTextVal] = useState('')
  const [formColorVal, setFormColorVal] = useState('')

  const handleEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'name'){
      console.log("nameの方のvalue",e.target.value)
      setFormTextVal(e.target.value)
    } else if(e.target.name === 'code') {
      console.log("codeの方のvalue", e.target.value)
      setFormColorVal(e.target.value)
    }

  }
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/mock/create-color", {
        method: "POST",
        body: JSON.stringify({ name: formTextVal, code: formColorVal })
      })

      if(!response.ok) {
        const error = await response.json()
        throw new Error(error.errorMessage)
      }

      const newColor = await response.json()
      setColors([...colors, newColor])
    } catch(error) {
      if(error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    getColors()
  }, [])

  const getColors = async () => {
    try {
      const response = await fetch("/mock/colors-list")

      if(!response) {
        throw new Error("色の一覧取得に失敗しました")
      }

      const colors = await response.json()
      setColors(colors)
    } catch(error) {
      if(error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div className="App">

      <div className="px-4 py-5 border-b rounded-t sm:px-6">
        <h1 className='mb-2 text-3xl font-bold text-gray-800 dark:text-white'>Color List</h1>
          <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {colors.map((color: any, index: any) => (
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700 text-md dark:text-white md:truncate">{color.name}</p>
                      <div className="flex flex-shrink-0 ml-2">
                        <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{color.code}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-3/4 space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 px-4 py-5 bg-gray-100">
              <input type="text" name="name" id="color-name" value={formTextVal} onChange={handleEdit} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Color Name"/>
              <input type="color" name="code" id="color-code" value={formColorVal} onChange={handleEdit}  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full h-auto"/>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                  Add
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default App;
