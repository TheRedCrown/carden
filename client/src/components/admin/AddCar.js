import React, { useState, Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      imgCollection: '',
      desc: '',
      redirect: null,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onQuillChange = this.onQuillChange.bind(this);
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
    for (const key of Object.keys(this.state.imgCollection)) {
      info.append('images', this.state.imgCollection[key]);
    }

    console.log(this.state);

    info.append('desc', this.state.desc);
    // console.log(info);
    Axios.post('/api/car', info).then((res) => {
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
            />{' '}
            <br />
            <label>Описание:</label> <br />
            <ReactQuill
              style={{ backgroundColor: 'white' }}
              value={desc}
              onChange={(e) => {
                this.onQuillChange(e);
              }}
              theme="snow"
              modules={AddCar.modules}
              formats={AddCar.formats}
              placeholder="Здесь указать описание"
            />
            <button>Добавить авто</button>
          </div>
        </form>
      </div>
    );
  }
}

AddCar.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['link', 'image', 'video'],
  ],
};

AddCar.formats = ['header', 'link', 'image', 'video'];

export default AddCar;
