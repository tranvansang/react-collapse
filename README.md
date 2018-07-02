# React collapsable component

## Usage

- This component requires modular css and sass loader. Thus, to directly use this component, there is need to `inject` app created with `react-create-app` or manually configure the build.
- For app created with `react-create-app`. Execute `yarn eject`. Edit `config/webpack.config.dev.js` and `config/webpack.config.prod.js`, changes

```javascript
// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
{
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ],
},

```
into
```javascript
{
  test: /\.(s*)css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true
      }
    },
    { loader: 'sass-loader' }
  ]
},
```
- Add `sass-loader` and `node-sass` via: `yarn add --dev sass-loader node-sass`

## Example

```javascript
import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import Collapse from 'reactjs-collapse'

class App extends Component {
  setRef = r => this.cref = r
  toggle = () => this.cref.toggle()
  render(){
    return <div>
      <Collapse refs={this.setRef} collapsed={false}>
        <ul>
          <li> Item 1
          <li> Item 2
          <li> Item 3
        </ul>
      </Collapse>
      <button type="button" onClick={this.toggle}>Toggle</button>
    </div>
  }
}

ReactDom.render(<App/>, document.getElementById('root')
```

Screenshot
![Screenshot](/screenshot.gif "Screenshot")

## API reference

- `collapsed`( default `true`): default collapse state
- `willToggle`, `willClose`, `willOpen`, `onToggle`, `onClose`, `onOpen`: event handler before and after transition
- `ref.close`, `ref.open`, `ref.toggle`: call via component reference to close, open, toggle component
