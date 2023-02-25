import React, { useState, useEffect }  from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {

  let { id } = useParams();

  const navigate = useNavigate();
  
  fetch(`http://localhost:3001/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => res.json())
    .then(
      (data) => {
        navigate("/");
      }
    )
  } 

export default Delete;
