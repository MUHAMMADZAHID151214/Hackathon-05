import Image from "next/image";

export default function Rooms() {
  return (
    <>
      <h1 className="text-[32px] font-bold text-center mt-20">
        50+ Beautiful rooms inspiration
      </h1>
      <p className="text-center">
        Our designer already made a lot of beautiful prototypes of rooms that
        inspire you.
      </p>
      <div className="flex flex-wrap items-center justify-center mt-16 gap-8">
        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img3.png"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>

        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img7.jpg"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>
        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img5.png"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-16 gap-8">
        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img1.png"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>

        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img4.jpg"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>
        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img6.png"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-16 gap-8">
        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img2.png"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>
        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img9.jpg"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>

        <div className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]">
          <Image
            src="/images/img3.png"
            alt="last-1"
            width={381}
            height={480}
            className="max-w-[100%] h-auto"
          />
        </div>
      </div>
    </>
  );
}
