import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import classes from "../../assets/css/Authentication/Login/Login.module.css";
import "../../assets/css/Authentication/Login/carousel.css";

const items = [
  {
    text: "Unlock Actionable Customer Insights:",
    paragraph:
      "Our AI algorithms analyze vast amounts of customer data, including purchase history, browsing behavior, social media interactions, and customer feedback.",
    id: "1",
  },
  {
    text: "Harness Valuable Customer Product Feedback:",
    paragraph:
      "Gathering feedback from your customers is crucial for continuous improvement.",
    id: "2",
  },
  {
    text: "Real-Time Monitoring and Alerts:",
    paragraph:
      "Stay ahead of the competition with our real-time monitoring and alerts feature.",
    id: "3",
  },
];

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };

    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.id}
      >
        <div className={classes.left_slide_item}>
          <h4 className={classes.slide_h4}>{item.text}</h4>
          <div className={classes.slide_txt}>{item.paragraph}</div>
        </div>
      </CarouselItem>
    ));

    return (
      <div className={`text_carousel ${classes.log_reg_slider}`}>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          controls={false}
          autoPlay={false}
        >
          {slides}
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
            className={classes.carousel_indicators}
          />
        </Carousel>
      </div>
    );
  }
}

export default Slider;
