import './App.css'
import ListOfUsers from './components/ListOfUsers'
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <ListOfUsers/>
      <Toaster richColors />
    </>
  )
}

export default App
