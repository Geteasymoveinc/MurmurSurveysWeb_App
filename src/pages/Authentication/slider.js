import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import classes from "../../assets/css/Authentication/Login/Login.module.css";

const items = [
  {
    text: "Advertise via Murmur",
    paragraph:
      "Create your own ad via our digital platform and show it to the world via car-top, backpacks and online ways of advertising",
    id: "1",
  },
  {
    text: "Work with Us",
    paragraph:
      "Become Murmur’s backpack carrier and customized car driver and start to earn additional income",
    id: "2",
  },
  {
    text: "Improve trade industry via Murmur’s Survey Rewards App",
    paragraph:
      "Become Murmur’s Survey taker, fill out as many surveys as you want, get rewards from each of it",
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
      <div className={`${classes.text_carousel} ${classes.log_reg_slider}`}>
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
