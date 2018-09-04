import React from 'react'
import { Row, Col } from 'react-bootstrap'


export class Note extends React.Component {
  render() {
    if (this.props.position == 'right'){
      return (
        <div>
          <Row>
            <Col lg={12} md={12}>
              <span className="text-muted margin-top-8 pull-left">{this.props.date}</span>
              <div className="pull-right">
                <small>{this.props.author} {this.props.event}</small>
                <span className="fa-stack">
                  <i className="fa fa-circle fa-primary fa-stack-2x"></i>
                  <i className="fa fa-user fa-stack-1x fa-inverse"></i>
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12}>
              <div className={'dialog dialog-right dialog-'+this.props.style} >
                <span>{(this.props.icon != null) ? this.props.icon : ''} <span dangerouslySetInnerHTML={{__html: this.props.text}}></span></span>
                {this.props.contentFooter}
              </div>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div>
          <Row>
            <Col lg={12} md={12}>
              <span className="fa-stack">
                <i className="fa fa-circle fa-primary fa-stack-2x"></i>
                <i className="fa fa-user fa-stack-1x fa-inverse"></i>
              </span>
              <small>{this.props.author} {this.props.event}</small>
              <span className="pull-right text-muted margin-top-8">{this.props.date}</span>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12}>
              <div className={'dialog dialog-left dialog-'+this.props.style} >
                <span>{(this.props.icon != null) ? this.props.icon : ''} <span dangerouslySetInnerHTML={{__html: this.props.text}}></span></span>
                {this.props.contentFooter}
              </div>
            </Col>
          </Row>  
        </div>
      )
    }
  }
}
