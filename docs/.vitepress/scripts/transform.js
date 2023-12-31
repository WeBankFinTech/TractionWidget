
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

function genComponent(dir) {
    const indexPath = path.join(dir, 'index.md');
    if (!fs.existsSync(indexPath))
        return;

    let fileContent = fs.readFileSync(indexPath, 'utf-8');

    const demos = fs.readdirSync(dir);
    const demoMDStrs = [];
    for (const demoName of demos) {
        const fullPath = path.join(dir, demoName);
        if (fs.statSync(fullPath).isDirectory(fullPath)) {
            const codePath = path.join(fullPath, 'index.vue');
            const textPath = path.join(fullPath, 'index.md');
            const demoContent = [];
            if (fs.existsSync(textPath))
                demoContent.push(fs.readFileSync(textPath, 'utf-8'));

            if (fs.existsSync(codePath)) {
                fs.writeFileSync(
                    `${fullPath}.vue`,
                    fs.readFileSync(codePath, 'utf-8'),
                );
                demoContent.push(`--${demoName.toLocaleUpperCase()}`);
            }
            if (
                demoContent.length
                && fileContent.includes(`PREVIEW_${demoName.toLocaleUpperCase()}`)
            ) {
                fileContent = fileContent.replace(
                    `PREVIEW_${demoName.toLocaleUpperCase()}`,
                    demoContent.join('\n\n'),
                );
            } else {
                demoMDStrs.push(...demoContent);
            }

            fse.removeSync(fullPath);
        }
    }

    demoMDStrs.push('--CODE');

    fs.writeFileSync(
        indexPath,
        fileContent.replace('PREVIEW_CODE', demoMDStrs.join('\n\n')),
    );
}

function genComponents(src) {
    const components = fs.readdirSync(src);
    for (const name of components)
        genComponent(path.join(src, name), name);
}

(() => {
    const src = path.join(process.cwd(), './docs/.vitepress/components');
    genComponents(src);
})();
