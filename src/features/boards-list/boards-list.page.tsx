import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { href, Link } from "react-router-dom";

function BoardsList() {
  const boardsQuery = rqClient.useQuery("get", "/boards");
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards")
      );
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards")
        );
      },
    }
  );

  const handlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    createBoardMutation.mutate({ body: { name } });
  };

  const handleDelete = (boardId: string) => {
    deleteBoardMutation.mutate({
      params: { path: { boardId } },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handlSubmit}>
        <input type="text" name="name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          Board create
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {boardsQuery.data?.map((board) => {
          return (
            <Card key={board.id}>
              <CardHeader>
                <Button asChild variant="link">
                  <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                    {board.name}
                  </Link>
                </Button>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="destructive"
                  disabled={deleteBoardMutation.isPending}
                  onClick={() => handleDelete(board.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export const Component = BoardsList;
