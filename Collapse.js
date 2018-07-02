import React, {Component} from 'react'
import styles from './Collapse.scss'

export default class extends Component {
  constructor(props){
    super(props)
    const {collapsed = true} = props
    this.state = {
      collapsed,
      collapsing: false,
      elmHeight: 0,
      transitioning: false,
    }
  }

  toggle = () => {
    const {collapsed, collapsing} = this.state
    if (collapsing) return
    const evtHandler = () => {
      this.elmRef.removeEventListener('transitionend', evtHandler)
      this.setState({collapsing: false, collapsed: !collapsed, transitioning: false})
      if (this.props.onToggle)
        this.props.onToggle()
      if (collapsed && this.props.onOpen)
        this.props.onOpen()
      if (!collapsed && this.props.onClose)
        this.props.onClose()
    }
    this.elmRef.addEventListener('transitionend', evtHandler)
    this.setState({collapsed, collapsing: true})
    if (this.props.willToggle)
      this.props.willToggle()
    if (collapsed && this.props.willOpen)
      this.props.willOpen()
    if (!collapsed && this.props.willClose)
      this.props.willClose()
  }
  close = () => {
    if (!this.state.collapsed)
      this.toggle()
  }
  open = () => {
    if (this.state.collapsed)
      this.toggle()
  }
  setRef = r => {
    this.elmRef = r
  }
  componentDidMount(){
    this.componentDidUpdate()
  }
  componentDidUpdate(){
    setTimeout(() => {
      const {collapsing, elmHeight, transitioning} = this.state
      const scrollHeight = this.elmRef.scrollHeight
      if (elmHeight != scrollHeight)
        this.setState({
          elmHeight: scrollHeight
        })
      if (collapsing && !transitioning)
        this.setState({
          transitioning: true
        })
    })
  }
  render() {
    const {collapsed, collapsing, elmHeight, transitioning} = this.state
    const {className, collapseStyle = 'collapse', style} = this.props
    //collapseStyle is 'collapse' or 'fade' //default is 'collapse'
    const collapseClass = collapseStyle === 'collapse' ? styles.collapse : styles.fade
    return <div
      className={[
        ...(className ? [className] : []),
        ...(collapsing ? [styles.collapsing]
        : collapsed ? [collapseClass] : [collapseClass, styles.show])
      ].join(' ')}
      style={
        {
          ...(style || {}),
          ...(collapsing && (collapsed === transitioning) ? {height: elmHeight} : {})
        }
      }
      ref={this.setRef}>
      {this.props.children}
    </div>
  }
}
