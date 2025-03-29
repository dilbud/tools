const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const processJavaFile = (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n");

    let currentPackage = "";
    let currentClass = "";
    const methods = [];

    lines.forEach((line) => {
        line = line.trim();

        // Match package declaration
        if (line.startsWith("package ")) {
            const match = line.match(/package\s+([\w.]+);/);
            if (match) currentPackage = match[1];
        }

        // Match class declarations
        if (line.startsWith("class ") || line.startsWith("public class ")) {
            const match = line.match(/class (\w+)/);
            if (match) currentClass = match[1];
        }

        // Match method declarations
        if (
            line.match(/public\s+(static|final)?\s*\w+\s+\w+\s*\(.*\)/) ||
            line.match(/private\s+(static|final)?\s*\w+\s+\w+\s*\(.*\)/) ||
            line.match(/protected\s+(static|final)?\s*\w+\s+\w+\s*\(.*\)/)
        ) {
            const match = line.match(/\w+\s*\(/); // Extract the method name
            console.log(match)
            if (match) methods.push(match[0].slice(0, -1));
        }
    });

    // Return package, class, and its methods
    return { package: currentPackage, class: currentClass, methods };
};

glob("./src/main/java/**/*.java").then((files) => {
    console.log(files);

    const classMethodsMap = {};

    files.forEach((filePath) => {
        const { package: packageName, class: className, methods } = processJavaFile(filePath);
        console.log(packageName, className, methods)

        if (!classMethodsMap[`${packageName}.${className}`]) {
            classMethodsMap[`${packageName}.${className}`] = [];
        }

        classMethodsMap[`${packageName}.${className}`] = classMethodsMap[`${packageName}.${className}`].concat(methods);
    });

    // Construct the formatted output string
    const output = Object.entries(classMethodsMap)
        .map(([classPath, methods]) => `${classPath}[${methods.join(",")}]`)
        .join(";");

    console.log("Formatted Output:");
    console.log(output);
});
