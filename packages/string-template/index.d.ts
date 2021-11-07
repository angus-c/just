type TemplateMap = {
  [key: string]: TemplateMap | string;
};

declare function template(string: string, templateMap: TemplateMap): string;
export default template;
