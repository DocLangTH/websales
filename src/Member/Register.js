import axios from 'axios';
import { useEffect, useState } from 'react';

function Register() {
  const [avatar, setAvatar] = useState('');
  const [file, setFile] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    avatar: '',
    level: 0,
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

    if (inputs.username == '') {
      errorsSubmit.name = 'Vui lòng nhập Tên';
      flag = false;
    }
    if (inputs.email == '') {
      errorsSubmit.email = 'Vui lòng nhập email';
      flag = false;
    }
    if (inputs.pass == '') {
      errorsSubmit.pass = 'Vui lòng nhập Mật Khẩu';
      flag = false;
    }
    if (inputs.phone == '') {
      errorsSubmit.phone = 'vui lòng nhập số điện thoại';
      flag = false;
    }
    if (inputs.address == '') {
      errorsSubmit.address = 'Vui lòng Nhập địa chỉ';
      flag = false;
    }

    if (file == '') {
      errorsSubmit.avata = 'Vui Lòng thêm Ảnh';
      flag = false;
    } else {
      console.log(file);
      let getName = file['name'];
      let getSize = file['size'];
      let getType = file['type'];
      // console.log(getName)
      // console.log(getSize)
      // console.log(getType)
      let duoi = ['png', 'jpg', 'qpeg'];
      const tach = getType.split('/');

      if (getSize > 1024 * 1024) {
        errorsSubmit.avatar = 'lỗi';
      } else if (!duoi.includes(tach[1])) {
        errorsSubmit.avatar = 'lỗi';
      }
    }

    if (!flag) {
      setErrors(errorsSubmit);
    } else {
      const data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
        avatar: avatar,
        level: 0,
      };
      //    console.log(data)

      axios
        .post('http://localhost/laravel8/laravel8/public/api/register', data)
        .then((res) => {
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            console.log(res.data);
          }
        });
    }
  }
  function handleFile(e) {
    const file = e.target.files;
    // console.log(file)
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
      // console.log()
    };
    reader.readAsDataURL(file[0]);
  }

  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <p key={index}>{errors[key]}</p>;
      });
    }
  }

  return (
    <div>
      <div class="col-sm-4">
        <div class="signup-form">
          <h2>New User Signup!</h2>
          {renderError()}
          <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={inputs.username}
              placeholder="Name"
              onChange={hanldeInput}
            />
            <input
              type="email"
              name="email"
              value={inputs.email}
              placeholder="Email"
              onChange={hanldeInput}
            />
            <input
              type="password"
              name="password"
              value={inputs.password}
              placeholder="Password"
              onChange={hanldeInput}
            />
            <input
              type="text"
              name="phone"
              value={inputs.phone}
              placeholder="Phone"
              onChange={hanldeInput}
            />
            <input
              type="text"
              name="address"
              value={inputs.address}
              placeholder="Address"
              onChange={hanldeInput}
            />
            <input type="file" name="avatar" onChange={handleFile} />
            <input type="text" name="lever" value={0} />
            <button type="submit" class="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
