import React, { FC } from "react";
import { Redirect } from "react-router";

type ContainerProps = {
  children?: never;
};

export const TopComponent: FC<ContainerProps> = (props) => {
  return <Redirect to="/games" />;
};
