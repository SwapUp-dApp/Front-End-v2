const A="data:image/webp;base64,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";export{A as default};
