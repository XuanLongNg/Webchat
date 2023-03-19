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
