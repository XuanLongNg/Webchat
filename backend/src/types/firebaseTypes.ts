export interface Account {
  id: string;
  username: string;
  password: string;
  infomation: {
    fname: string;
    lname: string;
    dob: string;
    address: string;
    introduce: string;
    image: string;
  };
}
