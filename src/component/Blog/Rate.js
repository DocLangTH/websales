import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
function Rate(props) {
  let A = localStorage.getItem('login');
  if (A) {
    A = JSON.parse(A);
  }
  let B = localStorage.getItem('kt');
  let url =
    'http://localhost/laravel8/laravel8/public/api/blog/rate/' + props.idRate;

  const [rating, setRating] = useState(0);
  let tong = 0;
  let tbc = 0;
  useEffect(() => {
    axios
      .get(
        'http://localhost/laravel8/laravel8/public/api/blog/rate/' +
          props.idRate
      )
      .then((res) => {
        let aa = res.data.data;
        // console.log(aa);
        if (aa.length > 0) {
          let cc = aa.length;

          aa.map((value, key) => {
            // console.log(value["rate"]);
            tong = tong + value['rate'];
          });
          tbc = tong / cc;
        }
        // console.log(tbc);
        // console.log(cc);
        setRating(tbc / 2);
        // tbc = 2;
        // console.log(tbc);
        // setRating(tbc);

        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function changeRating(newRating, name) {
    setRating(newRating);
    if (B) {
      B = JSON.parse(B);

      let config = {
        headers: {
          Authorization: 'Bearer ' + A.token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };
      const formData = new FormData();
      formData.append('blog_id', props.idRate);
      formData.append('user_id', A.Auth.id);
      formData.append('rate', newRating); // không lấy rating vì lúc đầu được xét bằng 0 lấy dữ liệu mới nhất newrating
      axios.post(url, formData, config).then((res) => {
        // console.log(res);
      });
    } else {
      alert('bạn chưa đăng nhập');
    }
  }
  // - xu ly logic
  // - xy lu api

  return (
    <>
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
      />
    </>
  );
}
export default Rate;
