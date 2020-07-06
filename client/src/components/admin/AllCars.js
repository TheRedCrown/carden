import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class AllCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cars: [],
    };
  }
  componentDidMount() {
    Axios.get(`/api/car`).then((res) => {
      const cars = res.data;
      this.setState({ cars, loading: false });
    });
  }

  deleteCar(id) {
    Axios.delete(`/api/car/${id}`)
      .then((res) => {
        let cars = [...this.state.cars];
        let index = cars.indexOf(id);
        cars.splice(index, 1);
        this.setState({ cars });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="admin-panel">
        <h1>Автомобили</h1>
        {this.state.loading ? (
          <h2>Загрузка....</h2>
        ) : (
          <Fragment>
            <ul className="admin-ul">
              <li className="title">Название</li>
              <li className="price">Цена</li>
              <li className="date">Дата</li>
              <li className="delete">Удалить</li>
            </ul>
            {this.state.cars.map((car) => {
              return (
                <ul key={car._id} className="admin-info">
                  <li className="title">
                    <Link to={`/admin/update-car/${car._id}`}>{car.model}</Link>
                  </li>
                  <li className="price">{car.price}</li>
                  <li className="date">
                    <Moment format="YYYY/MM/DD">{car.date}</Moment>
                  </li>
                  <li className="delete">
                    <button onClick={(e) => this.deleteCar(car._id)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </li>
                </ul>
              );
            })}
          </Fragment>
        )}
      </div>
    );
  }
}

export default AllCars;
