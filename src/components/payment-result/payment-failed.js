import PaymentFailed from "../../assets/images/surveys/payment-failed.png";
import classes from '../../assets/css/surveys/payments/index.module.scss'
import { Link } from "react-router-dom";

const PaymentFailedIcon = () => {
  return <>
      <div className={classes.main_container}>
        <img src={PaymentFailed} alt=''/>
        <span>
        Your Payment Failed


        </span>
        <span>
        Please try again or contact our help team by emailing to <strong>info@murmurcars.com</strong>
        </span>
        <Link to='/surveys'>
            Back to Dashboard
        </Link>
      </div>
  </>;
};

export default PaymentFailedIcon;
