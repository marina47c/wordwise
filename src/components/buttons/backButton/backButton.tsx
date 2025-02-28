import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import { MouseEvent } from "react";

function BackButton() {
  const navigate = useNavigate();

  function handleBackClick(event: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    navigate(-1);
  }

  return (
    <Button type="back" onClick={handleBackClick}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
