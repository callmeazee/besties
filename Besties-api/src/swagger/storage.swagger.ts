const StorageApiDoc = {
  "/storage/download": {
    post: {
      summary: "Generate signed URL for  download  a file",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  example: "profile/user-image.jpg",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Download URL generated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    example:
                      "https://your-bucket.s3.amazonaws.com/profile/user-image.jpg",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid request",
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
          description: "File does not exist",
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
          description: "Failed to generate download url",
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

  "/storage/upload": {
    post: {
      summary: "Generate upload URL for a file",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  example: "profile/user-image.jpg",
                },
                type: {
                  type: "string",
                  example: "image/jpeg",
                },
                status: {
                  type: "string",
                  example: "public-read | private ",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Upload URL generated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    example:
                      "https://your-bucket.s3.amazonaws.com/profile/user-image.jpg?signature=xyz",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid request path or type is required",
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
          description: "Failed to generate upload url",
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

export default StorageApiDoc;
