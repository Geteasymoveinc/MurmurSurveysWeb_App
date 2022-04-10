
import {
  ADD__PACKAGE,
  SEND_PACKAGE_SECCESSFULL,
  SEND_PACKAGE_ERROR,
  CLEAN
} from './actionTypes'

export const addPackage = (option, history) => {
  return {
    type: ADD__PACKAGE,
    payload: { option, history },
  };
};

export const sendPackageSuccessfully = (user) => {
  return {
    type: SEND_PACKAGE_SECCESSFULL,

    payload: user,
  };
};




export const sendPackageFailed = (err) => {
  return {
    type: SEND_PACKAGE_ERROR,
    payload: err,
  };
};


export const Cleanup = () => {
  return {
    type: CLEAN
  }
}

