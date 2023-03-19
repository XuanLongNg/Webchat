export interface infoBoxChat {
  id: string;
  image: string;
  name: string;
}
export interface userProfile {
  id: string;
  username: string;
  informations: {
    address: string;
    dob: string;
    fname: string;
    lname: string;
    image: string;
    introduce: string;
  };
}
