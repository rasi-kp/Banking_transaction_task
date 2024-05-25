
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardHeader, Input, Typography, Button, CardBody,Avatar, } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const TABLE_HEAD = ["Name", "Email","Amount","Status", "Action"];

export function Admin() {
    const navigate = useNavigate()
   const [True,setTrue]=useState(false)
    const [userdata, setUserData] = useState([]);
 
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch(`http://localhost:3000/admin/allusers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const datas = await response.json();
                console.log(datas);
                if (datas.error) {
                    navigate('/');
                    return;
                }
                else {
                    setUserData(datas);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [True]);

    const handleBlock = async(email) => {
        setTrue(true)
        const confirm = window.confirm("Are you sure you want to block this user?");
        if (confirm) {
            try {
              const response = await fetch(`http://localhost:3000/admin/block/${email}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
              if (response.ok) {
                toast.success("Successfully Blocked")
                console.log(`User with email: ${email} has been blocked`);
              } else {
                console.error('Failed to block the user');
              }
            } catch (error) {
              console.error('Error blocking the user:', error);
            }
          }
          setTrue(false)
      };
    
      const handleUnblock = async(email) => {
        setTrue(true)
        const confirm = window.confirm("Are you sure you want to unblock this user?");
        if (confirm) {
            try {
              const response = await fetch(`http://localhost:3000/admin/unblock/${email}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
              if (response.ok) {
                toast.success("Successfully UnBlocked")
              } else {
                console.error('Failed to block the user');
              }
            } catch (error) {
              console.error('Error blocking the user:', error);
            }
          }
          setTrue(false)
      };

    return (
        <Card className="h-full w-full p-5">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="ml-5 mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>

                        {userdata.map((userData, index) => {
                            const { name, email, isActive ,balance} = userData;
                            const isLast = index === userdata.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={userData._id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="sm" />
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal ">
                                                {email}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal ">
                                                {balance}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal ">
                                            {isActive? 'Active' : 'Blocked'}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                            <Button
                                                variant="text"
                                                onClick={() => isActive ? handleBlock(email) : handleUnblock(email)}
                                                className={`text-white px-4 py-2 rounded ${isActive ? 'bg-red-500' : 'bg-green-500'}`}>
                                                {isActive? 'Block' : 'Unblock'}
                                            </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <ToastContainer />
        </Card>
    );
}
