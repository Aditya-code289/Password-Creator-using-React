import { useCallback, useState, useEffect, useRef } from 'react'


// We want to make an random password generator where the password length is generated using a length bar, there is opption of numbers and characters and everytime something is changed, the password is generated without reloading the page 

// Moreover there is a button of copy which copies the password generated on the clipboard, not any other text but the password only 


function App() {

  const [length, setLength] = useState(8);
  const [Number,isNumber] = useState(false);
  const [char, isChar] = useState(false);
  const [pass,isPass] = useState("")

  const passGenerator = useCallback((()=>{
    let final_pass = ""
    let data = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(Number) data+="1234567890";
    if(char) data+="!@#$%^&*()_+=-~:;"

    for(let i=1; i<=length; i++){
      
      let random_num = Math.floor(Math.random() * data.length)
      // const char = data.charAt(random_num)
      final_pass+=data.charAt(random_num);
    }

    isPass(final_pass);


  }), [length,Number,char, isPass])


  useEffect(()=>{
    passGenerator()

  },[length, Number,char,isPass] )

  const passRef = useRef(null)
  const copyPass = (()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  })


  return (
    
  <div className="bg-gray-900 min-h-screen relative">
  <div className="bg-gray-700 min-w-80 p-8 rounded-xl text-white absolute top-[150px] left-[550px]">

    <input 
    type="text"
    value={pass}
    placeholder = "password"
    className='w-62 h-14 bg bg-black  classsname="flex shadow rounded-lg overflow-hidden mb-4" '
    readOnly
    ref={passRef}
    /> 

    <button onClick={copyPass} className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>Copy</button>
    
    <br/>

    <input 
    type='range'
    min={8}
    max={20}
    onChange={(e)=>{setLength(e.target.value)}}
    className='cursor-pointer'
    ></input>
    <label className='text-orange-200 ' >length: {length}</label>
    


    <br/>
    <br/>
    <input
    type='checkbox'
    defaultChecked= {Number}
    id='numberInput'
    onChange={()=>{
      isNumber((prev) => !prev)
      
    }}
    ></input>
    <label htmlFor="numberInput">Number</label>

    <br/>
    <br/>

    <input
    type='checkbox'
    defaultChecked= {char}
    id='charInput'
    onChange={()=>{
      isChar((prev) => !prev)
      
    }}
    ></input>
    <label htmlFor='charInput'> Character</label>



  </div>
</div>




    
  )
}

export default App
