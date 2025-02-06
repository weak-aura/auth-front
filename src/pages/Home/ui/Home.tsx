import React from 'react';
import fetchRequest from "../../../utils/fetch.ts";
import {useNavigate} from "react-router-dom";
import "./Home.scss";
interface ItemTypes {
  name: string,
  _id: string,
  createdAt: string
}

export const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false)
  const [item, setItem] = React.useState<ItemTypes | null>(null)
  
  const getMe = async () => {
    setIsLoading(true)
    await fetchRequest("/getme", "GET")
      .then(data => {
        if (!data.status) {
          navigate("/login")
        }
        setItem(data.providedUser)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    getMe()
  }, [])

  
  return (
    <div>
      {isLoading? <h1>Loading...</h1> : (
        <div className="billboard">
          <div className="billboard-content">
            <h1 className="billboard-name">{item?.name}</h1>
            <p className="billboard-id">ID: {item?._id}</p>
            <p className="billboard-date">Дата создания: {item?.createdAt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

