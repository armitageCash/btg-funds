/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Ajusta esto según tu estructura de carpetas
  },
  transform: {
    "^.+\\.ts$": "ts-jest", // Transforma archivos TypeScript
  },
  roots: ["<rootDir>/__tests__"],
};

module.exports = config;
