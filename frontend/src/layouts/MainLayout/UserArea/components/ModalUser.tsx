import {
  // Button,
  Card,
  Descriptions,
  Divider,
  Image,
  Input,
  notification,
} from "antd";
import StyleModalView from "./styleModalUser";
import Meta from "antd/es/card/Meta";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
} from "@ant-design/icons";
import Button from "../../../../utils/button";
// type name = string;
export default function ModalUser({
  isModalUserOpen,
  handleOkUserModal,
  handleCancelUserModal,
  readOnly,
  profile,
  data,
  setData,
  handleSubmit,
  closeEdit,
  handleEdit,
  handleCancelEdit,
}: {
  isModalUserOpen: boolean;
  handleOkUserModal: () => void;
  handleCancelUserModal: () => void;
  readOnly: {
    name: boolean;
    dob: boolean;
    address: boolean;
    introduce: boolean;
  };
  profile: any;
  data: {
    name: string;
    dob: Date | undefined;
    address?: string;
    introduce?: string;
  };
  setData: any;
  handleSubmit: () => void;
  closeEdit: {
    name: boolean;
    dob: boolean;
    address: boolean;
    introduce: boolean;
  };
  handleEdit: (edit: string) => void;
  handleCancelEdit: (edit: string, content?: string) => void;
}) {
  //   const [profile, setProfile] = useState<userProfile>();
  const inputComponent = (
    label: string,
    type: string | undefined,
    value: string | number | readonly string[] | undefined,
    readOnly: boolean,
    element: string,
    closeEdit: boolean
  ) => {
    return (
      <Descriptions.Item label={label} span={6}>
        <div
          className="d-flex justify-content-between"
          style={{ width: "100%" }}
        >
          <Input
            type={type}
            value={value}
            readOnly={readOnly}
            bordered={!readOnly}
            style={{ width: "auto" }}
            onChange={(e: any) => {
              let valueChange = e.target.value;
              setData({ ...data, [element]: valueChange });
            }}
            onPressEnter={handleSubmit}
          />
          {!closeEdit && (
            <EditOutlined
              className="float-end"
              rev=""
              onClick={() => handleEdit(element)}
            />
          )}
          {closeEdit && (
            <div className="float-end">
              <CheckCircleFilled
                rev=""
                onClick={() => {
                  handleSubmit();
                  // handleCancelEdit("dob", profile.information.dob);
                }}
              />
              <CloseCircleFilled
                rev=""
                onClick={() =>
                  handleCancelEdit(element, profile.information[element])
                }
              />
            </div>
          )}
        </div>
      </Descriptions.Item>
    );
  };
  return (
    <StyleModalView
      closable={false}
      open={isModalUserOpen}
      onOk={handleOkUserModal}
      onCancel={handleCancelUserModal}
      footer={null}
      centered
    >
      <Card
        className="card scroll-bar"
        // onClick={onClickOutsiteInput}
        hoverable
        cover={
          <div
            className="d-flex justify-content-center card-cover"
            style={{
              background: `rgba(0,0,0,0.3) url(${profile?.information.image}) no-repeat center/cover`,
            }}
          >
            <div className="card-filter-blur-cover" />
            <Image
              className="card-avatar"
              // alt="avatar"
              preview
              src={profile?.information.image}
            />
          </div>
        }
      >
        <Meta
          title={
            <span>
              <Input
                readOnly={readOnly.name}
                bordered={!readOnly.name}
                value={data.name}
                style={{ width: "auto" }}
                onChange={(e: any) => {
                  let valueChange = e.target.value;
                  setData({ ...data, name: valueChange });
                }}
                onPressEnter={handleSubmit}
              />
              {!closeEdit.name && (
                <EditOutlined
                  className="float-end"
                  rev=""
                  onClick={() => handleEdit("name")}
                />
              )}
              {closeEdit.name && (
                <div className="float-end">
                  <CheckCircleFilled
                    rev=""
                    onClick={() => {
                      handleSubmit();
                      handleCancelEdit(
                        "name",
                        profile?.information.fname +
                          " " +
                          profile?.information.lname
                      );
                    }}
                  />
                  <CloseCircleFilled
                    rev=""
                    onClick={() =>
                      handleCancelEdit(
                        "name",
                        profile?.information.fname +
                          " " +
                          profile?.information.lname
                      )
                    }
                  />
                </div>
              )}
            </span>
          }
          description={<Input value={profile?.id} readOnly bordered={false} />}
        />
        <Divider />
        <Descriptions title="About me" layout="vertical" column={3}>
          {inputComponent(
            "Date of birth",
            "date",
            data?.dob?.toString(),
            readOnly.dob,
            "dob",
            closeEdit.dob
          )}
          {inputComponent(
            "Address",
            undefined,
            data?.address,
            readOnly.address,
            "address",
            closeEdit.address
          )}
          {inputComponent(
            "Introduce",
            undefined,
            data?.introduce,
            readOnly.introduce,
            "introduce",
            closeEdit.introduce
          )}
        </Descriptions>
        <Divider />
      </Card>
      <Button
        type="primary"
        onClick={() => {
          notification.success({ message: "log out" });
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/login";
            console.log("Hello");
          }, 3000);
        }}
        className="btn-logout"
        content="Logout"
      />
    </StyleModalView>
  );
}
