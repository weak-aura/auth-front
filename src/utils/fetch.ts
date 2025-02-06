import React from "react";

export interface PromiseTypes{
  status: boolean,
  message: string,
  error: string,
  providedUser: null,
  
  setItem:  React.Dispatch<React.SetStateAction<object>> | null
}

// const environment = process.env.NODE_ENV === "production"? import.meta.env.VITE_API_URL_PRODUCTION : import.meta.env.VITE_API_URL_DEVELOPMENT;


const fetchRequest = (route: string, method: string, payload?: object): Promise<PromiseTypes> => {
  const url: string = `${import.meta.env.VITE_API_URL_PRODUCTION}/api/auth${route}`
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      body: JSON.stringify(payload),
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
      .then((response) => {
       return response.json()
      })
      .then(data => {
        return resolve(data)
      })
      .catch(error => reject(error))
  })
}

export default fetchRequest
