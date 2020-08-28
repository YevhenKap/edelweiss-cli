/**
 * Here will be declarations of any files that can be imported
 * to "*.ts" files. You can freely add needed modules as well.
 */

// Images
declare module '*.png' {
  const imagePath: string;
  export default imagePath;
}

declare module '*.jpg' {
  const imagePath: string;
  export default imagePath;
}

declare module '*.jpeg' {
  const imagePath: string;
  export default imagePath;
}

declare module '*.svg' {
  const imagePath: string;
  export default imagePath;
}

// Styles
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
