import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Output = () => {
  const css = useSelector((state: RootState) => state.css);
  const html = useSelector((state: RootState) => state.html);
  const js = useSelector((state: RootState) => state.js);
  const combinedCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            const log = console.log;
const error = console.error;

console.log = (...args) => {
  parent.postMessage({ type: 'console', method: 'log', args }, '*');
  log(...args); 
};

console.error = (...args) => {
  parent.postMessage({ type: 'console', method: 'error', args }, '*');
  error(...args);
};

            try {
              ${js}
            } catch (e) {
              parent.postMessage(
                { type: 'console', method: 'error', args: [e.toString()] },
                '*'
              );
            }
          </script>
        </body>
      </html>
    `;
  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return <iframe src={iframeCode} className="w-full h-full border" />;
};

export default Output;
