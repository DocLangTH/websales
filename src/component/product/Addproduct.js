import axios from 'axios';
import { useEffect, useState } from 'react';

function Addproduct() {
  let A = localStorage.getItem('login');
  if (A) {
    A = JSON.parse(A);
  }
  let url = 'http://localhost/laravel8/laravel8/public/api/user/product/add';

  const [getFile, setfile] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    company: '',
    detail: '',
    status: 1,
    sale: '',
    files: '',
  });
  const [optionbrand, setoptionbrand] = useState([]);
  const [optioncategory, setoptioncategory] = useState([]);
  const [optionstatus, setoptionstatus] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/laravel8/laravel8/public/api/category-brand')
      .then((res) => {
        setoptionbrand(res.data.brand);
        setoptioncategory(res.data.category);
        console.log(res.data.category);
      })
      .catch((error) => console.log(error));
  }, []);
  function handleFile(e) {
    setfile(e.target.files);
  }
  function renderSelect() {
    return optionbrand.map((value, key) => {
      // console.log(value.id);
      return (
        <option value={value.id} key={key}>
          {value['brand']}
        </option>
      );
    });
  }
  function rendercategory() {
    return optioncategory.map((value, key) => {
      return (
        <option value={value.id} key={key}>
          {value.category}
        </option>
      );
    });
  }
  function renderstatus() {
    let arr = [
      { id: 1, name: 'sale' },
      {
        id: 0,
        name: 'new',
      },
    ];
    return arr.map((value, key) => {
      return (
        <option value={value.id} key={key}>
          {value.name}
        </option>
      );
    });
  }
  function sale() {
    if (data.status == 1) {
      return (
        <input type="text" name="sale" placeholder="%" onChange={hanldeInput} />
      );
    }
  }
  console.log(data.status);

  function hanldeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((state) => ({ ...state, [name]: value }));
  }

  function rederError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (data.name == '') {
      errorsSubmit.name = 'vui lòng nhập tên';
      flag = false;
    }
    if (data.price == '') {
      errorsSubmit.price = 'vui lòng nhập giá';
      flag = false;
    }

    if (getFile == '') {
      errorsSubmit.files = 'vui long thêm';
      flag = false;
    } else {
      Object.keys(getFile).map((item, i) => {
        let getName = getFile[item]['name'];
        let getSize = getFile[item]['size'];
        // let getType = getFile[item]['type'];

        const duoi = ['jpeg', 'png', 'jpg'];
        const tach = getName.split('.');
        if (getSize > 1024 * 1024) {
          errorsSubmit.files = 'lỗi1';
          flag = false;
        } else if (!duoi.includes(tach[1])) {
          errorsSubmit.files = 'lỗi2';
          flag = false;
        }
      });
    }
    if (!flag) {
      setErrors(errorsSubmit);
    } else {
      let config = {
        headers: {
          Authorization: 'Bearer ' + A.token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('brand', data.brand);
      formData.append('company', data.company);
      formData.append('detail', data.detail);
      formData.append('status', data.status);
      formData.append('sale', data.sale);

      Object.keys(getFile).map((item, i) => {
        formData.append('file[]', getFile[item]);
        console.log(getFile[item]);
      });
      console.log(data);
      // console.log(getFile[item])

      axios.post(url, formData, config).then((res) => {
        console.log(res);
      });
    }
  }
  return (
    <>
      <div>
        <div class="col-sm-4">
          <div class="signup-form">
            <h2>Create Product</h2>
            {rederError()}
            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={hanldeInput}
              />

              <input
                type="text"
                name="price"
                placeholder="price"
                onChange={hanldeInput}
              />

              <select name="brand" value={data.brand} onChange={hanldeInput}>
                {renderSelect()}
              </select>
              <select
                name="category"
                value={data.category}
                onChange={hanldeInput}
              >
                {rendercategory()}
              </select>
              <select name="status" value={data.status} onChange={hanldeInput}>
                {renderstatus()}
              </select>

              {sale()}
              <input
                type="text"
                name="company"
                placeholder="company profile"
                onChange={hanldeInput}
              />

              <input
                type="file"
                id="files"
                name="files"
                multiple
                onChange={handleFile}
              />
              {/* <input type="file" name="avatar" /> */}
              <input
                type="text"
                name="detail"
                placeholder="detail"
                onChange={hanldeInput}
              />
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
export default Addproduct;
