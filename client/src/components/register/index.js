
import { useNavigate } from 'react-router-dom';
import { config } from  '../../App';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Register() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const registerUser = async (data) => {

        try {
            const response = await axios.post(`${config.baseUrl}/register`, data);
            console.log(response);
            toast.success('Registration successful');
            navigate('/login');
        }
        catch (error) {
            toast.error('Registration failed');
            console.log(error);
        }
    }

    
    const submitForm = (data) => {
        console.log(data);

        registerUser(data);

    }
    

    return (
        <div className='register'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <label>Username:</label>
                <input 
                    type="text"
                    placeholder="Enter username" 
                    {...register('username')}
                /> 
                {errors.username && <p className="error">{errors.username.message}</p>}
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
                <button>Register</button>
                <Link to='/login'>
                    <p>Already have an account ? Login</p>
                </Link>
            </form>
        </div>      
    );
}