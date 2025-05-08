import React from "react";

import Preview from "@/components/Preview";

interface PreviewsProps {
  tetrominoes: any[];
}

const Previews: React.FC<PreviewsProps> = ({ tetrominoes }) => {
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);