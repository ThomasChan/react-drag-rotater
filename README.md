[![NPM](https://nodei.co/npm/react-drag-rotater.png)](https://nodei.co/npm/react-drag-rotater/)

# React-drag-rotater

## Example

- [Online example](http://chenjunhao.cn/projects/react-drag-rotater)
- local example
  ```sh
  $ git clone git@github.com:thomaschan/react-drag-rotater.git
  $ npm install
  $ npm run doc
  ```

## Installation & Usage

```sh
npm install react-drag-rotater --save
```

### Include the Component

```js
import React from 'react';
import { render } from 'react-dom';
import Rotater from 'react-drag-rotater';

const position = ['top-left', 'top-center', 'top-right',
  'right-top', 'right-center', 'right-bottom',
  'center-center',
  'bottom-left', 'bottom-center', 'bottom-right',
  'left-top', 'left-center', 'left-bottom',]

class App extends React.Component {

  constructor(props) {
    super(props);
    const state = {};
    position.map(p => state[p] = 0);
    this.state = state;
  }

  render() {
    return <div>
      {position.map((p, i) =>
        <div key={i}
          style={{
            width: 100,
            height: 100,
            border: '1px solid red',
            margin: 30,
            transform: `rotate(${this.state[p]}deg)`,
            transformOrigin: p.replace('-', ' '),
          }}>
          <Rotater onRotate={({deg}) => this.setState({ [p]: deg })}
            origin={p} />
          {p}
        </div>
      )}
    </div>
  }

}
```
