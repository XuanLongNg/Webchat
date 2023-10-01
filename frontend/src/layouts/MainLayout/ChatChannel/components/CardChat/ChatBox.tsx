import { useParams } from "react-router";
import { infoBoxChat, message } from "../../../../../types/firebase";
import Style from "./style";
import clsx from "clsx";

const ChatBox = ({ box }: { box: infoBoxChat }) => {
  const nav = "/message/" + box.id;
  const { message } = useParams();
  const classActive = clsx("d-flex justify-content-center align-items-center", {
    ["active"]: message == box.id,
  });

  const layout = (
    <Style className={classActive} to={nav}>
      <div className="box-chat-item d-flex flex-row">
        <img className="img" src={box.image} alt="" />
        <div>
          <h3 className="name">{box.name}</h3>
          <p className="body">Hello</p>
        </div>
      </div>
    </Style>
  );

  return layout;
};
export default ChatBox;
