const {readFileSync} = require('fs');
const {renderFile} = require('template-mate');
const YAML = require('yaml');

// eslint-disable-next-line max-len
const DO_NOT_EDIT_PREFIX = '<!-- DO NOT EDIT THIS FILE! THIS FILE WAS AUTOGENERATED BY TEMPLATE-MATE -->\n<!-- SEE https://github.com/angus-c/just/blob/master/CONTRIBUTING.md#readme-template -->\n\n';

const packageVariables = YAML.parse(
  readFileSync('./packages.yml', 'utf8')
);

Object.entries(packageVariables).forEach(([name, data]) => {
  packageVariables[name].examples = data.examples.trim();
  packageVariables[name].description = data.description.trim();
});

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
  prefix: DO_NOT_EDIT_PREFIX,
});

Object.keys(packageVariables).forEach(key => {
  const variables = packageVariables[key];

  renderFile({
    templateFile: 'templates/local.template',
    outFile: `packages/${variables.dir}/README.md`,
    variables,
    templates,
    prefix: DO_NOT_EDIT_PREFIX,
  });
});
