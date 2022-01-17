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
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "14",
    image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "5",
    image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image:
      "https://app.geteasymove.com/uploads/user/image/2308/1582594407_profile_image.jpg",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image:
      "https://app.geteasymove.com/uploads/user/image/2410/1585084101_profile_image.jpeg",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image:
      "https://app.geteasymove.com/uploads/user/image/2037/2020-04-2011_36_01_0000.png",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image:
      "https://app.geteasymove.com/uploads/user/image/2196/1580188534_profile_image.jpg",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  {
    name: "Emin Aliyev",
    truck_type: "Box Truck",
    phone_number: "3312458899",
    rating: "10",
    miles_away: "25",
    image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
];

class DriversInYourArea extends Component {
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
              src="https://app.geteasymove.com/uploads/picture/name/1391/1582594408_vehicle_image.jpg"
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
                  <CardTitle>{item.name}</CardTitle>
                  <CardSubtitle>
                    {item.miles_away} away from your location
                  </CardSubtitle>
                </Col>
                <Col></Col>
              </Row>

              <CardText>Has a {item.truck_type}</CardText>

              <Button color="success">Hire</Button>
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
                In your area we have {this.RenderDrivers().length} delivery
                drivers
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

export default DriversInYourArea;
