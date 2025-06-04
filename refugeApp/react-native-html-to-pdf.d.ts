// declarations.d.ts

declare module 'react-native-html-to-pdf' {
  interface ConvertOptions {
    html: string;
    fileName?: string;
    directory?: string;
    base64?: boolean;
    width?: number;
    height?: number;
    padding?: number;
    bgColor?: string;
  }

  interface PDFResponse {
    filePath: string;
    base64?: string;
    uri?: string;
  }

  const RNHTMLtoPDF: {
    convert: (options: ConvertOptions) => Promise<PDFResponse>;
  };

  export default RNHTMLtoPDF;
}
