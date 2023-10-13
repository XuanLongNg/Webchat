import { SearchOutlined } from "@ant-design/icons";
import { MessageData, infoBoxChat } from "../../../../../types/firebase";
import Button from "../../../../../utils/button";
import Style from "./style";
import { Space, Input } from "antd";
import { useState } from "react";
const { Search } = Input;
const Header = ({
  box,
  onSearch,
}: {
  box:
    | {
        info: infoBoxChat;
        messages: MessageData[];
      }
    | undefined;
  onSearch: Function;
}) => {
  const [searchBy, setSearch] = useState("");
  const layout = (
    <Style>
      <div className="header d-flex">
        <img className="img" src={box?.info.image} alt="" />
        <div className="flex-grow-1 info-user">
          <h3 className="name">{box?.info.name}</h3>
        </div>
        <Space direction="vertical" size="large" className="input-group search">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              value={searchBy}
              onChange={(e) => setSearch(e.target.value)}
              className="input-search"
              placeholder="input search text"
            />
            <Button
              type="primary"
              onClick={() => {
                console.log(searchBy);
                onSearch(searchBy);
              }}
              content={<SearchOutlined rev="" />}
              className="find-message-btn"
            />
          </Space.Compact>
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
