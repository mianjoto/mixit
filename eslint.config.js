import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

const config = [
    {
        ignores: [
            "dist/**/*.ts",
            "dist/**",
            "**/*.mjs",
            "eslint.config.mjs",
            "**/*.js",
        ],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    pluginReact.configs.flat?.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: { globals: globals.browser },
        rules: {
            // suppress errors for missing 'import React' in files since Next automatically imports
            "react/react-in-jsx-scope": "off",
        },
    },
    prettier,
];

export default config;
