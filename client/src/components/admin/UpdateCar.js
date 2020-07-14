import React, { useState, Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class UpdateCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgCollection: '',
      model: '',
      price: '',
      year: 0,
      pass: '',
      kpp: '',
      engine: '',
      fuel: '',
      state: '',
      status: '',
      color: '',
      location: '',
      desc: '',
      images: [],
      redirect: false,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onQuillChange = this.onQuillChange.bind(this);
  }
  componentDidMount() {
    Axios.get(`/api/car/${this.props.match.params.id}`).then((res) => {
      const car = res.data;
      this.setState({
        imgCollection: car.images,
        model: car.model,
        price: car.price,
        year: car.year,
        pass: car.pass,
        kpp: car.kpp,
        engine: car.engine,
        fuel: car.fuel,
        state: car.state,
        status: car.status,
        color: car.color,
        location: car.location,
        desc: car.desc,
        images: car.images,
      });
      console.log(this.state);
    });
  }

  onTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onImageChange(e) {
    this.setState({ imgCollection: e.target.files });
    for (const key of Object.keys(this.state.imgCollection)) {
      console.log(this.state.imgCollection[key]);
    }
    console.log(this.state.imgCollection);
  }
  onQuillChange(e) {
    this.setState({ desc: e });
  }
  onImageDelete(e, image) {
    e.preventDefault();
    let newImages = this.state.images.slice();
    const index = newImages.indexOf(image);
    newImages.splice(index, 1);
    this.setState({ images: newImages });
    Axios.delete(`/api/car/image/${image}`);
    console.log(image);
  }
  onSubmit(e) {
    e.preventDefault();

    let info = new FormData();
    info.append('model', this.state.model);
    info.append('price', this.state.price);
    info.append('year', this.state.year);
    info.append('pass', this.state.pass);
    info.append('kpp', this.state.kpp);
    info.append('engine', this.state.engine);
    info.append('fuel', this.state.fuel);
    info.append('color', this.state.color);
    info.append('state', this.state.state);
    info.append('status', this.state.status);
    info.append('location', this.state.location);
    for (let index = 0; index < this.state.images.length; index++) {
      info.append('images[]', this.state.images[index]);
    }

    for (const key of Object.keys(this.state.imgCollection)) {
      info.append('imagesFiles', this.state.imgCollection[key]);
    }

    info.append('desc', this.state.desc);
    // console.log(info);
    Axios.patch(`/api/car/${this.props.match.params.id}`, info).then((res) => {
      console.log(info);
      this.setState({ redirect: true });
    });
  }
  render() {
    const {
      model,
      price,
      year,
      pass,
      kpp,
      engine,
      fuel,
      state,
      status,
      color,
      location,
      imgCollection,
      desc,
    } = this.state;
    return (
      <div className="admin-panel">
        {this.state.redirect ? <Redirect to="/admin" /> : ''}
        <h1>Добавить автомобиль</h1>
        <form className="add-car" onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group">
            <div className="first-group">
              <label>Модель:</label> <br />
              <input
                className="name"
                name="model"
                type="text"
                value={model}
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать модель"
              />
              <br />
              <label>Цена:</label> <br />
              <input
                value={price}
                className="price"
                name="price"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать цену"
              />
              <br />
              <label>Год:</label> <br />
              <input
                value={year}
                className="year"
                name="year"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать год"
              />
              <br />
              <label>Пробег:</label> <br />
              <input
                value={pass}
                className="probeg"
                name="pass"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать пробег"
              />
              <br />
              <label>КПП:</label> <br />
              <input
                value={kpp}
                className="kpp"
                name="kpp"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать тип КПП"
              />
              <br />
              <label>Двигатель:</label> <br />
              <input
                value={engine}
                className="engine"
                name="engine"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать тип двигателя"
              />
              <br />
            </div>
            <div className="second-group">
              <label>Топливо:</label> <br />
              <input
                value={fuel}
                className="fuel"
                name="fuel"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать тип топлива"
              />
              <br />
              <label>Цвет:</label> <br />
              <input
                value={color}
                className="color"
                name="color"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать цвет"
              />
              <br />
              <label>Состояние:</label> <br />
              <input
                value={state}
                className="state"
                name="state"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать состояние автомобиля"
              />
              <br />
              <label>Статус:</label> <br />
              <input
                value={status}
                className="status"
                name="status"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать статус"
              />
              <br />
              <label>Местоположение:</label> <br />
              <input
                value={location}
                className="location"
                name="location"
                type="text"
                onChange={(e) => this.onTextChange(e)}
                placeholder="Здесь указать местоположение автомобиля"
              />
              <br />
            </div>
          </div>
          <div className="third-group">
            <label className="label-file">Фото:</label> <br />
            <input
              className="file"
              name="images"
              type="file"
              onChange={this.onImageChange}
              multiple
            />
            <br />
            <div className="photo-flex">
              {this.state.images.map((image) => {
                return (
                  <div className="photoPreview">
                    <img src={`/api/car/image/${image}`} />
                    <button className="btnDelete" onClick={(e) => this.onImageDelete(e, image)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                );
              })}
            </div>
            <br />
            <label>Описание:</label> <br />
            <ReactQuill
              style={{ backgroundColor: 'white' }}
              value={desc}
              onChange={(e) => {
                this.onQuillChange(e);
              }}
              theme="snow"
              modules={UpdateCar.modules}
              formats={UpdateCar.formats}
              placeholder="Здесь указать описание"
            />
            <button className="add-car-btn">Редактировать</button>
          </div>
        </form>
      </div>
    );
  }
}

UpdateCar.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['link', 'image', 'video'],
  ],
};

UpdateCar.formats = ['header', 'link', 'image', 'video'];

export default UpdateCar;
