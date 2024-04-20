import { useAuth } from 'src/hooks/useAuth'

const navigation = () => {
  const { userMenu } = useAuth()
  return Object.keys(userMenu).map((i) => (userMenu[i]));

}

export default navigation
