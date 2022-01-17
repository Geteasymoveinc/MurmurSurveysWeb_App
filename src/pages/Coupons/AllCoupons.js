import React, { Component } from "react";

import { Card, CardBody, CardTitle, Button, Container, Row } from "reactstrap";

import { Coupons } from "./Apps/coupons";

class AllCoupons extends Component {
  state = {
    alert: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ alert: true });
      console.log(this.state);
    }, 5000);
  }

  RenderCoupons = () => {
    const coupons = [];
    Coupons.map((item, index) => {
      coupons.push(
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
            <td>{item.code}</td>
            <td>{item.expire_date}</td>
            <td>${item.value}</td>
            <td>{item.total}</td>

            <td>
              <Button
                type="button"
                color="primary"
                size="sm"
                className="btn-rounded waves-effect waves-light"
                //onClick={this.handleDeleteCoupon}
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });
    return coupons;
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="themed-container" fluid="sm">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Latest Transaction</CardTitle>
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
                        <th>Order ID</th>
                        <th>Billing Name</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {this.RenderCoupons()}
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

export default AllCoupons;
