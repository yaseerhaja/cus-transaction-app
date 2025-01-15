
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://13.60.195.142:8081/graphql", // Node server Endpoint for Graphql codegen
  documents: ["src/**/*.ts", "src/**/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript-apollo-angular"]
    }
  }
};

export default config;
