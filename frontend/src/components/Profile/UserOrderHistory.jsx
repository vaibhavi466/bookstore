import React from 'react';
import axios from 'axios';

const UserOrderHistory = () => {
    const [OrderHistory, setOrderHistory] = useState(second)
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
       const fetch = async()=>{
        const response = await axios.get("http://localhost:1000/api/v1/get-order-history",
            { headers }
        );
        setOrderHistory(response.data.data);
       };
       fetch();
    }, [])
    
  return (
    <>
     {!OrderHistory && <div className='flex items-center justify-center h-[100%]'>
        <Loader/>
        </div>}
     {OrderHistory && OrderHistory.length===0&&(
        <div className='h-[80vh] p-4 text-zinc-100'>
            <div className='h-[100%] flex flex-col items-center justify-center'>
                <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
                    No Order History
                </h1>
                <img
                src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
                alt=''
                className='h-[20vh] mb-8'
                />
            </div>
        </div>
     )}
    </>
  )
}

export default UserOrderHistory
