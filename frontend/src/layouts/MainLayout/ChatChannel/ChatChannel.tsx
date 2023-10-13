import Style from "./style";
import { MessageData, infoBoxChat } from "../../../types/firebase";
import { List } from "antd";
import ChatBox from "./components/CardChat/ChatBox";
import Utilities from "./components/Utilities/Utilities";
import { useEffect, useRef, useState } from "react";

const ChatChannel = ({
  boxes,
}: {
  boxes: { info: infoBoxChat; messages: MessageData[] }[];
}) => {
  const [filter, setFilter] = useState("");
  let rerender = useRef(0);
  const boxesData = useRef(boxes);
  const updateFilter = (value: string) => {
    setFilter(value);
    rerender.current += 1;
  };
  useEffect(() => {
    boxesData.current = boxes;
    rerender.current += 1;
    if (!filter) {
      boxesData.current = boxes;
      return;
    }
    boxesData.current = boxes.filter((box) => {
      if (box.info.id.indexOf(filter) != -1) {
        return true;
      } else if (
        box.info.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
      ) {
        return true;
      }
      return false;
    });
  }, [boxes, boxesData, filter]);
  return (
    <Style>
      <Utilities updateFilter={updateFilter} />
      <List
        className="ListBoxChat scroll-bar"
        size="large"
        bordered={false}
        dataSource={boxesData.current}
        renderItem={(item: { info: infoBoxChat; messages: MessageData[] }) => (
          <List.Item className="item">
            <ChatBox box={item.info}></ChatBox>
          </List.Item>
        )}
      />
    </Style>
  );
};
export default ChatChannel;
