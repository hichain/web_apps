import React, { forwardRef, ReactNode } from "react";
import { breakpoints } from "@css/variables";
import styled from "styled-components";

type Props = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const DomComponent = forwardRef<HTMLDivElement, Props>(function render(
  props,
  ref
) {
  return (
    <div className={props.className} ref={ref} onClick={props.onClick}>
      {props.children}
    </div>
  );
});

const StyledComponent = styled(DomComponent)`
  width: 32px;
  height: 32px;

  @media ${breakpoints.sm} {
    width: 39px;
    height: 39px;
  }
  @media ${breakpoints.md} {
    width: 46px;
    height: 46px;
  }
  @media ${breakpoints.lg} {
    width: 53px;
    height: 53px;
  }
  @media ${breakpoints.xl} {
    width: 60px;
    height: 60px;
  }
`;

export const CellComponent = forwardRef<HTMLDivElement, Props>(function render(
  props,
  ref
) {
  return <StyledComponent {...props} ref={ref} />;
});
