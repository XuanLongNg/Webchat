import {
  Avatar,
  Card,
  Descriptions,
  Divider,
  Image,
  Input,
  List,
  Space,
} from "antd";
import { StyleModalSearch, StyleModalView } from "../style";
import Button from "../../../../../../utils/button";
import { Account, userProfile } from "../../../../../../types/firebase";
const { Meta } = Card;

export default function ModalAddFriend({
  ArrayUser,
  isModalSearchOpen,
  value,
  handleOk,
  handleCancel,
  showModalUser,
  handleSearchFriend,
  handleAddFriend,
  setUserProfile,
}: {
  ArrayUser: userProfile[];
  isModalSearchOpen: boolean;
  value: any;
  handleOk: () => void;
  handleCancel: () => void;
  showModalUser: () => void;
  handleSearchFriend: () => void;
  handleAddFriend: (id: string) => void;
  setUserProfile: any;
}) {
  return (
    <StyleModalSearch
      open={isModalSearchOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Space direction="vertical" size="large" className="group-search">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            className="input-search"
            ref={value}
            placeholder="Search id or name"
          />
          <Button
            type="primary"
            onClick={handleSearchFriend}
            content="Search"
          />
        </Space.Compact>
      </Space>
      <List
        className="scroll-bar list-user"
        itemLayout="horizontal"
        dataSource={ArrayUser.sort((a, b) => {
          return parseInt(a.id.slice(1)) - parseInt(b.id.slice(1));
        })}
        renderItem={(item: Account, index) => (
          <List.Item
            actions={[
              <Button
                key="list-loadmore-edit"
                type="primary"
                onClick={() => handleAddFriend(item.id)}
                content="Add friend"
              />,

              <Button
                key="list-loadmore-more"
                type="default"
                onClick={() => {
                  showModalUser();
                  setUserProfile(item);
                }}
                content="View"
              />,
            ]}
          >
            <List.Item.Meta
              className="d-flex align-items-center"
              avatar={<Avatar src={item.information.image} />}
              title={
                <p style={{ marginBottom: "0" }}>
                  {item.information.fname + " " + item.information.lname}
                </p>
              }
              description={item.id}
            />
          </List.Item>
        )}
      />
    </StyleModalSearch>
  );
}
