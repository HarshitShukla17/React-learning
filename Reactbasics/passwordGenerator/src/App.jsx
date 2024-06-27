import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  // const [count, setCount] = useState(0)
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef=useRef()

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*[]+=-_{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, characterAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()//to show that items have been selected
    passwordRef.current?.setSelectionRange(0,passwordRef.current.value.length)
    window.navigator.clipboard.writeText(passwordRef.current.value.substring(0,passwordRef.current.value.length)||"")
  },[passwordRef])


  

  
  //useeffect is just for running the passwordgen fn on dependency
  //change and usecallback is used for optimising the render


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md
     rounded-lg px-4 py-3  my-8 text-orange-500 bg-gray-800
     ">
        <h1 className="text-white text-center my-3 ">Password Genrator</h1>
        <div className="flex shadow 
        rounded-lg overflow-hidden mb-4">

          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            ref={passwordRef}
            readOnly    //does not allow to modify the  value of password field
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >copy</button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
             <input type="range" 
             min={6}
             max={100}
             value={length}
             className="cursor-pointer"
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label >Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
                  type="checkbox" 
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={()=>{
                    setNumberAllowed((prev)=>!prev)
                  }}
               />
               <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
                  type="checkbox" 
                  defaultChecked={characterAllowed}
                  id="characterInput"
                  onChange={()=>{
                    setCharacterAllowed((prev)=>!prev)
                  }}
               />
               <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
