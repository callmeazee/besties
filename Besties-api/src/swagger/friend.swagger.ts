
const FriendApiDoc = {
  "/friend": {
    post: {
      summary: "Send friend request",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                friend: {
                  type: "string",
                  example: "6851a0e7b123456789abcdef",
                },
                status: {
                  type: "string",
                  example: "requested",
                },
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
          description: "Friend request sent successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                  user: {
                    type: "string",
                  },
                  friend: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Failed to send friend request",
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

    get: {
      summary: "Fetch accepted friends",
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
          description: "Friends fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                    friend: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                        },
                        fullname: {
                          type: "string",
                        },
                        image: {
                          type: "string",
                        },
                        email: {
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
        500: {
          description: "Failed to fetch friends",
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

  "/friend/{id}": {
    put: {
      summary: "Accept or reject friend request",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "accepted",
                },
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
          description: "Friend status updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Friend status updated",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Failed to update friends",
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

    delete: {
      summary: "Delete friend",
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {},
            },
          },
        },
      },
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Friend deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Friend deleted successfully",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Failed to delete friend",
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

  "/friend/request": {
    get: {
      summary: "Fetch incoming friend requests",
   
      responses: {
        200: {
          description: "Friend requests fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                        },
                        fullname: {
                          type: "string",
                        },
                        image: {
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
        500: {
          description: "Failed to fetch friends",
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

  "/friend/suggestion": {
    get: {
      summary: "Fetch suggested friends",
     //  requestBody: {
     //    required: true,
     //    content: {
     //      "application/json": {
     //        schema: {
     //          type: "object",
     //          properties: {
     //            accessToken: {
     //              type: "string",
     //              example: "Sent automatically from http only cookie",
     //            },
     //          },
     //        },
     //      },
     //    },
     //  },
      responses: {
        200: {
          description: "Suggested friends fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                    },
                    fullname: {
                      type: "string",
                    },
                    image: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Failed to fetch suggestions",
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

export default FriendApiDoc
