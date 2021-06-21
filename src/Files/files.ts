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

export const eslintIgnore = {
  name: '.eslintignore',
  content: `node_modules
dist
build`,
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

export const eslintRcTs = {
  name: '.eslintrc',
  content: `{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "security"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
    "plugin:security/recommended"
  ],
  "rules": {
    "prettier/prettier": "error",
    "no-throw-literal": "off",
    "camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  }
}
`,
};

export const gitIgnore = {
  name: '.gitignore',
  content: `node_modules/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

coverage
.npm
.eslintcache
.env
.cache
dist
build

.dccache
.npmrc
  `
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

export const tsConfig = {
  name: 'tsconfig.json',
  content: `{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "declaration": true,
    "skipLibCheck": true,
    "typeRoots": ["./node_modules/@types"],
    "outDir": "./build",
    "esModuleInterop": true
  },
  "exclude": [
    "node_modules",
    "build",
    "test",
    "**/__tests__/**/*",
    "**/__mocks__/**/*"
  ],
  "include": [
    "src/"
  ]
}
`,
};

export const jestConfig = {
  name: 'jest.config.js',
  content: `/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/'
  ],
  coverageDirectory: '<rootDir>/coverage',
  testMatch: ['**/test/**/*.test.+(ts)'],
  //verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  forceExit: true,
  //testTimeout: 10000
};
  `
}
