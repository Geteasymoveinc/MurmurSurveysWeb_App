import React, { Component, AnyReactComponent } from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";

const drivers = [
  {
    name: "Furniture",
    item_type: "Box item",
    phone_number: "3312458899",
    price: "430",
    furniture_image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    image:
      "https://geteasymove.com/image/partners/1563200710_Cort delivery.png",
  },
  {
    name: "Furniture",
    item_type: "Box item",
    phone_number: "3312458899",
    price: "230",
    furniture_image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    image:
      "https://geteasymove.com/image/partners/1563199659_Home-Depot-delivery.jpg",
  },
  {
    name: "Furniture",
    item_type: "Box item",
    phone_number: "3312458899",
    price: "120",
    furniture_image:
      "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=995&q=80",

    image:
      "https://geteasymove.com/image/partners/1562356674_1531659580_partner-icon4.png",
  },
];

class AllProducts extends Component {
  state = {
    alert: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ alert: true });
      console.log(this.state);
    }, 5000);
  }

  RenderDrivers = () => {
    const drivers_near_me = [];
    drivers.map((item) => {
      drivers_near_me.push(
        <Col className="themed-container" fluid="md">
          <Card>
            <CardImg
              top
              width="100%"
              src={item.furniture_image}
              alt="Card image cap"
              style={{ borderRadius: 10, marginBottom: 10 }}
            />
            <Col sm="4">
              <Avatar
                alt="Remy Sharp"
                src={item.image}
                className={{
                  width: 90,
                  height: 60,
                  borderRadius: 30,
                }}
              />
            </Col>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle>Price: ${item.price}</CardTitle>
                  <CardSubtitle>hello</CardSubtitle>
                </Col>
                <Col></Col>
              </Row>

              <CardText>
                The classic metal headboard and footboard of this Justina White
                Queen Panel Bed have a sturdy, heirloom look while upholstered
                panels soften the look and nailhead trim provides a finishing
                touch.
              </CardText>
              <Row>
                <Col>
                  <Button color="success">Edit</Button>
                </Col>
                <Col />
                <Col>
                  <Button color="primary">Delete</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return drivers_near_me;
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="themed-container" fluid="sm">
            {this.state.alert ? null : (
              <Alert color="success">
                In your Easymove store you have {this.RenderDrivers().length}
                products
              </Alert>
            )}
            <Row xs="1" md="4">
              {this.RenderDrivers()}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AllProducts;
