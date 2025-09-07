import { type ApiSchemas } from "../../schema";
import { http } from "../http";
import { HttpResponse } from "msw";
import {
  createRefreshTokenCookie,
  generateTokens,
  verifyToken,
} from "./session";

const mockUsers: ApiSchemas["User"][] = [
  {
    id: "1",
    email: "admin@gmail.com",
  },
];

const userPasswords = new Map<string, string>();
userPasswords.set("admin@gmail.com", "123456");

export const authHandlers = [
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();

    const user = mockUsers.find((u) => u.email === body.email);
    const storedPassword = userPasswords.get(body.email);

    if (!user || !storedPassword || storedPassword !== body.password) {
      return HttpResponse.json({
        message: "Wrong email or password",
        code: 401,
      });
    }

    const { accessToken, refreshToken } = await generateTokens({
      userId: user.id,
      email: user.email,
    });

    return HttpResponse.json(
      {
        accessToken,
        user,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": createRefreshTokenCookie(refreshToken),
        },
      }
    );
  }),

  http.post("/auth/register", async ({ request }) => {
    const body = await request.json();

    if (mockUsers.some((u) => u.email === body.email)) {
      return HttpResponse.json({
        message: "User is already exists",
        code: 400,
      });
    }

    const newUser: ApiSchemas["User"] = {
      id: String(mockUsers.length + 1),
      email: body.email,
    };

    mockUsers.push(newUser);
    userPasswords.set(body.email, body.password);

    const { accessToken, refreshToken } = await generateTokens({
      userId: newUser.id,
      email: newUser.email,
    });

    return HttpResponse.json(
      {
        accessToken,
        user: newUser,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": createRefreshTokenCookie(refreshToken),
        },
      }
    );
  }),

  http.post("/auth/refresh", async ({ cookies }) => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return HttpResponse.json({
        message: "Refresh token не найден",
        code: 401,
      });
    }

    try {
      const session = await verifyToken(refreshToken);
      const user = mockUsers.find((u) => u.id === session.userId);

      if (!user) {
        throw new Error("User not found");
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await generateTokens({
          userId: user.id,
          email: user.email,
        });

      return HttpResponse.json(
        {
          accessToken,
          user,
        },
        {
          status: 200,
          headers: {
            "Set-Cookie": createRefreshTokenCookie(refreshToken),
          },
        }
      );
    } catch (error) {
      return HttpResponse.json({
        message: "Недействительный refresh token",
        code: 401,
      });
    }
  }),
];
