'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function PdfDropzone() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/main/tab-bib/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const json = await res.json();
      alert('Erfolgreich hochgeladen:\n' + JSON.stringify(json, null, 2));
    } else {
      alert('Fehler beim Hochladen');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="p-8 border-4 border-dashed rounded-lg text-center cursor-pointer hover:border-blue-400 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>PDF hier ablegen…</p>
      ) : (
        <p>Ziehe eine PDF-Datei hierher oder klicke zum Hochladen.</p>
      )}
    </div>
  );
}
