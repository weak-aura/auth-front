import React from 'react';
import "./Signup.scss";
import fetchRequest from "../../../utils/fetch.ts"
import {toast, ToastContainer} from 'react-toastify';
import {Link, useNavigate} from "react-router-dom";

export interface FormData {
  name: string | undefined,
  password: string | undefined
}

export const Signup: React.FC = () => {
  const nameRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newUser: FormData = {name: nameRef?.current?.value, password: passwordRef?.current?.value}
    fetchRequest("/signup", "POST", newUser)
      .then(data => {
        console.log(data)
        if(data.status) {
          navigate("/")
        }
        if (data.message) {
          toast(data.message, {theme: "light", autoClose: 1000})
        } else if (data.error) {
          toast(data.error, {theme: "dark", autoClose: 1000})
        }
      })
      .catch(error => console.log(error))
  }

  const getMe = async () => {
    await fetchRequest("/getme", "GET")
      .then(data => {
        if(data.status) {
          navigate("/")
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    getMe()
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Имя:</label>
        <input type="text" name={"name"} ref={nameRef}/>

        <label htmlFor="password">Пароль</label>
        <input type="password" ref={passwordRef}/>
        <button type="submit">Зарегистрироваться</button>

        <div>
          <Link to={"/login"} className={"text-sm hover:underline mt-4 inline-block"}>
            У вас есть аккаунт?
          </Link>
        </div>

      </form>
      <ToastContainer/>
    </div>
  );
};

