import { SearchOutlined } from "@ant-design/icons";
import { infoBoxChat } from "../../../../../types/firebase";
import Button from "../../../../../utils/button";
import Style from "./style";
import { Space, Input } from "antd";
const { Search } = Input;
const Header = ({ box }: { box: infoBoxChat | undefined }) => {
  const onSearch = (value: string) => console.log(value);
  const layout = (
    <Style>
      <div className="header d-flex">
        <img className="img" src={box?.image} alt="" />
        <div className="flex-grow-1 info-user">
          <h3 className="name">{box?.name}</h3>
        </div>
        <Space direction="vertical" size="large" className="input-group search">
          <Space.Compact style={{ width: "100%" }}>
            <Input className="input-search" placeholder="input search text" />
            <Button
              type="primary"
              onClick={onSearch}
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
