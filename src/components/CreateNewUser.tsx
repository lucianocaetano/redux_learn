import { Button, Card, TextInput, Title } from "@tremor/react"
import useUserAction from "../hooks/useUserAction" 

export function CreateNewUser () {
  const {handleCreateUser} = useUserAction()

  const handleSubmit = (e: React.FormEvent<HTMLFormEvent>) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    const name=formData.get("name") as string
    const email=formData.get("email") as string
    const github=formData.get("github") as string

    handleCreateUser({
      name, email, github
    })

  }

  return (
    <Card className="mt-11 text-left w-[210px] ml-4">
      <Title>Create New User</Title>
      
      <form onSubmit={
        (e)=>handleSubmit(e)
      }>

        <TextInput
          name="name"
          className="rounded-xl"
          placeholder="name"
        />
        <TextInput
          name="email"
          className="rounded-xl my-4"
          placeholder="email"
        />
        <TextInput 
          name="github"
          className="rounded-xl"
          placeholder="github"
        />

        <div>
          <Button
            type="submit"
            className="w-[200px] border-black bg-orange-500 rounded-md mt-8"
          >Crear</Button>
        </div>


      </form>
    </Card>
  )
}
