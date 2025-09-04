import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

function BoardsList() {
  return (
    <>
      Boards list<Link to={href(ROUTES.BOARD, { boardId: "23" })}></Link>
    </>
  );
}

export const Component = BoardsList;
