import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import Rate from "./Rate";
import ListComments from "./ListComments";

function Detail() {
  const params = useParams();

  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [id, setid] = useState([]);
  // const [id1, setid1] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/laravel8/laravel8/public/api/blog/detail/${params.id}`
        );
        setData(response.data.data);
        setComments(response.data.data.comment);

        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function getCm(data) {
    const a = comments.concat(data.data.data);
    setComments(a);
  }
  function getid(data1) {
    setid(data1);
  }
  // function getid1(data2) {
  //   // setid1(data2);
  //   console.log(data2);
  // }
  console.log(id);
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                  <h1>{data.title}</h1>
                  <h3>{data["title"]}</h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <i className="fa fa-user" /> Mac Doe
                      </li>
                      <li>
                        <i className="fa fa-clock-o" /> 1:33 pm
                      </li>
                      <li>
                        <i className="fa fa-calendar" /> DEC 5, 2013
                      </li>
                    </ul>
                    <span>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star-half-o"></i>
                    </span>
                  </div>
                  <a href>
                    <img
                      src={
                        "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
                        data["image"]
                      }
                    />
                  </a>
                  <p>{data["content"]}</p>
                  <div className="pager-area">
                    <ul className="pager pull-right">
                      <li>
                        <a href="#">Pre</a>
                      </li>
                      <li>
                        <a href="#">Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {<Rate idRate={params.id} />}

              <div className="socials-share">
                <a href>
                  <img src="images/blog/socials.png" alt="" />
                </a>
              </div>
              <div className="response-area">
                <h2>3 RESPONSES</h2>
                <ul class="media-list">
                  <ListComments comments={comments} getid={getid} />
                </ul>
                {/* {getCm(comments)} */}
              </div>

              {
                <Comments
                  idBlog={params.id}
                  getCm={getCm}
                  id={id}
                  getid={getid}
                />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Detail;
