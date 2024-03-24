import React, { FC, forwardRef, ReactNode, useEffect, useRef } from "react";
import { breakpoints } from "@styles/variables";
import styled from "styled-components";

type Props = {
  className?: string;
  children?: ReactNode;
  isFocused: boolean;
  onClick?: () => void;
};

const DomComponent = forwardRef<HTMLDivElement, Props>(function render(
  { className, onClick, children },
  ref
) {
  return (
    <div className={className} ref={ref} onClick={onClick}>
      {children}
    </div>
  );
});

const StyledComponent = styled(DomComponent)`
  width: 32px;
  height: 32px;

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${breakpoints.sm} {
    width: 39px;
    height: 39px;
  }

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${breakpoints.md} {
    width: 46px;
    height: 46px;
  }

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${breakpoints.lg} {
    width: 53px;
    height: 53px;
  }

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${breakpoints.xl} {
    width: 60px;
    height: 60px;
  }
`;

export const CellComponent: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isFocused) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      ref.current?.focus();
    }
  }, [props.isFocused]);

  return <StyledComponent {...props} ref={ref} />;
};
