# MREB CLI

**create the project settings with a command**

## Install

```bash
foo@bar:~$ npm i -g mreb-cli
```

## Commands

### Obfuscate

```bash
foo@bar:~$ mreb --obfuscate --source [path] --target [path] [options]
```

> alias mreb -o -s [path] -t [path] [options]

- obfuscate: boolean type
- source: String type => Default src
- target: String Type => Default dist

- Options: What type project to obfuscate
  - js: --js  in case to project only javascript, includes parcel.
  Default --ts, not includes parcel

> Packages used **[parcel](https://www.npmjs.com/package/parcel)** and **[javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator)**

### Create JS

```
.
├── .editorconfig
├── .eslintrc
├── .eslintignore
├── .prettierrc
└── .gitignore
```

```bash
foo@bar:~$  mreb --create --js
```

> alias mreb -c --js

### Create TS

```
.
├── .editorconfig
├── .eslintrc
├── .eslintignore
├── .prettierrc
└── .gitignore
└── tsconfig.json
```


```bash
foo@bar:~$  mreb --create --ts
```

> alias mreb -c --ts

----------

#### Why

Cli developed to create projects from templates

Since i usually start several projects both from javascript, and i don´t want to waste time on the main configurations, feel free to create my cli.

If you help someone of want to collaborate, more than welcome.

Thank you for reading.