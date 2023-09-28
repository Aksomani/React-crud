/* eslint-disable react/jsx-no-duplicate-props */
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Update () {

  let navigate = useNavigate();

  const [pname, setPname] = useState('');
  const [price, setPrice] = useState('');
  const [id, setID] = useState(null)

  const sendDataToAPI = (e) => {
    e.preventDefault(); 
  
    console.log(pname); 
    console.log(price); 
  
    axios.put(`https://6512b1a6b8c6ce52b39605e6.mockapi.io/Crud/${id}`, {
      pname,
      price
    })
    .then((response) => {
        console.log(pname); 
    console.log(price); 
      navigate('/read');
    });
  };
  
  
   
  useEffect(() => {
  const storedPname = localStorage.getItem('pname');
  const storedPrice = localStorage.getItem('price');
  const storedID = localStorage.getItem('ID');

//   console.log('storedPname:', storedPname);
//   console.log('storedPrice:', storedPrice, price);
//   console.log('storedID:', storedID);

  if (storedPname !== null) {
    setPname(storedPname);
  }
  if (storedPrice !== null) {
    setPrice(storedPrice);
  }
  if (storedID !== null) {
    setID(storedID);
  }
}, []);

const handleBack = () => {
    navigate (-1);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <form class="items-center justify-center border-3 border-black p-10 m-8"  onSubmit={sendDataToAPI}>
          <input 
           className="border-2 border-black m-2 p-3 xl:border-xl w-64 "
           value={pname}
           placeholder='Product Name' 
           onChange={(e) => setPname(e.target.value)} />
          <input  
          className="border-2 border-black m-2 p-3 xl:border-xl w-64 "
          value={price}
          placeholder='Product Price' 
          onChange={(e) => setPrice(e.target.value)} />
        
    <div class="flex justify-center items-center"> 
        <button class="m-2 border-2   p-3 rounded-xl bg-green-500 text-white font-bold" type='submit'>Update</button>
      <button class="m-2 border-2 border-black  p-3 rounded-xl bg-blue-500 text-white font-bold" onClick={handleBack} >Back</button>

    </div>
      </form>
    </div>
  );
}

export default Update;
