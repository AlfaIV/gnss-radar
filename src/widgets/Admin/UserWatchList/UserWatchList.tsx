import UserList from '~/features/Admin/UserList/UserList'
import { UserListProps } from '~/shared/typings/user/userTypings'

const UserWatchList = (props: UserListProps) => {
  const { isDeletedUsers = false } = props

  return <UserList isDeletedUsers={isDeletedUsers} />
}

export default UserWatchList
