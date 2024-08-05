import Divider from '@/components/Divider';
import DoctrinalLines from '@/containers/about-us-page/doctrinal-lines-section';
import HeroSection from '@/containers/about-us-page/hero-section';

export default function AboutUs() {
  return (
    <main>
      <HeroSection />
      <Divider className='mx-auto max-w-60 md:max-w-[30rem]' />
      <DoctrinalLines />
    </main>
  );
}
