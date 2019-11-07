const Action = {
  FETCH_EXPERIMENTEE: "FETCH_EXPERIMENTEE",
  FETCH_EXPERIMENTEE_SUCCESS: "FETCH_EXPERIMENTEE_SUCCESS",
  REQUEST_EXPERIMENTEE: "REQUEST_EXPERIMENTEE",
  EXPERIMENTEE_SUCCESS: "EXPERIMENTEE_SUCCESS",
  EXPERIMENTEE_BYID_SUCCESS: "EXPERIMENTEE_BYID_SUCCESS",
  CREATE_EXPERIMENTEE: "CREATE_EXPERIMENTEE",
  CREATE_EXPERIMENTEE_SUCCESS: "CREATE_EXPERIMENTEE_SUCCESS",
  CREATE_EXPERIMENTEE_ERROR: "CREATE_EXPERIMENTEE_ERROR",
  MANUAL_PREDICT: "MANUAL_PREDICT",
  MANUAL_PREDICT_SUCCESS: "MANUAL_PREDICT_SUCCESS",
  MANUAL_PREDICT_ERROR: "MANUAL_PREDICT_ERROR",
  CLEAR: "CLEAR",
  fetchExperimentees: user => ({
    type: Action.FETCH_EXPERIMENTEE,
    user
  }),
  requestExperimentee: id => {
    const exID = id ? id : "template";
    return {
      type: Action.REQUEST_EXPERIMENTEE,
      id: exID
    };
  },
  createExperimentee: body => ({
    type: Action.CREATE_EXPERIMENTEE,
    body
  }),
  manualPreciet: (id, body) => ({
    type: Action.MANUAL_PREDICT,
    id,
    body
  }),
  requestClear: () => ({ type: Action.CLEAR })
};

export default Action;
