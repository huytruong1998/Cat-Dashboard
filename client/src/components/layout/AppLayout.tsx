import { ReactNode } from "react";
import { Container } from "@mui/material";
interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <h1>The Cat Breed Catalog</h1>
      <div>{children}</div>
    </Container>
  );
};

export default AppLayout;
