import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { readLines } from "https://deno.land/std@0.212.0/io/read_lines.ts";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

async function main() {
    const transport = new StdioClientTransport({
        command: "/opt/homebrew/bin/deno",
        args: [
            "run",
            "--allow-env",
            "--allow-read",
            "--allow-net",
            "/Users/a11111/Desktop/code/node/tesa_mcp/main.ts",
        ],
        env: {
            USER_JWT:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        },
    });

    const client = new Client({
        name: "mcp-client",
        version: "1.0.0",
    });

    console.log("连接到服务器...");
    await client.connect(transport);

    const { tools } = await client.listTools();
    console.log("\n可用工具列表:");
    (tools as Tool[]).forEach((tool) => {
        console.log(`- ${tool.name}: ${tool.description}`);
    });

    const stdin = readLines(Deno.stdin);

    console.log("\n请输入要使用的工具名称和参数 (格式: 工具名 参数1 参数2 ...)");
    console.log(
        "示例: get_token_info 9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump solana",
    );
    console.log("输入 'exit' 退出\n");
    // trade_token 9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump solana 100000000 buy
    for await (const line of stdin) {
        if (line.toLowerCase() === "exit") {
            break;
        }

        const [toolName, ...args] = line.split(" ");

        console.log("toolName", toolName);
        console.log("args", args, args.length);
        try {
            if (toolName === "trade_token") {
                console.log("trade_token");

                const result = await client.callTool({
                    name: toolName,
                    arguments: {
                        contract_address: args[0],
                        network: args[1],
                        amount: Number(args[2]),
                        type: args[3],
                    },
                });
                console.log("\n结果:", JSON.stringify(result, null, 2));
            } else {
                const result = await client.callTool({
                    name: toolName,
                    arguments: {
                        contract_address: args[0],
                        network: args[1],
                    },
                });
                console.log("\n结果:", JSON.stringify(result, null, 2));
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("\n错误:", toolName, error.message);
            } else {
                console.error("\n错误:", String(error));
            }
        }

        console.log("\n请输入下一个命令 (或输入 'exit' 退出):");
    }

    console.log("关闭客户端...");
    await transport.close();
}

main().catch(console.error);
