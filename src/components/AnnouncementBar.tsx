import Image from "next/image";
import anl from './images/anl.webp'

const AnnouncementBar = () => {
  return (
    <div className=" hidden bg-[#DA0428] py-1 overflow-hidden md:flex items-center ">
      <div className="relative w-full ">
        <div className="flex flex-row whitespace-nowrap animate-announcement text-white text-3sm  ">
            <span> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
          
            <span className=" flex mr-4 items-center text-primary-foreground  font-medium">
          <Image
           src={anl}
           className=" h-3 w-3 ml-4 mr-4 mt-1"
           alt=""
          /> Great Taste since 1937
          </span>

          <span className="flex mr-4  items-center text-primary-foreground  font-medium">
                <Image
           src={anl}
           className=" h-3 w-3 ml-4 mr-4 mt-1"
           alt=""
          />  Evolving with India's tastes to deliver the finest Flavours
          </span>

          <span className="flex  mr-4 items-center text-primary-foreground  font-medium">
                <Image
           src={anl}
           className=" h-3 w-3 ml-4 mr-4 mt-1"
           alt=""
          />  Great News! From 22nd Sept 2025, many of your Haldirams favourites just got more
            pocket-friendly with revised GST rate. We are passing the savings straight to you.
            Enjoy more, spend less!
          </span>
        

          
        
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
