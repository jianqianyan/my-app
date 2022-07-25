import { tag, h, WeElement, OverwriteProps, o } from 'omi'

import * as css from './o-transfer.scss'
import '@omiu/checkbox'
import '@omiu/button'

export type Attrs = {
    data?: [];
    value: [];
}

const tagName = 'o-transfer'


class Native {
    constructor(table: String, key: number, disable?: Boolean) {
        this.table = table;
        this.key = key;
        this.disable = typeof disable == "undefined" ? false : disable;
    }
    table: String
    key: number
    disable: Boolean
}

export type Props = OverwriteProps<Attrs, { count: Number ,data: Array<Native>, value: Array<Number>, titles?: Array<String>, bechlick1: Array<Number>, bechlick2: Array<Number> }>
// interface Props {
//     data: Array<Native>,
//     value: Array<Number>, 
//     titles?: Array<String>, 
//     bechlick1: Array<Number>, 
//     bechlick2: Array<Number>
// }

@tag(tagName)
export default class Transfer extends WeElement<Props> {
    static css = css.default ? css.default : css

    static defaultProps = {
        data: [],
        value: [],
        titles: ["列表1", "列表2"],
        bechlick1: [],
        bechlick2: [],
    }

    static propTypes = {
        data: Array<Native>,
        value: Array<Number>,
        title: Array<String>,
        bechlick1: Array<Number>,
        bechlick2: Array<Number>,
    }

    labelClick = (key: Number) => {
        if (this.props.bechlick1.indexOf(key) == -1) {
            this.props.bechlick1.push(key);
        }
        else {
            this.props.bechlick1.splice(this.props.bechlick1.indexOf(key), 1);
        }
        this.update();
    }

    valueLableChilck = (key: Number) => {
        if (this.props.bechlick2.indexOf(key) == -1) {
            this.props.bechlick2.push(key);
        }
        else {
            this.props.bechlick2.splice(this.props.bechlick2.indexOf(key), 1);
        }
        this.update();
    }

    arrowChick = () => {
        while (this.props.bechlick2.length) {
            this.props.bechlick2.pop();
            this.props.value.pop();
        }
        this.update();
    }

    forwardChick = () => {
        while (this.props.bechlick1.length) {
            this.props.value.push(this.props.bechlick1[this.props.bechlick1.length - 1]);
            this.props.bechlick1.pop();
        }
        this.update();
    }

    SelectAll = () => {
        if (this.props.bechlick1.length < this.props.data.length - this.props.value.length) {
            this.props.data.map(item => {
                if (this.props.value.indexOf(item.key) == -1 && this.props.bechlick1.indexOf(item.key) == -1) {
                    this.props.bechlick1.push(item.key);
                }
            })
        }
        else {

        }
        this.update();
    }

    SelectValueAll = () => {
        if (this.props.bechlick2.length < this.props.value.length) {
            this.props.value.map(item => {
                if (this.props.bechlick2.indexOf(item) == -1) {
                    this.props.bechlick2.push(item);
                }
            })
        }
        else {

        }
        this.update();
    }

    render(props: Props) {
        return (
            // <h.f></h.f> or <></> are supported
            <h.f>
                <div class="transferBox">
                    <div class="transferBoxHeader">
                        <o-checkbox label={props.titles[0]} checked={props.data.length - props.value.length == props.bechlick1.length} indeterminate={props.bechlick1.length > 0 && props.data.length - props.value.length > props.bechlick1.length} onchange={this.SelectAll}></o-checkbox>
                    </div>

                    <ul>
                        {
                            props.data.map(item => {
                                return props.value.indexOf(item.key) === -1 && <li ><o-checkbox label={item.table} disabled={item.disable} checked={props.bechlick1.indexOf(item.key) != -1} onChange={() => this.labelClick(item.key)} ></o-checkbox></li>
                            })
                        }
                    </ul>
                </div>
                <div class="transferButton">
                    <div class="transferButtonBody">
                        <o-button type="primary" onClick={this.arrowChick}>&lt;</o-button>
                        <o-button type="primary" onClick={this.forwardChick}>&gt;</o-button>
                    </div>
                </div>
                <div class="transferBox">
                    <div class="transferBoxHeader">
                        <o-checkbox label={props.titles[1]} checked={props.value.length != 0 && props.value.length == props.bechlick2.length} indeterminate={props.bechlick2.length > 0 && props.value.length > props.bechlick2.length} onchange={this.SelectValueAll}></o-checkbox>
                    </div>
                    <ul>
                        {
                            props.data.map(item => {
                                return props.value.indexOf(item.key) !== -1 && <li><o-checkbox label={item.table} disabled={item.disable} onChange={() => this.valueLableChilck(item.key)} checked={props.bechlick2.indexOf(item.key) != -1}></o-checkbox></li>
                            }
                            )}
                    </ul>
                </div>
            </h.f>
        )
    }
}