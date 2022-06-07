
import { useNavigate } from 'react-router-dom';
import { config } from  '../../App';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import './styles.css';

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login({ setLoggedIn }) {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const loginUser = async (data) => {

        try {
            const response = await axios.post(`${config.baseUrl}/login`, data);
            console.log(response);
            localStorage.setItem('token', response.data.token);
            setLoggedIn(true);
            toast.success('Login successful');
            navigate('/');
        }
        catch (error) {
            toast.error('Login failed');
            console.log(error);
        }
    }

    
    const submitForm = (data) => {
        console.log(data);

        loginUser(data);

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
            toast.info('You are already logged in');
            navigate('/');
        }
    }, [setLoggedIn, navigate]);
    

    return (
        <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <label>Password:</label>
                <input 
                    type="password"
                    placeholder="Enter password"
                    {...register('password')}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
                <label>Email:</label>
                <input 
                    type="email" 
                    placeholder="Enter email"
                    {...register('email')}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
                <button>Login</button>
                <Link to='/register'>
                    <p className='navigate'>Don't have an account ? Register</p>
                </Link>
            </form>
        </div>      
    );
}