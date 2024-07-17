const Banner = () => {
  return (
    <section className="h-[333px] text-center bg-gray-90 mt-20 rounded-3xl">
      <h1 className="pt-16 font-mustica font-semibold leading-[130%] text-gray-0 text-[64px]">
        About KAHLUA
      </h1>
      <div className="pt-8 text-xl leading-[150%]">
        <p className="text-gray-0 font-semibold">매주 월요일은 깔요일!</p>
        <p className="text-gray-40 font-medium">
          매주 월요일에는 깔루아 정기 회의 및 뒷풀이가 있는 날입니다.
          <br />
          정기 모임 외에도 또 어떤 활동들을 할까요?
        </p>
      </div>
    </section>
  );
};

export default Banner;
