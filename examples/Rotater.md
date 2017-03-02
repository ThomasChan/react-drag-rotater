## React-Drag-Rotate

```html
<div id="__div"></div>
```

```jsx
import React from 'react';
import { render } from 'react-dom';
import Rotater from '../src';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { deg: 0 };
  }

  render() {
    return <div style={{
      width: 300,
      height: 300,
      background: 'red',
      transform: `rotate(${this.state.deg}deg)`,
    }}>
      <Rotater onRotate={({deg}) => this.setState({ deg })} />
    </div>
  }

}

render(<App />, document.getElementById('__div'));
```
