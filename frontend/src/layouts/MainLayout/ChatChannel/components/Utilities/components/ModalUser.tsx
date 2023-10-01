import { Card, Descriptions, Divider, Image } from "antd";
import { StyleModalView } from "../style";
const { Meta } = Card;

export default function ModalUser({
  user,
  isModalUserOpen,
  handleOkUserModal,
  handleCancelUserModal,
}: {
  user: any;
  isModalUserOpen: boolean;
  handleOkUserModal: () => void;
  handleCancelUserModal: () => void;
}) {
  return (
    <StyleModalView
      open={isModalUserOpen}
      onOk={handleOkUserModal}
      onCancel={handleCancelUserModal}
      footer={null}
      centered
      closable={false}
    >
      <Card
        className="card scroll-bar"
        hoverable
        cover={
          <div
            className="d-flex justify-content-center card-cover"
            style={{
              background: `rgba(0,0,0,0.3) url(${user.information.image}) no-repeat center/cover`,
            }}
          >
            <div className="card-filter-blur-cover" />
            <Image
              className="card-avatar"
              preview
              src={user.information.image}
            />
          </div>
        }
      >
        <Meta
          title={user.information.fname + " " + user.information.lname}
          description={user.id}
        />
        <Divider />
        <Descriptions title="About me" layout="vertical">
          <Descriptions.Item label="Date of birth">
            {user.information.dob}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {user.information.address}
          </Descriptions.Item>
          <br />
          <Descriptions.Item label="Introduce">
            {user.information.introduce}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
      </Card>
    </StyleModalView>
  );
}
