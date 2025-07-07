import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Указываем путь к воркеру из public
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf/pdf.worker.min.js";
