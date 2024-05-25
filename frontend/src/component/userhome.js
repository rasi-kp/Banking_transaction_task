import React, { useEffect, useState } from 'react'

import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit',
    minute: '2-digit', second: '2-digit', hour12: false,
  }).format(date);
};

function Userhome() {
  const navigate = useNavigate()
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [filterType, setFilterType] = useState("none");

  const [transaction, setTransaction] = useState([]);
  const [modal, setModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('')
  const [user, setUser] = useState(0);
  const [sender, setSender] = useState(0);

  const handleChange = (e) => {
    setFilterType(e.target.value);
  };

  useEffect(() => {
    if (!token) {
      {
        navigate('/login');
      }
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transaction', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.error) {
          navigate('/');
          return;
        }
        // Handle your response data if necessary
        const datas = response.data;
        setTransaction(datas.transactions)
        setUser(datas.user)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate,modal]);
  const submit =async () => {
    if (!type) {
      toast.error('Please select a transaction type.');
      return false;
    }
    if (!sender) {
      toast.error('Please select a user.');
      return false;
    }
    if (!amount || amount <= 0) {
      toast.error('Please enter an amount greater than 0.');
      return false;
    }
    if (type === 'withdrawal' && user.balance<amount) {
      toast.error('Insufficent Balance');
      return false;
    }
    const response = await axios.post('http://localhost:3000/transaction', { amount, type },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if(response.data.success){
          toast.success('Transaction Successfull');
          setModal(false)
        }
  }


  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
          <div className="text-lg font-semibold">
            Available Balance: <span className="text-green-600 font-bold">{user.balance}</span>
          </div>
          <button onClick={() => setModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create a Transaction
          </button>
        </div>
        <div className="flex justify-center m-5">
          <div className="">
            <select name="" id="" className="form-select block w-full text-center" onChange={handleChange}>
              <option hidden={true}>filter by</option>
              <option value="deposit">deposit</option>
              <option value="withdrawal">withdrawal</option>
              <option value="none">none</option>
            </select>
          </div>
        </div>

        <div className='mx-20 mb-10'>
          <table className="table bg-gray-200 text-center w-full mx-auto mt-3 shadow border ">
            <thead className="bg-light">
              <tr >
                <th className='p-2' scope="col">Transaction ID</th>
                <th className='p-2' scope="col">Date</th>

                <th scope="col">Type</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((data, index) => (
                <tr>
                  <th className='p-1' scope="row">{data._id}</th>
                  <td>{formatDate(data.date)}</td>
                  <td className={data.type === 'deposit' ? ' text-green-700' : 'text-red-600'}>
                    {data.type}</td>
                  <td className={data.type === 'deposit' ? 'bg-green-500' : 'bg-red-400'}>
                    {data.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-80 my-6 mx-auto max-w-3xl">
              <div className="mt-20 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3">
                  <h3 className="text-xl font-semibold">Create Transaction</h3>
                  <button onClick={() => setModal(false)}>
                    <RxCross2 className="w-5 h-5 m-1" />
                  </button>
                </div>
                <hr />
                <div className="mt-3 mb-5 relative px-6 flex-auto">
                  <select
                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                    value={type}
                    onChange={e => setType(e.target.value)}>
                    <option value="">Transaction Type</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </select>

                  <select
                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                    value={sender}
                    onChange={e => setSender(e.target.value)}>
                    <option value="">Select User</option>
                    <option value="user1">Rasi</option>
                    <option value="user2">Rasi kp</option>
                    {/* Add more users as options */}
                  </select>
                  <input
                    type="number"
                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)} />

                  <div className="mt-4 flex justify-between font-semibold text-sm"></div>
                  <button
                    className="bg-blue-500 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                    type="button"
                    onClick={submit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <ToastContainer/>
    </div >
  )
}

export default Userhome;