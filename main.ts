import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { APP_NAME, APP_VERSION } from "./constant.ts";
import { toolsList, toolToHandler } from "./tools/index.ts";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: APP_NAME,
    version: APP_VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, () => {
  return {
    tools: toolsList,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const requestToolName = request.params.name;

    const isMcptool = toolsList.some(
      (tool) => tool.name === requestToolName,
    );

    if (isMcptool) {
      const tool = toolsList.find((tool) => tool.name === requestToolName);
      if (!tool) {
        return { error: `Tool ${requestToolName} not found` };
      }

      const handler = toolToHandler[requestToolName];

      if (!handler) {
        return { error: `Handler for ${requestToolName} not found` };
      }

      const result = await handler(request.params.arguments as any);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: "Tool not found",
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Tool ${request.params.name} failed: ${error}`,
        },
      ],
    };
  }
});

const startServer = async () => {
  const transport = new StdioServerTransport();
  console.error("Connecting server to transport...");
  await server.connect(transport);
};

startServer();
