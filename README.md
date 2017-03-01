# React-drag-rotater

## Example

- [Online example](http://chenjunhao.cn/react-drag-rotater)
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
import Rotater from 'react-drag-rotater';

class App extends React.Component {

  render() {
    return <Rotater style={{
        width: 300,
        height: 300,
      }}>
      <div style={{
        width: 300,
        height: 300,
        background: 'red',
      }} />
    </Rotater>
  }

}
```
