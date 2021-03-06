import React, { Component } from "react";

import { connect, Provider } from "react-redux";
import { add_survey, add_price, add_title } from "../../../../store/actions";

import { withRouter } from "react-router-dom";

import classes from "../../../../assets/css/surveys/index.module.scss";
import "../../../../assets/css/surveys/antd.css";
import Radio from "../../../../assets/images/surveys/radio.svg";
import Avatar from "../../../../assets/images/avatar.png";
import Trash from "../../../../assets/images/surveys/trash.svg";

import Chevron_Down from "../../../../assets/images/surveys/chevron-down.svg";
import Add_Icon from "../../../../assets/images/surveys/add.svg";
import Close_Icon from "../../../../assets/images/surveys/close.svg";

import Gallery_Add from "../../../../assets/images/surveys/gallery-add.svg";

import { Upload } from "antd";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const { Dragger } = Upload;

class SurveyQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      form: {
        hasSurvey: false,
        survey_answers_questions: {
          id: 0,
          input: false,
          survey: {
            important: true,
            type: "radio",
            image: {
              image_url: "",
              image_file: {},
              image_name: "",
            },
            question: "",
            answers: {
              count: 1,
              options: {
                option_1: "Answer 1",
              },
            },
          },
          surveys: this.props.surveys,
        },
        survey_title_question_image: {
          input: false,

          survey: {
            form_title: this.props.survey_title,

            form_caption: this.props.survey_caption,
            image: {
              image_url: this.props.survey_image.image_url,
              image_file: this.props.survey_image.image_file,
              image_name: this.props.survey_image.image_name,
            },
          },
        },
        survey_price_amount: {
          input: false,
          survey: {
            price: this.props.survey_earnings,
            amount: this.props.survey_audience_number,
          },
        },
      },
      drag_drop: {
        dragableItems: this.props.surveys,
      },
      inform_danger: {
        survey_question: false,
      },
    };
  }

  //drag and drop

  handleDragEnd = (result) => {
    const destin_id = result.destination.index;
    const source_id = result.source.index;
    console.log("from " + source_id + " to " + destin_id);

    const { surveys } = this.state.form.survey_answers_questions;

    const dragged_item = surveys[source_id];

    surveys[source_id] = surveys[destin_id];
    surveys[destin_id] = dragged_item;

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          surveys,
        },
      },
    });
  };
  //drag and drop

  toggleToInputState = (type, input) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [type]: {
          ...this.state.form[type],
          [input]: true,
        },
      },
    });
  };
  togleFromInputState = (type, input) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [type]: {
          ...this.state.form[type],
          [input]: false,
        },
      },
    });
  };

  addInformationToSurvey = (type, segemnt) => {
    if (type === "price") {
      const { price, amount } = this.state.form.survey_price_amount.survey;
      this.props.add_price({ price, amount });
    } else {
      const { image, form_caption, form_title } =
        this.state.form.survey_title_question_image.survey;
      this.props.add_title({
        image: {
          name: image.image_name,
          file: image.image_file,
          url: image.image_url,
        },
        title: form_title,
        caption: form_caption,
      });
    }

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [segemnt]: {
          ...this.state.form[segemnt],
          input: false,
        },
      },
    });
  };

  getUserImageInput = (info, type) => {
    const reader = new FileReader();
    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [type]: {
            ...this.state.form[type],
            survey: {
              ...this.state.form[type].survey,
              image: {
                image_url: e.target.result,
                image_file: info.file,
                image_name: info.file.name,
              },
            },
          },
        },
      });
    };
  };
  getUserInput = (e, segment, type) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [segment]: {
          ...this.state.form[segment],
          survey: {
            ...this.state.form[segment].survey,
            [type]: value,
          },
        },
      },
    });
  };

  //creating options
  createAnOption = (event, option) => {
    const value = event.target.value;
    const count = this.state.form.survey_answers_questions.survey.answers.count;
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          survey: {
            ...this.state.form.survey_answers_questions.survey,
            answers: {
              ...this.state.form.survey_answers_questions.survey.answers,
              options: {
                ...this.state.form.survey_answers_questions.survey.answers
                  .options,
                [option]: value,
              },
            },
          },
        },
      },
    });
  };

  //storing in state users input (new question-answers) type and setera
  handleCreateQuestion = (event, parent, type) => {
    const value = event.target.value;

    this.setState({
      ...this.state,
      inform_danger: {
        ...this.state.inform_danger,
        survey_question: false,
      },
      form: {
        ...this.state.form,
        [parent]: {
          ...this.state.form[parent],
          survey: {
            ...this.state.form[parent].survey,
            [type]: value,
            answers: {
              count: 1,
              options: {
                option_1: "Answer 1",
              },
            },
          },
        },
      },
    });
  };

  //create new survey question
  addNewQuestionAnswer = () => {
    const { survey, surveys } = this.state.form.survey_answers_questions;

    const { image, question, answers, type, important } = survey;

    const options = Object.values(answers.options);
    const id = this.state.form.survey_answers_questions.id;
    this.props.add_survey([
      ...surveys,
      { image, question, answers: options, type, important, id: `a${id + 1}` },
    ]);
    if (question.length > 0) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,

          survey_answers_questions: {
            ...this.state.form.survey_answers_questions,
            id: id + 1,
            survey: {
              important: true,
              type: "radio",
              image: {
                image_url: "",
                image_file: {},
                image_name: "",
              },
              question: "",
              answers: {
                count: 1,
                options: {
                  option_1: "Answer 1",
                },
              },
            },
            surveys: [
              ...surveys,
              {
                image,
                question,
                answers: options,
                type,
                important,
                id: `a${id + 1}`,
              },
            ],
          },
        },
      });
    } else {
      this.setState({
        ...this.state,
        inform_danger: {
          ...this.state.inform_danger,
          survey_question: true,
        },
      });
    }
  };
  deleteCreatedSurvey = (start) => {
    const { survey, surveys } = this.state.form.survey_answers_questions;
    this.props.add_survey(surveys);

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          id: this.state.form.id--,
          ...this.state.form.survey_answers_questions,
          surveys: [...surveys.splice(start, 1)],
        },
      },
    });
  };
  addNewAnswerOption = () => {
    console.log("hey");
    let count = this.state.form.survey_answers_questions.survey.answers.count;
    console.log(count);

    const form = this.state.form;
    form.survey_answers_questions.survey.answers.count = count + 1;
    form.survey_answers_questions.survey.answers.options[
      `option_${count + 1}`
    ] = `Answer ${count + 1}`;
    this.setState({
      ...this.state,
      form: {
        ...form,
      },
    });
  };

  returnAnswerOptions = () => {
    const { survey, input } = this.state.form.survey_answers_questions;
    const { answers, type } = survey;
    const answers_array = [];
    let htmlElement = [];
    if (type !== "text") {
      for (let i = 0; i < answers.count; i++) {
        let htmlElement = (
          <span key={i}>
            {type !== "dropdown" && (
              <input
                id={`answer-${i}`}
                type={`${type === "radio" ? "radio" : "checkbox"}`}
                name={`answer`}
              />
            )}
            {input && type !== "dropdown" ? (
              <input
                type="text"
                className={classes.input_option}
                value={answers.options[`option_${i + 1}`]}
                onChange={(event) => {
                  this.createAnOption(event, `option_${i + 1}`);
                }}
              />
            ) : type === "dropdown" ? (
              <span className={classes.dropdown_option}>
                <span className={classes.dropdown_option_counter}>
                  {i + 1}.
                </span>
                {!input ? (
                  answers.options[`option_${i + 1}`]
                ) : (
                  <input
                    type="text"
                    className={classes.input_option}
                    // value={answers.options[`option_${i + 1}`]}
                    onChange={(event) => {
                      this.createAnOption(event, `option_${i + 1}`);
                    }}
                  />
                )}
              </span>
            ) : (
              <label htmlFor="answer">
                {answers.options[`option_${i + 1}`]}
              </label>
            )}
          </span>
        );
        answers_array.push(htmlElement);
      }
    } else {
      htmlElement = (
        <span key="1">
          <input
            className={`${type === "text" && classes.survey_input} ${
              type === "text" && classes.survey_input_2
            }`}
            onChange={(event) => {
              this.createAnOption(event, `option_1`);
            }}
            placeholder="Type your short answer"
          />
        </span>
      );

      answers_array.push(htmlElement);
    }
    return answers_array;
  };
  toggleSurveyImportance = () => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          survey: {
            ...this.state.form.survey_answers_questions.survey,
            important:
              !this.state.form.survey_answers_questions.survey.important,
          },
        },
      },
    });
  };
  toggleCurrentSurveysImportance = (id) => {
        let {surveys} = this.state.form.survey_answers_questions
        
        surveys = surveys.map(survey => {
               if(survey.id ===id){
                 survey.important = !survey.important
               }
                return survey
        })
        this.setState({
          ...this.state,
          form: {
            ...this.state.form,
            survey_answers_questions: {
              ...this.state.form.survey_answers_questions,
              surveys
            }
          }
        })
  }

  render() {
    const { form, inform_danger } = this.state;
    const {
      survey_title_question_image,
      survey_answers_questions,
      survey_price_amount,
    } = form;
    const { survey_question } = inform_danger;
    const { survey: create_title_caption, input: image_title_active } =
      survey_title_question_image;
    const { survey: price_amount, input: price_amount_input } =
      survey_price_amount;
    const { amount, price } = price_amount;
    let {
      survey: create_answers_questions,
      input,
      surveys,
    } = survey_answers_questions;

    const { image: expamle_img, answers } = create_answers_questions;
    let {
      form_title,
      form_caption,
      image: create_title_caption_image,
    } = create_title_caption;

    const { type: type_dev, important } = create_answers_questions;

    console.log(surveys);
    const { expanded, selected } = this.state.drag_drop;
    return (
      <>
        {/**/}

        <div className={classes.grid_container}>
          <div className={classes.left_container}>
            <div
              className={`${classes.survey_amount_price} ${
                price_amount_input && classes.active
              }`}
            >
              <div
                className={classes.survey_amount_price_subc}
                onClick={() => {
                  this.toggleToInputState("survey_price_amount", "input");
                }}
              >
                <div>
                  <h6>Cost of survey:</h6>

                  {price_amount_input ? (
                    <input
                      type="number"
                      className={classes.survey_amount_price_input}
                      value={price}
                      min="0.1"
                      step="0.1"
                      onChange={(e) =>
                        this.getUserInput(e, "survey_price_amount", "price")
                      }
                    />
                  ) : (
                    <p>{price}</p>
                  )}
                </div>
                <div>
                  <h6>Number of people:</h6>

                  {price_amount_input ? (
                    <input
                      type="number"
                      className={classes.survey_amount_price_input}
                      value={amount}
                      onChange={(e) =>
                        this.getUserInput(e, "survey_price_amount", "amount")
                      }
                    />
                  ) : (
                    <p>{amount}</p>
                  )}
                </div>
              </div>
              {price_amount_input && (
                <div className={classes.user_input_setting_hotisontal}>
                  <img
                    src={Add_Icon}
                    alt="add plus icon"
                    onClick={() => {
                      this.addInformationToSurvey(
                        "price",
                        "survey_price_amount"
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={classes.flex_container}>
            <div className={`${classes.flexbox} `}>
              <div
                className={`${classes.title_image_container} ${
                  image_title_active ? classes.active : null
                }`}
              >
                <div
                  className={classes.title_image_subcontainer}
                  onClick={() => {
                    this.toggleToInputState(
                      "survey_title_question_image",
                      "input"
                    );
                  }}
                >
                  <div className={`image-dragger ${classes.image_and_title}`}>
                    <Dragger
                      listType="picture-card"
                      openFileDialogOnClick={true}
                      showUploadList={false}
                      beforeUpload={() => false}
                      className="profil_img_edit"
                      onChange={(info) =>
                        this.getUserImageInput(
                          info,
                          "survey_title_question_image"
                        )
                      }
                      style={{
                        background: "white",
                        borderColor: "transparent",
                      }}
                    >
                      <div className={classes.profil_relative}>
                        {/*} <Profile scope={"local"} />*/}
                        <div className={classes.profil_cover}>
                          <img
                            src={
                              create_title_caption_image.image_name.length
                                ? create_title_caption_image.image_url
                                : Avatar
                            }
                            className={classes.profil_cover_img}
                          />
                        </div>
                      </div>
                    </Dragger>
                  </div>
                  <div className={classes.title_and_caption}>
                    {image_title_active ? (
                      <input
                        type="text"
                        className={`${classes.survey_input} ${classes.bottom_border} ${classes.extra_bottom_margin}`}
                        value={form_title}
                        onChange={(e) => {
                          this.getUserInput(
                            e,
                            "survey_title_question_image",
                            "form_title"
                          );
                        }}
                      />
                    ) : (
                      <h4>{form_title}</h4>
                    )}
                    {image_title_active ? (
                      <input
                        type="text"
                        className={`${classes.survey_input} ${classes.bottom_border}`}
                        value={form_caption}
                        onChange={(e) => {
                          this.getUserInput(
                            e,
                            "survey_title_question_image",
                            "form_caption"
                          );
                        }}
                      />
                    ) : (
                      <p>{form_caption}</p>
                    )}
                  </div>
                </div>
                {image_title_active && (
                  <div className={classes.user_input_setting}>
                    <img
                      src={Add_Icon}
                      alt="add plus icon"
                      onClick={() =>
                        this.addInformationToSurvey(
                          "title",
                          "survey_title_question_image"
                        )
                      }
                    />
                  </div>
                )}
              </div>
              {/*surveys */}
              <DragDropContext onDragEnd={this.handleDragEnd}>
                <Droppable droppableId="surveys">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={classes.dragable_container}
                    >
                      {surveys.length > 0 &&
                        surveys.map((survey, i) => {
                          return (
                            <Draggable
                              key={i}
                              draggableId={survey.id}
                              index={i}
                            >
                              {(provided) => (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  className={`${classes.item1} ${
                                    this.state.form.survey_answers_questions[
                                      `survey_created_input_${i}`
                                    ] && classes.active
                                  }`}
                                >
                                  {/*container for survey*/}
                                  <div
                                    className={classes.question_answer}
                                    onClick={() => {
                                      this.toggleToInputState(
                                        "survey_answers_questions",
                                        `survey_created_input_${i}`
                                      );
                                    }}
                                  >
                                    {/*image*/}
                                    {survey.image && survey.image.image_url && (
                                      <div
                                        className={` ${classes.survey_image_container}`}
                                      >
                                        {survey.image.image_url && (
                                          <img
                                            src={survey.image.image_url}
                                            alt="survey question image"
                                            className={` ${classes.survey_image_img}`}
                                          />
                                        )}
                                      </div>
                                    )}
                                    {/*question*/}
                                    <h4
                                      className={`${
                                        survey.image &&
                                        survey.image.image_url &&
                                        classes.margin_top
                                      }`}
                                    >
                                      {survey.question}
                                    </h4>

                                    {/*answers ---options*/}
                                    <span
                                      className={
                                        classes.question_answers_container
                                      }
                                    >
                                      {survey.type === "dropdown" ? (
                                        <span
                                          className={
                                            classes.selection_options_container
                                          }
                                        >
                                          <select
                                            className={`${classes.survey_input} ${classes.survey_selection}`}
                                          >
                                            {survey.answers.map(
                                              (answer, index) => (
                                                <option
                                                  key={index}
                                                  value={answer}
                                                >
                                                  {answer}
                                                </option>
                                              )
                                            )}
                                          </select>
                                          <img
                                            src={Chevron_Down}
                                            alt="arrow"
                                            className={classes.select_icon}
                                          />
                                        </span>
                                      ) : (
                                        survey.answers.map((answer, index) => {
                                          return (
                                            <span
                                              className={
                                                classes.question_answer_span
                                              }
                                              key={index}
                                            >
                                              <input
                                                id={`answer${i + 1}-${
                                                  index + 1
                                                }`}
                                                type={`${
                                                  survey.type === "radio"
                                                    ? "radio"
                                                    : survey.type === "checkbox"
                                                    ? "checkbox"
                                                    : survey.type === "text"
                                                    ? "text"
                                                    : null
                                                }`}
                                                className={`${
                                                  survey.type === "text" &&
                                                  classes.survey_input
                                                } ${
                                                  survey.type === "text" &&
                                                  classes.survey_input_2
                                                }`}
                                                name={`options${i + 1}`}
                                                placeholder={`${
                                                  survey.type === "text" &&
                                                  "Answer"
                                                }`}
                                              />
                                              {survey.type !== "text" && (
                                                <label
                                                  htmlFor={`answer${i + 1}-${
                                                    index + 1
                                                  }`}
                                                >
                                                  {" "}
                                                  {answer}
                                                </label>
                                              )}
                                            </span>
                                          );
                                        })
                                      )}
                                    </span>

                                    {this.state.form.survey_answers_questions[
                                      `survey_created_input_${i}`
                                    ] && (
                                      <>
                                        {" "}
                                        <div
                                          className={
                                            classes.question_answer_border
                                          }
                                        ></div>
                                        <div
                                          className={
                                            classes.question_answer_setting_flex_end
                                          }
                                        >
                                          <div className={classes.survey_trash}>
                                            <img
                                              src={Trash}
                                              alt="delete icon"
                                              onClick={() =>
                                                this.deleteCreatedSurvey(i)
                                              }
                                            />
                                            <p>Important</p>
                                            <label
                                              className={classes.switch}
                                              htmlFor="checkbox"
                                            >
                                              <input
                                                type="checkbox"
                                                id="checkbox"
                                                checked={survey.important}
                                                onChange={() => 
                                                  this.toggleCurrentSurveysImportance(survey.id)
                                                }
                                              />
                                              <div
                                                className={`${classes.slider} ${classes.round}`}
                                              ></div>
                                            </label>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div
                className={`${classes.create_question} ${
                  input ? classes.active : null
                }`}
              >
                {input && (
                  <div className={classes.user_setting}>
                    <img
                      src={Add_Icon}
                      alt="add plus icon"
                      onClick={() => this.addNewQuestionAnswer()}
                    />
                    <img
                      src={Close_Icon}
                      onClick={() => {
                        this.togleFromInputState(
                          "survey_answers_questions",
                          "input"
                        );
                      }}
                      alt="close icon"
                    />
                  </div>
                )}

                <div
                  className={classes.create_question_subcontainer}
                  onClick={() => {
                    this.toggleToInputState(
                      "survey_answers_questions",
                      "input"
                    );
                  }}
                >
                  <div className={classes.radio_group}>
                    <div className={classes.radio_group_with}>
                      <div className={classes.radio_group_grid_container}>
                        <img src={Radio} alt="radio icons" />
                        <img src={Radio} alt="radio icons" />
                        <img src={Radio} alt="radio icons" />
                        <img src={Radio} alt="radio icons" />
                        <img src={Radio} alt="radio icons" />
                        <img src={Radio} alt="radio icons" />
                      </div>
                    </div>
                  </div>
                  <div className={classes.survey_input_and_question_type}>
                    {expamle_img.image_url && (
                      <div className={` ${classes.survey_image_container}`}>
                        <img
                          src={expamle_img.image_url}
                          alt="new survey  image"
                          className={` ${classes.survey_image_img}`}
                        />
                      </div>
                    )}
                  </div>
                  <div className={classes.survey_input_align_center}>
                    <input
                      type="text"
                      className={`${classes.survey_input} ${
                        survey_question && classes.survey_input_danger
                      }`}
                      placeholder="Type your question"
                      value={create_answers_questions.question}
                      onChange={(event) => {
                        this.handleCreateQuestion(
                          event,
                          "survey_answers_questions",
                          "question"
                        );
                      }}
                    />
                    <div className={`${classes.flex_row}`}>
                      <div
                        className={`img-dragger-2 ${classes.spacing_between}`}
                      >
                        <Dragger
                          listType="picture-card"
                          openFileDialogOnClick={true}
                          showUploadList={false}
                          beforeUpload={() => false}
                          className="profil_img_edit"
                          onChange={(info) =>
                            this.getUserImageInput(
                              info,
                              "survey_answers_questions"
                            )
                          }
                          style={{
                            background: "white",
                            borderColor: "transparent",
                          }}
                        >
                          <div className={classes.profil_relative}>
                            {/*} <Profile scope={"local"} />*/}
                            <div className={classes.profil_cover_2}>
                              <img
                                src={Gallery_Add}
                                className={classes.add_image_icon}
                              />
                            </div>
                          </div>
                        </Dragger>
                      </div>
                      <span className={classes.select_container}>
                        <select
                          name="question_type"
                          onChange={(event) =>
                            this.handleCreateQuestion(
                              event,
                              "survey_answers_questions",
                              "type"
                            )
                          }
                        >
                          <option key={type_dev}>
                            {type_dev === "radio"
                              ? "Multiple choice"
                              : type_dev === "checkbox"
                              ? "Checkboxes"
                              : type_dev === "dropdown"
                              ? "Dropdown"
                              : "Short answers"}
                          </option>
                          {[
                            { value: "radio", type: "Multiple choice" },
                            { value: "checkbox", type: "Checkboxes" },
                            { value: "dropdown", type: "Dropdown" },
                            { value: "text", type: "Short answers" },
                          ].map((el, index) => {
                            if(el.value !== type_dev){
                            return (<option key={index} value={el.value}>
                              {el.type}
                            </option>)
                            }
                            })}
                        </select>
                        <img
                          src={Chevron_Down}
                          alt="arrow"
                          className={classes.select_icon}
                        />
                      </span>
                    </div>
                    {/* <div
                    className={`${classes.flex_row} ${
                      true && classes.extra_margin_top
                    }`}
                  >
             
                  </div>*/}
                  </div>
                  <div>
                    <div
                      className={`${classes.question_answer} ${classes.margin_top}`}
                    >
                      {this.returnAnswerOptions()}
                      {type_dev !== "text" && (
                        <span className={classes.add_question}>
                          {type_dev !== "dropdown" ? (
                            <input
                              id="answer"
                              type={`${
                                type_dev === "radio"
                                  ? "radio"
                                  : type_dev === "checkbox"
                                  ? "checkbox"
                                  : null
                              }`}
                            />
                          ) : (
                            <span className={classes.dropdown_option_counter}>
                              {answers.count + 1}.
                            </span>
                          )}
                          <label htmlFor="answer">
                            {" "}
                            Add another or{" "}
                            <span
                              className={classes.link_color}
                              onClick={this.addNewAnswerOption}
                            >
                              other
                            </span>
                          </label>
                        </span>
                      )}
                    </div>
                    <div className={classes.question_answer_border}></div>
                    <div className={classes.question_answer_setting}>
                      <div>
                        {/*<img src={Copy} alt="comment icon" />
                        <img src={Trash} alt="delete icon" />*/}
                        <p>Important</p>
                        <label className={classes.switch} htmlFor="checkbox">
                          <input
                            type="checkbox"
                            id="checkbox"
                            checked={important}
                            onChange={this.toggleSurveyImportance}
                          />
                          <div
                            className={`${classes.slider} ${classes.round}`}
                          ></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapPropsToState = (state) => {
  const { survey_questions, survey_title, survey_earnings } = state.Survey;
  return { survey_questions };
};

export default connect(mapPropsToState, { add_survey, add_price, add_title })(
  withRouter(SurveyQuestion)
);
