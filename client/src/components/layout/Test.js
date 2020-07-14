import React, { Component } from 'react';
import Axios from 'axios';

class Test extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      images: [
        'e1a1beaa826098b7d756d939ae9ae844.png',
        '52d04036c887dedcafbcd01482be95f6.png',
        'af4ecd8390530bf79ba9bd8ca194b836.png',
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.images.map((image) => {
          return <img src={`/api/car/image/${image}`} alt="" />;
        })}
      </div>
    );
  }
}

export default Test;
