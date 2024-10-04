import { useEffect, useRef, useState } from "react";

const images = [
  {
    name: "img1.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypawLrPf46JE7GOrycKQZugpfYvhP1lTxdCNwD",
    caption: "Retelling \n50 paintings \noil and paste on linen  \n113x170cm (total) \n 2024"
  },
  {
    name: "img2.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lypz8yt3BCaF8RvUCB0tN634gbfqj7HMh1AGlex",
    caption: "Partition \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img3.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyp6GRjPhkicNopfLslVa40TIF7YGeuC53mrjAb",
    caption: "Plain #10  \n  oil and paste om linen \n 180x130cm \n 2023"
  },
  {
    name: "img4.jpeg",
    url: "https://utfs.io/f/eySWb67X0LyppBvWIw3QGO9byLSIco7x01Mhq42gB8dAWHFt",
    caption: "Partition \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img5.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyppif6t3QGO9byLSIco7x01Mhq42gB8dAWHFtv",
    caption: "Partition #2 \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img6.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypXvexFA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",
    caption: "Untitled (partition) #5  \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img7.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lypj2k5TOk8nw1XaegZqAUHVMdKl8cvCm2I0hzD",
    caption: "Untitled (partition) #3 \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img8.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypIFNJiuUmDl5xLJXVEdsPY7nCequg4AfiThHy",
    caption: "Partition #3 \n oil and paste on linen \n 200x120cm \n 2023 \n photography by Django van Ardenne",
  },
  {
    name: "img9.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypXL6ecA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",
    caption: "Partition #7 \n oil and paste on linen \n 200x120cm \n 2023",
  },

  {
    name: "public.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypieWgMLy5aTRAEuq2SwzKC3cUnWH4vDkx9hm0/f/eySWb67X0Lyp7wM0cuo9qJo3RjhHGlD56kBLM4VXZcytWOCg",
    caption: "The Plain \n oil and paste on linen\n 200x480cm \n 2023"
  },
  {
    name: "img11.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypypgHjOxNzB2o8gXUunE9ewIfmHb4RTVax7YA",
    caption: "Plain \n oil and paste on linen\n 180x130cm \n 2023"
  },
  {
    name: "img12.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyp4kUuIhQYhe8gJUBFPw5GRr6MTpWu1zAbSsl0",
    caption: "Untitled (partition) \n oil and paste on linen \n 160x120cm \n 2023"
  },

];

export default function FullscreenImageGrid() {
  const [fullscreenImage, setFullscreenImage] = useState<{ url: string; caption: string } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (fullscreenImage && modalRef.current) {
      modalRef.current.focus();
    }
  }, [fullscreenImage]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setFullscreenImage(null);
    }
  };
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => setFullscreenImage({ url: image.url, caption: image.caption })}
            onKeyDown={(e) => e.key === "Enter" && setFullscreenImage({ url: image.url, caption: image.caption })}
          >
            <img
              src={image.url}
              alt={`Artwork ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
  
        {fullscreenImage && (
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={handleKeyPress}
            onClick={() => setFullscreenImage(null)}
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img
                src={fullscreenImage.url}
                alt="Fullscreen artwork"
                className="w-auto max-w-[90vw] max-h-[90vh] object-contain md:max-w-[70vw] md:max-h-[70vh]"
              />
              <div className="absolute bottom-5 left-5 text-white text-sm sm:text-base md:text-lg">
                {fullscreenImage.caption.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }