export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")) ,
    auth: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
    ok: false,
    features: [
      {
        feature: "Set List",
        img: "missing img",
        description:
          "Create your set lists easily, stage ready and share with the band.",
        link: "missing link",
        buttonText: "Start now",
      },
      {
        feature: "Band",
        img: "missing img",
        description:
          "Have all your band members, songs, lives  in one place and manage them easily.",
        link: "missing link",
        buttonText: "Start now",
      },
      {
        feature: "Lives",
        img: "missing img",
        description:
          "Create and manage your lives and share them with your bandmates and your fans.",
        link: "missing link",
        buttonText: "Start now",
      },
    ],
  };
};
//  NO PUEDE SER ASYNC!!!!
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'logout':
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
       ...store,
        user: null,
        auth: false,
        token: null,
      };
    case 'login':
    case "store":
      console.log("storeReducer", action.payload);
      return {
        ...store,
        [action.payload.key]: action.payload.result,
      };
    case "test":
      console.log("test ok", action.payload);
      return {
        ...store,
        ok: action.payload.ok,
      };
    default:
      throw Error("Unknown action.");
  }
}
