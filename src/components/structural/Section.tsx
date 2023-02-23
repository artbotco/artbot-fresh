import React, { Component } from 'react';
import Helpers              from 'Helpers';
import './Section.scss';

class Section extends Component<any> {
  render() {
    return (
      <section
        className={Helpers.getClasses('section', this.props.className)}
        data-section={this.props.index}
        id={this.props.id}
      >
        {this.props.children}
      </section>
    );
  }
}

export default Section;
