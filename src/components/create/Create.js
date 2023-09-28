/* eslint-disable react/jsx-no-duplicate-props */
import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Create () {
  let navigate = useNavigate();

  const [pname, setPname] = useState('');
  const [price, setPrice] = useState('');


  const sendDataToAPI = (e) => {
    e.preventDefault(); 

    axios.post(`https://6512b1a6b8c6ce52b39605e6.mockapi.io/Crud`, {
      pname,
      price
    })
      .then((response) => {
        console.log("pname:", pname)
        navigate('/read')
      })
  };

  const handleBack = () => {
    navigate (-1);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen " >
  <form class="items-center justify-center border-4 border-indigo-700 p-10 m-8" onSubmit={sendDataToAPI}>
    <input
      className="border-2 border-black m-2 p-3 xl:border-xl w-64 "
      type="text"
      name="product"
      placeholder="Product Name"
      onChange={(e) => setPname(e.target.value)}
    />
    <input
      className="border-2 border-black m-2 p-3 xl:border-xl w-64 "
      type="text"
      name="price"
      placeholder="Product Price"
      onChange={(e) => setPrice(e.target.value)}
    />

    <div class="flex justify-center items-center"> 
      <button class="m-2 border-2 border-black  p-3 rounded-xl bg-blue-500 text-white font-bold" type="submit">Submit</button>
      <button class="m-2 border-2 border-black  p-3 rounded-xl bg-blue-500 text-white font-bold" onClick={handleBack} >Back</button>
    </div>
  </form>
</div>

  
  );
}

export default Create;
