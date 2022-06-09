import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

export default function Animation({ name }) {
  const ref = useRef(null);

  // const [lottie, setLottie] = useState(null);

  // useEffect(() => {
  //   lottieWeb.then((Lottie) => setLottie(Lottie.default));
  //   // import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  // }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: '/media/animations/' + name + '.json',
      });

      return () => animation.destroy();
    }
  }, [name]);

  return <div ref={ref} />;
}
