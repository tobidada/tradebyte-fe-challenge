export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-fixed-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    rootDir: 'src',
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
    },
}