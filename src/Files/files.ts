export const editorConfig = {
  name: '.editorconfig',
  content: `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true`,
};

export const gitIgnore = {
  name: '.gitignore',
  content: `node_modules/`,
};

export const prettierRc = {
  name: '.prettierrc',
  content: `{
  "bracketSpacing": true,
  "printWidth": 80,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "endOfLine": "auto"
}
`,
};

export const eslintIgnoreJS = {
  name: '.eslintignore',
  content: `node_modules`,
};

export const eslintRcJs = {
  name: '.eslintrc',
  content: `{
  "extends": ["standard", "plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": "error",
    "no-throw-literal": "off",
    "camelcase": "off",
    "no-global-assign": "off"
  },
  "env": {
    "mocha": true,
    "node": true
  },
  "parser": "babel-eslint"
}
`,
};

export const eslintIgnoreTs = {
  name: '.eslintignore',
  content: `node_modules
dist
build`,
};

export const eslintRcTs = {
  name: '.eslintrc',
  content: `{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error",
    "no-throw-literal": "off",
    "camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
`,
};

export const tsConfig = {
  name: 'tsconfig.json',
  content: `{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "typeRoots": ["./node_modules/@types"],
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "exclude": ["node_modules", "template"],
  "include": ["src/"]
}
`,
};
