import { useState ,useCallback,useEffect, useRef} from 'react'
import './index.css';


function App() {
const [length,setLength]=useState(8)
const[numberAllowed,setNumberAllowed]=useState(false);
const[charAllowed,setCharAllowed]=useState(false);
const[password,setPassword]=useState("")
//useref hook
const passwordRef=useRef(null)//without this no issue will be there but to highlight password while pressing copy button we use useref hook 
const passwordGenerator=useCallback(()=>{//fnx is defined and use callaback used for re render (to reflect changes in ui automatically)
  let pass=""
  let str="ABCDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed){
    str+="0123456789"
  }
  if(charAllowed){
    str+="!@#&*{}+=^%$"
  }
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
  }
  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])//setpassword is one of dependencies used for optimisation only it doesnt affect the logic(mamoisation concept)
const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select() //used for highlighting pass while copy button is pressed
  // passwordRef.current?.setSelectRange(0,3)   //for selecting passwaord from 0 index to 3 index
  window.navigator.clipboard.writeText(password)
},[password])//password dependency h but na likein to no issue


useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])//if any of dependencies in array is touched in ui then function reruns(use callback)
  return (
    <>
   
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
        <h1 className ='text-white text-center my-4 hover:bg-amber-600'>Password Generator</h1> 
          
        
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
        className='bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-black'
        >copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          
           />
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}/>
            <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllowed} 
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor='charactrInput' >Characters</label>
        </div>
      </div>
      </div>
      
    </>
  )
}

export default App
