import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../../App';
import { toast } from 'react-toastify';

const Home = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/json`);
            console.log(response.data);
            setUsers(response.data.user);
            toast.success('Data fetched successfully');
        }
        catch (error) {
            toast.error('Data fetch failed');
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(config)
        getUsers()
    }, []);

    return (
        <div className="home">
            <h1>Uploaded Data</h1>
            {users.length > 0 ? (
                <div className='card-container'>
                    {users.map(userAll => (
                        <div key={userAll._id} className='card'>
                            <h4>{new Date(userAll.createdAt).toLocaleString()}</h4>
                            {userAll.jsonData?.map(user => (
                                <div key={user._id} className='card-item'>
                                    <h2>{user.userId}</h2>
                                    <p>{user.id}</p>
                                    <p>{user.title}</p>
                                    <p>{user.body}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <h1>No data</h1>
            )}
        </div>
    );
}

export default Home;