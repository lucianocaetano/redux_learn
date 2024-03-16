import { useAppDispatch } from '../hooks/store';
import { User, deleteUserById, createNewUser } from '../store/users/users.slice';
import { UserId } from '../store/users/users.slice';

export default function useUserAction () {
  const dispatch = useAppDispatch()

  const handleDelete = (id: UserId) => {
    dispatch(
      deleteUserById(id)
    )
  }

  const handleCreateUser = (user: User) => {
    dispatch(
      createNewUser(user)
    )
  }

  return {handleDelete, handleCreateUser}
}
