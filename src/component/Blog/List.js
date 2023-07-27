import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List(){

  const [data, setData] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost/laravel8/laravel8/public/api/blog")
        .then(res =>{
            setData(res.data.blog.data)
            console.log(res.data.blog.data)
        })
        .catch(error=> console.log(error))
    },[])

  // const [getItem, setItem] = useState('')

  // useEffect(()=>{
  //   API.get('/blog')
  //   .then(response =>{
  //     setItem(response.data.blog)
  //   })

  //   .catch(function (error){
  //     console.log(error)
  //   })
  // })
    function renderData(){
        if(data.length > 0)
            return data.map((value, key)=>{
                return(
                  <div className="single-blog-post">
                    <h3>{value["title"]}</h3>
                    <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> Mac Doe</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o" />
                    </span>
                    </div>
                    <a href>
                    <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/"+value["image"]} />
                  </a>
                  <p>{value["description"]}</p>
                  <Link to={"/blog/detail/"+value["id"]} className="btn btn-primary" >Read More</Link>
                  </div>
                )
            })
    
    }

    return(
        <section>
        <div className="container">
          <div className="row">
            
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
                
                <div className="pagination-area">
                  <ul className="pagination">
                    <li><a href className="active">1</a></li>
                    <li><a href>2</a></li>
                    <li><a href>3</a></li>
                    <li><a href><i className="fa fa-angle-double-right" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

}
export default List;