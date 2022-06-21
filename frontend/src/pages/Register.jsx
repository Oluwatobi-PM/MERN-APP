import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = formData

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

         //Redirect when logged in
        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
        

    }, [isError, isSuccess, user, message, navigate, dispatch])

   
    if(isLoading) {
        return <Spinner />
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p> Please create an account </p>
        </section>

        <section className='form'>
           <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input 
                    type='text' 
                    className='form-control' 
                    id='name'
                    required
                    name = 'name'
                    value={name}
                    onChange={onChange}
                    placeholder='Enter your name'
                />
                <input 
                    type='text' 
                    className='form-control' 
                    id='email'
                    required
                    name = 'email'
                    value={email}
                    onChange={onChange}
                    placeholder='Enter your email'
                />
                <input 
                    type='password' 
                    className='form-control' 
                    id='password'
                    required
                    name = 'password'
                    value={password}
                    onChange={onChange}
                    placeholder='Enter your password'
                />
                 <input 
                    type='password' 
                    className='form-control' 
                    id='password2'
                    name = 'password2'
                    value={password2}
                    required
                    onChange={onChange}
                    placeholder='Confirm your password'
                />
            </div>
            <div className='form-group'>
                <button className="btn btn-block"> Submit </button>
            </div>
           </form>
        </section>

    </>
  )
}

export default Register