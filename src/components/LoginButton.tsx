import {useAuth0} from '@auth0/auth0-react'
import { Button } from './ui/button'

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0()
  return (
    <Button onClick={async() => await loginWithRedirect()}>Unlock History - Log In</Button>
  )
}

export default LoginButton
