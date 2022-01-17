import React, { Component, AnyReactComponent } from "react";
import ImageUploader from "react-images-upload";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormText,
} from "reactstrap";

class AddProduct extends Component {
  state = {
    pictures: [],
  };

  //Add Picture
  onDrop = (picture) => {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="themed-container">
            <Row xs="2">
              <Col>
                <Form>
                  <FormGroup></FormGroup>
                  <FormGroup>
                    <Label for="Pickup Address">What are you selling?</Label>

                    <Input type="email" name="description" id="description" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword"> Select a Category</Label>
                    <Input type="select" name="select" id="select">
                      <option>Furniture</option>
                      <option>Appliances</option>
                      <option>Grocery</option>
                      <option>Apparel</option>
                      <option>Sport Equipment</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="exampleText"
                      placeholder="Enter Special Requirements"
                    >
                      Description
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label
                      for="exampleText"
                      placeholder="Enter Special Requirements"
                    >
                      Specification
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="Time" placeholder="Pick Time ">
                      Product Price
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Enter price for this product" />
                      <InputGroupAddon addonType="append"></InputGroupAddon>
                    </InputGroup>
                  </FormGroup>

                  <div style={{ marginTop: 15 }}></div>
                  <Button color="primary" size="lg" block>
                    Add to Store
                  </Button>
                </Form>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="exampleFile">Product Photos</Label>

                  <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    fileSizeError="file size is too big"
                    fileTypeError="is not supported file extension"
                    buttonText="Choose images"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={10242880}
                  />
                  <FormText color="muted">Attach photos of product.</FormText>
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProduct;
