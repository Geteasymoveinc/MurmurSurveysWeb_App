import React, { Component } from "react";

import { Card, CardBody, CardTitle, Button, Container, Row } from "reactstrap";

import { contacts } from "./Apps/contacts";

class Contacts extends Component {
  state = {
    alert: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ alert: true });
      console.log(this.state);
    }, 5000);
  }

  RenderContacts = () => {
    const Allcontacts = [];
    contacts.map((item, index) => {
      Allcontacts.push(
        <tbody>
          <tr key={"_tr_" + index}>
            <td>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={index}
                />
                <label className="custom-control-label" htmlFor={index}>
                  &nbsp;
                </label>
              </div>
            </td>
            <td>{item._id}</td>
            <td>
              {item.first_name} {item.last_name}
            </td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>

            <td>
              <Button
                type="button"
                color="primary"
                size="sm"
                className="btn-rounded waves-effect waves-light"
                //onClick={this.handleDeleteCoupon}
              >
                View Purchase History
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });
    return Allcontacts;
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="themed-container" fluid="sm">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Customer Contacts</CardTitle>
                <div className="table-responsive">
                  <table className="table table-centered table-nowrap mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: "20px" }}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </th>
                        <th>Contact ID</th>
                        <th>Full Name</th>
                        <th>E-mail</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {this.RenderContacts()}
                  </table>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Contacts;
