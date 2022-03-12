import { atom } from "recoil";

export const loggedInUser = atom({
  key: "loggedInUser",
  default: {},
  persistence_UNSTABLE: {
    type: "loggedInUser",
  },
  dangerouslyAllowMutability:true
 
});

export const chatActiveContact = atom({
  key: "chatActiveContact",
  default: {},
  persistence_UNSTABLE: {
    type: "chatActiveContact",
  },
  dangerouslyAllowMutability:true
});

export const chatMessages = atom({
  key: "chatMessages",
  default: [],
  persistence_UNSTABLE: {
    type: "chatMessages",
  },
  dangerouslyAllowMutability:true
});
