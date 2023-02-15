import PaymentSuccess from "../../assets/images/surveys/payment-success.png";
import classes from "../../assets/css/surveys/payments/index.module.scss";
import { Link } from "react-router-dom";

const PaymentSuccessIcon = () => {
  return (
    <div className={classes.main_container}>
      <img src={PaymentSuccess} alt="" />
      <span>Your Payment Has Been Successfully Received</span>
      <span>Now your survey is public. Get ready for the results</span>
      <Link to="/surveys">Back to Dashboard</Link>
    </div>
  );
};

export default PaymentSuccessIcon;
