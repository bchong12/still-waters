const initialState = {
  date: "",
};

const GET_DATE = "GET_DATE";

export function getDate(date) {
  return {
    type: GET_DATE,
    payload: date,
  };
}

export default function dateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATE:
      return { ...state, date: action.payload };
    default:
      return state;
  }
}
