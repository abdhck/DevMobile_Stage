import { decode } from "html-entities";

const initialState = {
  loginIdent: "",
  dataFacture: [],
  facturePayee: [],
  factureImpayee: [],
  isTabVisible: true,
  //loginPass:"",
};

function toggleLogin(state = initialState, action) {
  //console.log("value :" + action.value);
  let nextState; let etat="Reglé";
  //console.log("value dans avant case :" + action.value);
  //const result = words.filter((word) => word.length > 6);
   const facturePayee = state.dataFacture.filter(
     (item) => decode(item.etat) === "Reglé"
   );
   const factureImpayee = state.dataFacture.filter(
     (item) => decode(item.etat) !== "Reglé"
   );
  switch (action.type) {
    case "CONNECT_USER":
      if (action.value.length !== 0) {
        //console.log("value dans if :" + action.value);
        nextState = {
          ...state,
          dataFacture: action.value,
        };
      } else {
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "FACTURE_PAYEE":
      nextState = {
        ...state,
        facturePayee: facturePayee,
      };
      return nextState || state;
    case "FACTURE_IMPAYEE":
      nextState = {
        ...state,
        factureImpayee: factureImpayee,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default toggleLogin;
