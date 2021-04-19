import { breakpoints } from "@css/variables";
import styled from "styled-components";

export const StyledCell = styled.div`
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
