import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Spinner from './Spinner';
import Navbar from './Navbar';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cars: [],
    };
  }
  componentDidMount() {
    Axios.get('/api/car').then((res) => {
      const cars = res.data;
      this.setState({ cars, loading: false });
    });
  }
  render() {
    const { cars } = this.state;
    return (
      <Fragment>
        <div className="container">
          <Navbar />
          <section>
            <div className="cards-wrapper">
              {this.state.loading ? (
                <Spinner />
              ) : (
                cars.map((car) => {
                  return (
                    <div key={car._id} className="card">
                      <Link to={`/car-details/${car._id}`}>
                        <div className="image-container">
                          <img src={`/api/car/image/${car.images[0]}`} />
                          {console.log(car.images[0])}
                        </div>
                        <div className="card-details">
                          <p className="vehicle-name">{car.model}</p>
                          <div className="price-style">{car.price}</div>
                          <div className="meta-style">{car.pass}</div>
                          <button className="more-details">узнать больше</button>
                        </div>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
        <footer>
          <p>Powered using NodeJs and React</p>
        </footer>
      </Fragment>
    );
  }
}

export default Main;
