const {readFileSync} = require('fs');
const {renderFile} = require('template-mate');

const packageVariables = JSON.parse(
  readFileSync('./md-variables.json', 'utf8')
);

const templates = {
  local: 'templates/local.template.md',
  global: 'templates/global.template.md',
  globalPackage: 'templates/globalPackage.template',
};

renderFile({
  templateFile: 'templates/global.template',
  outFile: 'README.md',
  variables: packageVariables,
  templates,
});

Object.keys(packageVariables).forEach((key) => {
  const variables = packageVariables[key];

  renderFile({
    templateFile: 'templates/local.template',
    outFile: `packages/${variables.dir}/README.md`,
    variables,
    templates,
  });
});
