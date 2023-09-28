import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Read = () => {
  let navigate = useNavigate();

  const [apiData, setApiData] = useState([]);
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://6512b1a6b8c6ce52b39605e6.mockapi.io/Crud`)
        .then((getData) => {
          setApiData(getData.data);
          setRetryCount(0);
        })
        .catch((error) => {
          if (error.response && error.response.status === 429 && retryCount < 3) {
            setTimeout(() => {
              setRetryCount(retryCount + 1);
              fetchData();
            }, 5000);
          } else {
            console.error('Error:', error);
          }
        });
    };

    if (retryCount === 0) {
      fetchData();
    }
  }, [retryCount]);

//   const setData =(data)=>{ 
//     let {id, pname, price} = data;
//     localStorage.setItem('ID', id);
//     localStorage.setItem('pname', pname);
//     localStorage.setItem('price', price);

//     console.log("data", data)
//   };
const setData = (data) => {
    let { id } = data;
  
    // Make an API request to retrieve the pname and price based on the id
    axios.get(`https://6512b1a6b8c6ce52b39605e6.mockapi.io/Crud/${id}`)
      .then((response) => {
        const { pname, price } = response.data; // Assuming the API response contains pname and price
        localStorage.setItem('ID', id);
        localStorage.setItem('pname', pname);
        localStorage.setItem('price', price);
  
        console.log("pname:", pname);
        console.log("price:", price);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getData = () => {
    axios.get(`https://6512b1a6b8c6ce52b39605e6.mockapi.io/Crud`).then((getData) => {
      setApiData(getData.data);
      setRetryCount(0);
    });
  };

  const onDelete = (id) => {
    axios.delete(`https://6512b1a6b8c6ce52b39605e6.mockapi.io/Crud/${id}`).then(() => {
      getData();
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('Name');
    localStorage.removeItem('Price');
    localStorage.removeItem('Id');

    navigate('/');
  };

  return (
    <div className="m-3 border border-blue-400">
        <div className='m-2 items-center justify-center '>
            <h1 className='m-2 justify-center items-center'>CRUD Op. using axios</h1>
          </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className='bg-black text-white'>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Update</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((data) => (
            <tr key={data.id}>
              <td className="px-4 py-2">{data.id}</td>
              <td className="px-4 py-2">{data.pname}</td>
              <td className="px-4 py-2">{data.price}</td>
              <td className="px-4 py-2 m-2 text-center ">
                <Link to="/update">
                  <Button onClick={() => 
                    setData(data)} className='bg-green-500 m-2 p-2 text-white rounded'>
                        Update
                    </Button>
                </Link>
              </td>
              <td className="px-4 py-2">
                <Button onClick={() => onDelete(data.id)} className='bg-red-500 m-2 p-2 text-white rounded'>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex">
        <Link className="grid gap-2 m-4" to={`/create`}>
          <Button  className="font-extrabold text-white border bg-blue-500 border-blue-600 p-2 rounded" size="lg">
            Create
          </Button>
        </Link>
        <Button className="grid gap-2 m-4 font-extrabold text-white border p-2 bg-blue-500 border-blue-600  rounded"  size="lg" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Read;
