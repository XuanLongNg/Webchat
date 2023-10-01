import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import colors from "../styles/color";
import clsx from "clsx";

const Style = styled(Button)`
  /* margin-top: 1em; */
  font-size: 16px;
  font-weight: 400;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.pink};
  color: ${colors.white};
  height: 2.5em;
  border-radius: 20px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${colors.white}!important;
    color: ${colors.black}!important;
  }
`;

export default ({
  className,
  content,
  type,
  htmlType,
  onClick,
}: {
  content: React.ReactNode | string;
  type:
    | "link"
    | "text"
    | "default"
    | "ghost"
    | "primary"
    | "dashed"
    | undefined;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
  onClick?: Function;
}) => {
  const classBtn = clsx(className);
  return (
    <Style
      className={classBtn}
      type={type}
      htmlType={htmlType}
      onClick={() => (onClick ? onClick() : undefined)}
    >
      {content}
    </Style>
  );
};
