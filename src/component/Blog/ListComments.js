import axios from 'axios';
import { useEffect, useState } from 'react';
import Detail from './Detail';

function ListComments(props) {
  const { comments } = props;
  // console.log(props);

  function handleSubmit(e) {
    const value = e.target.id;
    props.getid(value);
  }
  return comments.map((value, key) => {
    if (value['id_comment'] == 0) {
      return (
        <>
          <li className="media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src={
                  'http://localhost/laravel8/laravel8/public/upload/user/avatar/' +
                  value['image_user']
                }
                alt=""
                style={{ width: '121px', height: '86px' }}
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  {value['name_user']}
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>{value['comment']}</p>
              <a
                id={value['id']}
                onClick={handleSubmit}
                className="btn btn-primary"
                href="#cmt"
              >
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>

          {comments.map((value2, j) => {
            // console.log(value.id);
            // console.log(value2.id_comment);
            if (value.id == value2['id_comment']) {
              return (
                <>
                  <li key={j} index={j} className="media second-media">
                    <a className="pull-left" href="#">
                      <img
                        className="media-object"
                        src={
                          'http://localhost/laravel8/laravel8/public/upload/user/avatar/' +
                          value2['image_user']
                        }
                        style={{ width: '121px', height: '86px' }}
                        alt=""
                      />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li>
                          <i className="fa fa-user" />
                          {value2['name_user']}
                        </li>
                        <li>
                          <i className="fa fa-clock-o" /> 1:33 pm
                        </li>
                        <li>
                          <i className="fa fa-calendar" /> DEC 5, 2013
                        </li>
                      </ul>
                      <p>{value2['comment']}</p>
                    </div>
                  </li>
                </>
              );
            }
          })}
        </>
      );
    }
  });
}
export default ListComments;
