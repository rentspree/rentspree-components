import React from 'react'
import classnames from 'classnames/bind'
import style from './footer.scss'
import { Row, Col } from 'react-bootstrap'

const c = classnames.bind(style)

export class Footer extends React.Component {
  render () {
    return (
      <div className={c('footer')}>
        <Row>
          <Col xs={6}>
            Hello world!! This is <span className={c('footerIn')}>Footer</span>
          </Col>
          <Col xs={6}>
            Hello world!! This is <span className={c('footerIn')}>Footer</span>
          </Col>
        </Row>
      </div>
    )
  }
}
