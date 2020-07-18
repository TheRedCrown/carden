import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';
import Axios from 'axios';
import Spinner from './Spinner';
import Navbar from './Navbar';
import renderHTML from 'react-render-html';

class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      car: {},
      images: null,
      i: 0,
      loading: true,
    };
  }

  prevImage() {
    this.setState({ i: (this.state.i -= 1) });
    if (this.state.i < 0) {
      this.setState({ i: this.state.car.images.length - 1 });
    }
    console.log(this.state.i);
  }
  nextImage() {
    this.setState({ i: (this.state.i += 1) });
    if (this.state.i > this.state.car.images.length - 1) {
      this.setState({ i: 0 });
    }
    console.log(this.state.i, this.state.car.images.length - 1);
  }

  componentDidMount() {
    Axios.get(`/api/car/${this.props.match.params.id}`).then((res) => {
      const car = res.data;
      this.setState({ car, loading: false });
    });
  }

  render() {
    const { car } = this.state;
    return (
      <Fragment>
        <div className="container">
          <Navbar />
          <section>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <div className="vehicle-title">
                  <h1>{car.model}</h1>
                </div>
                <div className="vehicle-wrapper">
                  <div className="img-slider">
                    <div className="images">
                      {console.log(car.images[this.state.i])}
                      <img src={`/api/car/image/${car.images[this.state.i]}`} alt="" />
                    </div>
                    <button className="prevBtn" onClick={(e) => this.prevImage(e)}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="nextBtn" onClick={(e) => this.nextImage(e)}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="vehicle-details">
                    <h2>Информация</h2>
                    <div>
                      <ul>
                        <li>
                          <span>Цена:</span> {car.price}
                        </li>
                        <li>
                          <span>Пробег:</span> {car.pass}
                        </li>
                        <li>
                          <span>Год:</span> {car.year}
                        </li>
                        <li>
                          <span>КПП:</span> {car.kpp}
                        </li>
                        <li>
                          <span>Двигатель:</span> {car.engine}
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <span>Топливо:</span> {car.fuel}
                        </li>
                        <li>
                          <span>Цвет:</span> {car.color}
                        </li>
                        <li>
                          <span>Состояние:</span> {car.state}
                        </li>
                        <li>
                          <span>Статус:</span> {car.status}
                        </li>
                        <li>
                          <span>Местоположение:</span> {car.location}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="description">
                  <h2 className="desc-type">Описание</h2>

                  <div>{renderHTML(car.desc)}</div>
                </div>
              </Fragment>
            )}
          </section>
        </div>
        <footer>
          <p>Powered using NodeJs and React</p>
        </footer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CarDetails);
