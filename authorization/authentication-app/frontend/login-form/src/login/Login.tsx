import { useLoginHooks } from './loginHook';
import './login.css';

export function Login() {
    const {user, handleChange, handleSubmit} = useLoginHooks();
  return (
    <div className="container">
      <input type="email" value={user.email} onChange={handleChange} name='email' />
      <input type="password" value={user.password} onChange={handleChange} name='password'/>
      <button onClick={handleSubmit}> Submit </button>
    </div>
  )
}