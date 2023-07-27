import axios from 'axios';
import { useEffect, useState } from 'react';

function Myproduct() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost/laravel8/laravel8/public/api/user/my-product')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <section id="cart_items">
        <div className="col-md-9">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">id</td>
                  <td className="image">name</td>
                  {/* <td className="description" /> */}
                  <td className="price">image</td>
                  <td className="quantity">price</td>
                  <td className="total">action</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cart_product">
                    <a href>
                      <img src="images/cart/one.png" alt="" />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href>Colorblock Scuba</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>$59</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a className="cart_quantity_up" href>
                        {' '}
                        +{' '}
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        defaultValue={1}
                        autoComplete="off"
                        size={2}
                      />
                      <a className="cart_quantity_down" href>
                        {' '}
                        -{' '}
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">$59</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete" href>
                      <i className="fa fa-times" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="cart_product">
                    <a href>
                      <img src="images/cart/two.png" alt="" />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href>Colorblock Scuba</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>$59</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a className="cart_quantity_up" href>
                        {' '}
                        +{' '}
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        defaultValue={1}
                        autoComplete="off"
                        size={2}
                      />
                      <a className="cart_quantity_down" href>
                        {' '}
                        -{' '}
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">$59</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete" href>
                      <i className="fa fa-times" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="cart_product">
                    <a href>
                      <img src="images/cart/three.png" alt="" />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href>Colorblock Scuba</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>$59</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a className="cart_quantity_up" href>
                        {' '}
                        +{' '}
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        defaultValue={1}
                        autoComplete="off"
                        size={2}
                      />
                      <a className="cart_quantity_down" href>
                        {' '}
                        -{' '}
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">$59</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete" href>
                      <i className="fa fa-times" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>{' '}
      {/*/#cart_items*/}
    </>
  );
}

export default Myproduct;
