import { useState, type ChangeEvent } from "react";

export const useLoginHooks = () => {
        const [user, setUser] = useState({email:'', password:""});
  
  const handleChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const {name, value} = event.target;

    setUser(pre => ({...pre, [name]:value}))
  }

  const handleSubmit = () => {
    console.log(user);
  }

  return {
    user, handleChange, handleSubmit
  }
}