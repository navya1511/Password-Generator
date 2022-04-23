import {FaClipboard} from "react-icons/fa"
import React , {useState} from "react"
import {toast , ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import "./App.css"
import { numbers , specialCharacters , upperCaseLetters , lowerCaseLetters} from "./Characters"


function App() {
  const [password , setPassword] = useState('')
  const [passwordLength , setPasswordLength] = useState(20)
  const [includeUppercase , setIncludeUpperCase] = useState(false)
  const [includeLowerCase , setIncludeLowerCase] = useState(false)
  const [includeNumbers , setIncludeNumbers] = useState(false)
  const [includeSymbols , setIncludeSymbols] = useState(false)
  

  const handleGeneratePassword = (e)=>{
    if(!includeLowerCase && 
      !includeUppercase && 
      !includeNumbers && 
      !includeSymbols){
        notify("SElect atleast one option" , true)
      }
    let characterList = ""
    if(includeLowerCase){
      characterList = characterList + lowerCaseLetters;
    }
    if(includeUppercase){
      characterList = characterList + upperCaseLetters;
    }
    if(includeNumbers){
      characterList = characterList + numbers;
    }
    if(includeSymbols){
      characterList = characterList + specialCharacters;
    }

   setPassword(createPassword(characterList))
  }
  const createPassword = (characterList)=>{
    let password = ''
    const listLength = characterList.length;
    for(let i = 0 ; i<passwordLength;i++){
     const characterIndex = Math.round(Math.random()*listLength)
     password = password + characterList.charAt(characterIndex)

    }
    return password;
    
  }
  const copyToClipboard = () =>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    
    navigator.clipboard.writeText(newTextArea.value)
  }
  const handleCopyGenerator = (e)=>{
    if(password === ''){
       notify("nothing to copy" , true)
    }
    else{
      copyToClipboard()
      notify("Copy to Clipboard")
    }

  }
  const notify = (message , hasError = false)=>{
    if(hasError){
      toast.error(message , {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      )

    }
    else{
      toast(message , {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

  }

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="pass">
            Password Generator
          </h2>
          <div className="password__generator">
            <h4>{password}</h4>
            <button className="copy_btn" onClick={handleCopyGenerator}>
              <FaClipboard />
            </button>
          </div>
          <div className="form-group">
              <label htmlFor="password-strength">Password Length</label>
              <input 
              defaultValue={passwordLength}
              onChange = {(e)=> setPasswordLength(e.target.value)}
              type="number" 
              name="password-strength"
              id="password-strength"
              max="20"
              min="10"
              />
          </div>
          <div className="form-group">
              <label htmlFor="uppercase-letters">Uppercase letters</label>
              <input 
              checked={includeUppercase}
              onChange={(e)=> setIncludeUpperCase(e.target.checked)}
              type="checkBox" 
              name="uppercase-letters"
              id="uppercase-letters"
              />
          </div>
          <div className="form-group">
              <label htmlFor="lowercase-letters">Lowercase letters</label>
              <input 
              checked={includeLowerCase}
              onChange = {(e)=>setIncludeLowerCase(e.target.checked)}
              type="checkBox" 
              name="lowercase-letters"
              id="lowercase-letters"
              />
          </div>
          <div className="form-group">
              <label htmlFor="numbers">Include Numbers</label>
              <input 
              checked={includeNumbers}
              onChange = {(e)=> setIncludeNumbers(e.target.checked)}
              type="checkBox" 
              name="numbers"
              id="numbers"
              />
          </div>
          <div className="form-group">
              <label htmlFor="symbols">Include symbols</label>
              <input 
              checked={includeSymbols}
              onChange={(e)=> setIncludeSymbols(e.target.checked)}
              type="checkBox" 
              name="symbols"
              id="symbols"
              />
          </div>
          <button className="generator__btn" onClick={handleGeneratePassword}>Generate Button</button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          
        </div>
      </div>
    </div>
  );
}

export default App;
