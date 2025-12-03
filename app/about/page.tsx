import Banner from '@/components/about/Banner';
import Concert from '@/components/about/Concert';
import Ensemble from '@/components/about/Ensemble';
import Networking from '@/components/about/Networking';
import Travel from '@/components/about/Travel';

const page = () => {
  return (
    <div className="font-pretendard relative mx-auto w-full pad:w-[786px] dt:w-[1200px] h-auto flex flex-col justify-center">
      <Banner />
      <Ensemble />
      <Concert />
      <Networking />
      <Travel />
    </div>
  );
};

export default page;
