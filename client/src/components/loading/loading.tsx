import { CircularProgress } from "@mui/material";
import "./loading.scss";

interface LoadingProps {
  size?: number;
}
export const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div className="loading">
      <CircularProgress size={size} />
    </div>
  );
};
