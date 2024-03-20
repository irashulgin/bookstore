import styled from "@emotion/styled";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";

export const StyledCard = styled(Card)`
  max-width: 25rem;
  margin: 1.25rem;
`;
export const StyledCardContent = styled(CardContent)`
  && {
    padding: 1rem;
  }
`;
