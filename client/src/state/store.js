export const initialStore = () => {
  return {
    auth: false,
    ok: false,
    features: [
      {
        feature: "Set List",
        img: "missing img",
        description: "Handle and create your set lists easily while on stage and share them with your bandmates.",
        link: "missing link",
        buttonText: "Start now",
      },
      {
        feature: "Band",
        img: "missing img",
        description: "Have all your band members, songs, lives  in one place and manage them easily.",
        link: "missing link",
        buttonText: "Start now",
      },
      {
        feature: "Lives",
        img: "missing img",
        description: "Create and manage your lives and share them with your bandmates and your fans.",
        link: "missing link",
        buttonText: "Start now",
      },
    ],
  };
};
//  NO PUEDE SER ASYNC!!!!
export default function storeReducer(store, action = {}) {
  switch (action.type) {
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
