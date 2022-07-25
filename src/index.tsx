import { WeElement, render, h, tag } from 'omi'

import './o-counter'
import './index.css'
import './o-transfer'
import * as css from './index.less'
import logo from './logo.svg'

interface MyAppProps {
  name: string
}


@tag('my-app')
export default class extends WeElement<MyAppProps> {

  static css = css.default

  abc: string

  onCountChanged = (evt: CustomEvent) => {
    console.log(evt.detail)
  }

  render(props) {
    return (
      <div class="app">
        <o-transfer data={[{key: 1 , table: "1"},{key: 2, table : "2"},{key: 3 , table: "3"} ,{key: 4 , table: "4"} ]}></o-transfer>
      </div>
    )
  }
}

render(<my-app></my-app>, '#root', {
  // if using OMI to build the whole application, ignore the attributs of DOM and use props of virtual dom
  ignoreAttrs: true
})
