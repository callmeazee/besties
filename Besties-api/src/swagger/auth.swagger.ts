const AuthApiDoc = {
  "/auth/signup": {
    post: {
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                fullname: {
                  type: "string",
                  example: "John Doe",
                },
                email: {
                  type: "string",
                  example: "[john@gmail.com](mailto:john@gmail.com)",
                },
                mobile: {
                  type: "string",
                  example: "9876543210",
                },
                password: {
                  type: "string",
                  example: "Password@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Signup successful",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "signup success",
              },
            },
          },
        },
        500: {
          description: "Signup failed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/auth/login": {
    post: {
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "[john@gmail.com](mailto:john@gmail.com)",
                },
                password: {
                  type: "string",
                  example: "Password@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Login success",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Login failed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/auth/logout": {
    post: {
      summary: "Logout current user",
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "Sent automatically from http only cookie",
                },
                refreshToken: {
                  type: "string",
                  example: "Sent automatically from http only cookie",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Logout successfull",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Logout failed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/auth/refresh-token": {
    get: {
      summary: "Generate new access token using refresh token",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                  example: "Sent automatically from http only cookie",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Token refreshed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "token refreshed",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Failed to refresh token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Refresh token error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/auth/session": {
    get: {
      summary: "Get logged in user info from session",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "Sent automatically from http only cookie",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Session data",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  fullname: {
                    type: "string",
                  },
                  mobile: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                  },
                  iat: {
                    type: "number",
                  },
                  exp: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Invalid session",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Session validation failed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/auth/profile-picture": {
    put: {
      summary: "Update user profile picture",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  example: "uploads/profile/user.jpg",
                },
                accessToken: {
                  type: "string",
                  example: "Sent automatically from http only cookie",
                   },
                image: {type: 'string', example: "your_image_public_url"}
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile picture updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  image: {
                    type: "string",
                    example:
                      "https://your-s3-bucket.amazonaws.com/uploads/profile/user.jpg",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Failed to update profile picture",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                          type: "string",
                       example: "authentication error"
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default AuthApiDoc;
