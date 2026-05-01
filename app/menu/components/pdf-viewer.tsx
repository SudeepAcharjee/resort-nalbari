"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2 } from "lucide-react";

// Set up the worker for PDF.js - only on client side
if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFViewerProps {
    file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="space-y-4">
            {/* Download Link Only */}
            <div className="flex justify-end mb-8">
                <a 
                    href={file} 
                    download 
                    className="bg-primary text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                >
                    <Download className="w-4 h-4" /> Download Menu
                </a>
            </div>

            {/* PDF Content Area - All pages scrolling */}
            <div className="flex flex-col items-center gap-8 w-full">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex flex-col items-center gap-4 py-20">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px]">Loading Digital Menu...</p>
                        </div>
                    }
                    className="flex flex-col items-center w-full"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <motion.div
                            key={`page_${index + 1}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full flex justify-center bg-white rounded-xl shadow-xl border border-primary/5 overflow-hidden"
                        >
                            <Page 
                                pageNumber={index + 1} 
                                width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 40, 1000) : 1000}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                            />
                        </motion.div>
                    ))}
                </Document>
            </div>
        </div>
    );
}
