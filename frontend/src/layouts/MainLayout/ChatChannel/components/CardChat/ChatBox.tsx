import { infoBoxChat } from "../../../../../types/firebase";
import Style from "./style";

const ChatBox = (props: any) => {
  const box: infoBoxChat = props.box;
  const nav = "/" + box.id;
  const layout = (
    <Style href={nav}>
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
