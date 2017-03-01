## React-Drag-Rotate

```html
<div id="__div"></div>
```

```jsx
import React from 'react';
import { render } from 'react-dom';
import Rotater from '../src';

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

render(<App />, document.getElementById('__div'));
```
