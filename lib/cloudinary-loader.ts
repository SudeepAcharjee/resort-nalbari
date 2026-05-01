export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const params = [
    `f_auto`,
    `c_limit`,
    `w_${width}`,
    `q_${quality || 'auto'}`
  ];
  
  // If the src is already a full Cloudinary URL, we can inject the params
  if (src.includes('res.cloudinary.com')) {
    // Basic replacement to inject optimization params after /upload/
    return src.replace('/upload/', `/upload/${params.join(',')}/`);
  }
  
  return src;
}
