import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  BOARDS: "/boards",
  BOARD: "/boards/:boardId",
} as const;

export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
