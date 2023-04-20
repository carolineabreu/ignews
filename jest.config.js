module.exports = {
  testIgnorePatterns: ["/node_modules", "/.next/"],
  setupFilesAfterEnv: [
    // array de arquivos para o jest executar antes de executar os testes
    "<rootDir>/src/tests/setupTests.ts",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    // regex: ^ inicio arquivo, . qualquer carácter, + normalmente usado depois de um ponto ou algo assim, ou seja, eu tenho um ou mais do . , \\ para escapar porque o ponto seguinte é das extensões do arquivo
  },
  testEnvironment: "jsdom", // indica em que ambiente os testes estão executando, jsdom vai criar uma representação da dom em js
};
