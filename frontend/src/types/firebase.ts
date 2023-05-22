export interface infoBoxChat {
  id: string;
  image: string;
  name: string;
  member: {
    [key: string]: string;
  };
}
export interface userProfile {
  id: string;
  username: string;
  password: string;
  information: {
    address: string;
    dob: string;
    fname: string;
    lname: string;
    image: string;
    introduce: string;
  };
}
export interface message {
  sender: string;
  body: string;
  time: string;
}
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
    [key: string]: string | number;
  };
}
export interface GroupChatsInfomation {
  id: string;
  image: string;
  name: string;
  member: {
    [key: string]: string | number;
  };
}
export interface Friend {
  id: string;
  listFriends: {
    [key: string]: string | number;
  };
}
export interface MainStructure {
  account: {
    [key: string]: Account;
  };
  friend: {
    [key: string]: Friend;
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
export interface keyFirebase {
  DB_API_KEY: string;
  DB_AUTH_DOMAIN: string;
  DB_DATABASE_URL: string;
  DB_PROJECT_ID: string;
  DB_APP_ID: string;
  DB_MEASUREMENT_ID: string;
  DB_MESSAGE_SENDER: string;
  DB_STORAGE_BUCKET: string;
}
