  # Use supercorp/supergateway as base image                                                                                                                                                                 
FROM supercorp/supergateway 

# 帮我把当前的项目打包进去
COPY . /app


# 安装deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

# 设置deno路径
ENV PATH="/root/.deno/bin:$PATH"



# 设置工作目录
WORKDIR /app
# Expose port 8080         
EXPOSE 8080

# Run the command          
CMD ["npx", "-y", "supergateway", "--stdio", "npx -y @wopal/mcp-server-hotnews --config '{\"sources\":[1,2,3,4,5]}'", "--port", "8080", "--cors"]