import { UserStatusType, useUserState } from '@/stores/userStatus'
import { Header as NaviBar } from './Header'

const Header = () => {
  const user: UserStatusType = useUserState()
  return <NaviBar user={user} />
}
export default Header
