export interface Account {
  id: string;
  username: string;
  password: string;
  information: {
    fname: string;
    lname: string;
    dob: string;
    address: string;
    introduce: string;
    image: string;
  };
}
export interface Message {
  id: string;
  message: {
    [key: string]: {
      time: string;
      body: string;
      user: string;
    };
  };
}
export interface GroupChat {
  id: string;
  boxchat: {
    [key: string]: string;
  };
}
export interface GroupChatsInfomation {
  id: string;
  image: string;
  name: string;
}
export interface message {
  id: string;
  user: string;
  time: string;
  body: string;
}

export interface MainStructure {
  account: {
    [key: string]: Account;
  };
  groupChats: {
    [key: string]: GroupChatsInfomation;
  };
  groupChatsInfomation: {
    [key: string]: GroupChatsInfomation;
  };
  messages: {
    [key: string]: Message;
  };
}
