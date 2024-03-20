import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { StyledCard, StyledCardContent } from "styles/StyledComponents";

interface AddBookProps {
  handleOpen: () => void;
  text: string;
}
const AddButton: FC<AddBookProps> = ({ handleOpen, text }) => {
  return (
     <StyledCard>
      <StyledCardContent>
        <Typography variant="h5" component="h2">
          <Button variant="contained" onClick={handleOpen}>
            {text}
          </Button>
        </Typography>
      </StyledCardContent>
     </StyledCard>
  );
};
export default AddButton;
