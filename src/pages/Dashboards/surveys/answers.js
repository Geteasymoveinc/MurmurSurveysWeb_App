import React, { Component } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";
import classes2 from "../../../assets/css/surveys/index.module.scss";
import BarDefault from "./pie-charts/bar-default";


import { Row, Col, Card, Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

import Pie from './pie-charts/pie'

class SurveyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      analytics: {},
      answers: this.props.analytics,
    };
  }

  analyticsModal = (question, id) => {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
    });

    axios
      .get(
        `https://backendapp.murmurcars.com/api/v1/admin/survey-answer-analytics?id=${id}&question=${question}`
      )
      .then((response) => {
        const { Analytics } = response.data;
        this.setState({
          ...this.state,
          analytics: Analytics,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { id } = this.props;
    const { modal, analytics } = this.state;
    
    return (
      <div className={`${classes.flex_container_2}`}>
        <div className={` ${classes.flexbox} `}>
          {this.state.answers.map((el, i) => {
            const question = Object.keys(el);
            const categories = Object.keys(el[question]);
            const series = Object.values(el[question]);
            return (
              <div key={i} className={`${classes.rows} ${classes.rows_2}`}>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>{question}</h1>
                  </div>
                  <div className={classes.chart_contaioner_2}>
                    <BarDefault categories={categories} series={series} />
                  </div>
                  <button
                    className={classes.show_anal_button}
                    type="button"
                    onClick={() => this.analyticsModal(question, id)}
                  >
                    Show Analytics
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="modal">
        <Modal
          isOpen={modal}
          //toggle={this.props.toggleModal}
          className={`setting_cancel_modal`}
        >
          <ModalBody>
      
          
              <div className={` ${classes2.flexbox} `}>
                {Object.keys(analytics).map((analytic, i) => {
              
                 return( <div className={classes2.no_block_shadow} key={i}>
                   <h1>{analytic}</h1>
                   <div className="d-flex ">
                    <div className={`${classes2.pies}`}>
                      <div className={classes2.survey_info}>
                        <h1>Gender</h1>
               
                      </div>
                      <div className={classes2.chart_contaioner}>
                        <Pie
                          series={Object.values(analytics[analytic].gender)}
                          categories={Object.keys(analytics[analytic].gender)}
                          show_categories = {false}
                        />
                      </div>
                    </div>

                    <div className={classes2.pies}>
                      <div className={classes2.survey_info}>
                        <h1>Location</h1>
                      </div>
                      <div className={classes2.chart_contaioner}>
                      <Pie
                          series={Object.values(analytics[analytic].location)}
                          categories={Object.keys(analytics[analytic].location)}
                          show_categories = {false}
                        />
                      </div>
                    </div>
        
                    </div>
                  </div>)
                })}
                {/* <div className={`${classes.rows} ${classes.rows_2}`}>
          <div className={`${classes.pies} ${classes.pies_2}`}>
          <div className={`${classes.survey_info} ${classes.survey_info_2}`}>
                <h1>Gender</h1>
                <span className={classes.chart__gender_groups}>
                       <button onClick={() => this.selectBarChartGenderGroup('All')}>All</button>
                       <button onClick={() => this.selectBarChartGenderGroup('Woman')}>Woman</button>
                       <button onClick={() => this.selectBarChartGenderGroup('Man')}>Man</button>
                </span>
            </div>
            <div className={classes.question_answer}>
          <Bar/>
            </div>
          </div>
          
          <div className={`${classes.pies} ${classes.pie_location}`}>
            <div className={classes.question_answer}>
              <BarHorisontal/>
            </div>
          </div>
          
      </div>*/}
              </div>
            
          </ModalBody>
          <ModalFooter className={classes2.modal_footer}>
            <Row>
              <Col></Col>
            </Row>
            <button
              type="button"
              className="reason_cancel_btn"
              onClick={() => {
                this.setState({ ...this.state, modal: false });
              }}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    );
  }
}

export default SurveyAnswers;
