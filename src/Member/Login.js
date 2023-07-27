import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const kt = ['true'];
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  function hanldeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (inputs.email == '') {
      errorsSubmit.email = 'Vui lòng nhập email';
      flag = false;
    }
    if (inputs.pasword == '') {
      errorsSubmit.pasword = 'Vui lòng nhập mật khẩu';
      flag = false;
    }

    if (!flag) {
      setErrors(errorsSubmit);
    } else {
      const data = {
        email: inputs.email,
        password: inputs.password,
      };
      axios
        .post('http://localhost/laravel8/laravel8/public/api/login', data)
        .then((res) => {
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            localStorage.setItem('login', JSON.stringify(res.data));
            // localStorage.setItem("token",JSON.stringify(res.data.token))
            // console.log(res)
            navigate('/');
          }
        });
      localStorage.setItem('kt', JSON.stringify(kt));
    }
  }
  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <p key={index}>{errors[key]}</p>;
      });
    }
  }

  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        {/*login form*/}
        <h2>Login to your account</h2>
        {renderError()}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={hanldeInput}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={hanldeInput}
          />

          <input type="text" value={0} />

          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
      {/*/login form*/}
    </div>
  );
}
export default Login;
