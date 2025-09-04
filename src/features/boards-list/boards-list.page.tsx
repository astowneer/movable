import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

function BoardsList() {
  const boardsQuery = rqClient.useQuery("get", "/boards");
  
  return (
    <div>
      {boardsQuery.data?.map((board) => {
        return (
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
        );
      })}
    </div>
  );
}

export const Component = BoardsList;
