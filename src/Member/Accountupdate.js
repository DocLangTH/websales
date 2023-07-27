import axios from 'axios';
import { useEffect, useState } from 'react';

function Accountupdate() {
  let A = localStorage.getItem('login');
  if (A) {
    A = JSON.parse(A);
  }
  const id = A.Auth.id;

  let url = 'http://localhost/laravel8/laravel8/public/api/user/update/' + id;
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
    pass: '',
  });

  useEffect(() => {
    let useData = localStorage.getItem('login');
    if (useData) {
      useData = JSON.parse(useData);

      setUser({
        username: useData.Auth.name,
        email: useData.Auth.email,
        address: useData.Auth.address,
        phone: useData.Auth.phone,
      });
    }
    // console.log(useData);
  }, []);
  function hanldeInput(e) {
    const getname = e.target.name;
    const getvalue = e.target.value;
    setUser((state) => ({ ...state, [getname]: getvalue }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    let errorsSubmit = {};
    let flag = true;

    if (user.address == '') {
      errorsSubmit.address = 'vui lòng nhập địa chỉ';
      flag = false;
    }
    if (!flag) {
      setErrors(errorsSubmit);
      console.log('thât bại');
    } else {
      let config = {
        headers: {
          Authorization: 'Bearer ' + A.token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };
      const formData = new FormData();
      formData.append('name', user.username);
      formData.append('email', user.email);
      formData.append('address', user.address);
      formData.append('phone', user.phone);
      formData.append('password', user.pass);
      axios.post(url, formData, config).then((res) => {
        console.log(res);
        // localStorage.setItem('login', JSON.stringify(res.data));
        A = res.data;
        localStorage.setItem('login', JSON.stringify(A));
        console.log(A);
        // console.log(res);
      });
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
    <>
      <div>
        <div class="col-sm-4">
          <div class="signup-form">
            <h2>User Update!</h2>
            {renderError()}
            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={hanldeInput}
                placeholder="Name"
              />
              <input
                readOnly
                type="email"
                name="email"
                value={user.email}
                placeholder="Email"
                onChange={hanldeInput}
              />
              <input
                type="password"
                name="pass"
                value={user.pass}
                placeholder="Password"
                onChange={hanldeInput}
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                placeholder="Phone"
                onChange={hanldeInput}
              />
              <input
                type="text"
                name="address"
                value={user.address}
                placeholder="Address"
                onChange={hanldeInput}
              />
              <input type="file" name="avatar" />
              <button type="submit" class="btn btn-default">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Accountupdate;
