import Image from "next/image";
import Link from "next/link";
import birthday from "../../../public/assets/park.jpeg";

const EventCard = () => {
  return (
    <Link href="/events/1">
      <div>
        <div className="relative">
          <Image className="rounded" src={birthday} alt="birthday" />
          <div className="absolute right-0 top-0 bg-black text-white p-2">
            HOSTING
          </div>
          <div className="absolute right-0 bottom-0 pb-1 pr-2">
            <div className="flex relative">
              <div className="bg-blue-300 rounded-full p-1 text-xs border-white border">
                EK
              </div>
              <div className="bg-red-100 rounded-full p-1 text-xs z-10 border-white border ml-[-4px]">
                FC
              </div>
              <div className="rounded-full bg-gray-200 text-xs p-1 border-transparent ml-0.5 border">
                4+
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="text-black font-semibold">soju night</div>
            <div className="text-[#717171] text-sm">Hosted by Eric Kao</div>
          </div>
          <div>3 Optimal time options</div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
