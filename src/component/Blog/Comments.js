import axios from 'axios';
import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

function Comments(props) {
  // console.log(props.idBlog)
  let url =
    'http://localhost/laravel8/laravel8/public/api/blog/comment/' +
    props.idBlog;

  let A = localStorage.getItem('login');
  let B = localStorage.getItem('kt');
  // let accessToken =  localStorage.getItem("token")
  if (A) {
    A = JSON.parse(A);
  }
  // console.log(config)
  const [inputs, setInputs] = useState({
    message: '',
  });

  const [errors, setErrors] = useState({});

  function hanldeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [name]: value }));
  }
  // function handledelete(e) {
  //   const value = e.target.id;
  //   props.getid(value);
  // }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (B) {
      B = JSON.parse(B);

      if (inputs.message == '') {
        // chưa nhập
        errorsSubmit.message = 'Vui lòng nhập bình luận';
        flag = false;
      } //ngược lại
      else {
        let config = {
          headers: {
            Authorization: 'Bearer ' + A.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        };

        const formData = new FormData();
        formData.append('id_blog', props.idBlog);
        formData.append('id_user', A.Auth.id);
        if (props.id != 0) {
          formData.append('id_comment', props.id);
        } else {
          formData.append('id_comment', 0);
        }
        formData.append('image_user', A.Auth.avatar);
        formData.append('comment', inputs.message);
        formData.append('name_user', A.Auth.name);
        axios.post(url, formData, config).then((res) => {
          // console.log(res.data);

          props.getCm(res);

          console.log(props.id);
        });
      }

      if (!flag) {
        setErrors(errorsSubmit);
      } else {
      }
    } else {
      alert('Bạn chưa đăng nhập');
    }
    const value = e.target.id;
    props.getid(value);
  }

  // function renderData(){
  //   return(
  //     <div className="media-body">
  //       <ul className="sinlge-post-meta">
  //         <li><i className="fa fa-user" />{A.Auth.name}</li>
  //         <li><i className="fa fa-clock-o" /> 1:33 pm</li>
  //         <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
  //       </ul>
  //       <p>{inputs.message}</p>
  //       <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
  //   </div>
  //   );
  // }

  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <p key={index}>{errors[key]}</p>;
      });
    }
  }

  // console.log(A)

  return (
    <>
      {/* {renderData()} */}
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            {/* <a
              id={[0]}
              onClick={handledelete}
              className="btn btn-primary"
              href="#cmt"
            >
              <i className="fa fa-reply" />
              delete
            </a> */}
            <div className="text-area">
              {renderError()}
              <div className="blank-arrow" id="cmt">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                name="message"
                rows={11}
                defaultValue={''}
                value={inputs.message}
                onChange={hanldeInput}
              />
              <a
                id={[0]}
                onClick={handleSubmit}
                className="btn btn-primary"
                href
              >
                post comment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comments;
