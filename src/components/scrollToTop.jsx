import { useEffect } from 'preact/hooks';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}


export default ScrollToTopOnMount;