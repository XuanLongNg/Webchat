import { useEffect, useState } from "react";
import { infoBoxChat } from "../../../../../types/firebase";
import Style from "./style";
import { Space, Input } from "antd";
const { Search } = Input;
const Header = (props: any) => {
  const box = props.box;
  console.log("Header box: ", box);
  console.log("Box: ", box.image, box.name);

  //   const [data, setData] = useState<infoBoxChat>(box);
  //   if (isLoading) return <p>Loading</p>;
  const onSearch = (value: string) => console.log(value);
  const layout = (
    <Style>
      <div className="header d-flex">
        <img className="img" src={box.image} alt="" />
        <div className="flex-grow-1 info-user">
          <h3 className="name">{box.name}</h3>
        </div>
        <Space className="input-group search" direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
        <button className="setting-btn">
          <i className="bi bi-exclamation-circle-fill"></i>
        </button>
      </div>
    </Style>
  );
  return layout;
};

export default Header;
