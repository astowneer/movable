import { useParams } from "react-router-dom";
import { type PathParams, ROUTES } from '@/shared/model/routes'

function Boards() {
  const params = useParams<PathParams[typeof ROUTES.BOARD]>()

  return <>Boards {params.boardId}</>;
}

export const Component = Boards;
