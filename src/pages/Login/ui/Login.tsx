import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { toast} from "react-toastify";
import fetchRequest from "../../../utils/fetch.ts";
import {FormData} from "../../Signup/ui/Signup.tsx";


export const Login = () => {
  const nameRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newUser: FormData = {name: nameRef?.current?.value, password: passwordRef?.current?.value}

    fetchRequest("/login", "POST", newUser)
      .then((data) => {
        if (data.status) {
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
        <button type="submit">Войти</button>

        <div>
          <Link to={"/signup"} className={"text-sm hover:underline mt-4 inline-block"}>
            Ссылка для регистраций
          </Link>
        </div>

      </form>
    </div>
  );
};

