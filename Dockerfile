FROM node:18

RUN apt-get update && apt-get install -y curl bash && rm -rf /var/lib/apt/lists/*

COPY . /app
WORKDIR /app

RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV PATH="/root/.deno/bin:$PATH"

EXPOSE 8080
CMD ["deno", "run", "--watch", "--allow-env", "main.ts"]
