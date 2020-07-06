export const createCar = () => async (dispatch) => {
  try {
  } catch (error) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
