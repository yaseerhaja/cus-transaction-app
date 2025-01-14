
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/cus-transaction-app/graphql",
  documents: ["src/**/*.ts", "src/**/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript-apollo-angular"]
    }
  }
};

export default config;
