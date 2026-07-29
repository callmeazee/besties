// import useSWR, { mutate } from "swr";
// import Fetcher from "../../../lib/Fetcher";

// import { Empty, Skeleton } from "antd";
// import NotFound from "../../shared/NotFound";
// import Button from "../../shared/Button";
// import CatchError from "../../../lib/CatchError";
// import HttpInterceptor from "../../../lib/HttpInterceptor";
// import { useState } from "react";
// import moment from "moment";
// import { toast } from "react-toastify";

// interface LoadingInterface {
//   state: boolean;
//   index: null | number;
// }

// const FriendSuggestion = () => {
//   //jab bhi button loops me ho aur hume loading handle krna ho single single buttons pr to hum object bana kr id ke saath saath index bhi bhejhte h track krne ke liye
//   const [loading, setLoading] = useState<LoadingInterface>({
//     state: false,
//     index: null,
//   });
//   const { data, error, isLoading } = useSWR("/friend/suggestion", Fetcher, {
//     shouldRetryOnError: false,
//     revalidateOnFocus: false,
//   });

//   if (error) return <div>{<NotFound />}</div>;
//   if (!data) return <div>{<Skeleton active />}</div>;
//   if (isLoading) return <div>{<Skeleton active />}</div>;

//   const sendFriendRequest = async (id: string, index: number) => {
//     try {
//       setLoading({ state: true, index });
//       await HttpInterceptor.post("/friend", { friend: id });
//       toast.success("Friend request sent !", { position: "top-center" });
//       mutate("/friend/suggestion");
//       mutate("/friend");
//     } catch (err) {
//       CatchError(err);
//     } finally {
//       setLoading({ state: false, index: null });
//     }
//   };

//   return (
//     <div className="pt-1.5 pb-4 px-4 shrink-0 transition-all duration-300">
//       <div className="flex items-center justify-between mb-3.5">
//         <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
//           Suggested Friends
//         </h2>

//         {/* <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
//           See All
//           </button> */}
//       </div>
//       <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x">
//         {data &&
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           data.map((item: any, idx: number) => (
//             <div
//               key={idx}
//               className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center min-w-27.5 snap-start hover:shadow-sm transition-shadow">
//               <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mb-2 shadow-sm object-cover">
//                 {item.image ? (
//                   <img
//                     src={item.image}
//                     alt={item.fullname}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 ) : (
//                   item.fullname
//                     .trim()
//                     .split(/\s+/)
//                     .map((w: string) => w[0])
//                     .join("")
//                     .toUpperCase()
//                 )}
//               </div>
//               <h4 className="text-xs font-bold text-slate-700 truncate w-full max-w-22.5 capitalize">
//                 {item.fullname}
//               </h4>
//               <p className="text-[10px] text-slate-400 mb-2 truncate w-full max-w-22.5">
//                 {/* Mutual friend  */}
//                 {`Joined at ${moment(item.createdAt).format("DD MMM YY")}`}
//               </p>
//               <Button
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors w-full cursor-pointer flex items-center justify-center gap-1"
//                 icon="user-add-line "
//                 loading={loading.state && loading.index === idx}
//                 onClick={() => sendFriendRequest(item._id, idx)}>
//                 Add
//               </Button>
//             </div>
//           ))}
//       </div>
//       {data && data.length === 0 && (
//         <Empty description="No friends to suggest." />
//       )}
//     </div>
//   );
// };

// export default FriendSuggestion;

import useSWR, { mutate } from "swr";
import Fetcher from "../../../lib/Fetcher";
import { Empty, Skeleton } from "antd";
import NotFound from "../../shared/NotFound";
import Button from "../../shared/Button";
import HttpInterceptor from "../../../lib/HttpInterceptor";
import { useState } from "react";
import CatchError from "../../../lib/CatchError";
import { toast } from "react-toastify";

interface LoadingInterface {
  state: boolean;
  index: null | number;
}

interface FriendSuggestionItem {
  _id: string;
  fullname: string;
  image?: string | null;
}

const FriendSuggestion = () => {
  //jab bhi button loops me ho aur hume loading handle krna ho single single buttons pr to hum object bana kr id ke saath saath index bhi bhejhte h track krne ke liye
  const [loading, setLoading] = useState<LoadingInterface>({
    state: false,
    index: null,
  });
  const { data, error, isLoading } = useSWR("/friend/suggestion", Fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  if (error)
    return (
      <div className="p-4">
        <NotFound />
      </div>
    );
  if (isLoading || !data)
    return (
      <div className="p-4">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    );

  const sendFriendRequest = async (id: string, index: number) => {
    try {
      setLoading({ state: true, index });
      await HttpInterceptor.post("/friend", { friend: id });
      toast.success("Friend request sent !", { position: "top-center" });
      mutate("/friend/suggestion");
      mutate("/friend");
    } catch (err) {
      CatchError(err);
    } finally {
      setLoading({ state: false, index: null });
    }
  };

  return (
    <div className="p-3 bg-white flex flex-col">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
        People You May Know
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {data &&
          data.map((item: FriendSuggestionItem, idx: number) => {
            const initials = item.fullname
              .trim()
              .split(/\s+/)
              .map((w: string) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            return (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-1.5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <h4 className="text-xs font-bold text-gray-700 truncate w-full capitalize mb-2">
                  {item.fullname}
                </h4>

                <Button
                  type="secondary"
                  className="text-[10px] py-1 px-2 rounded-md w-full justify-center h-7"
                  icon="user-add-line"
                  loading={loading.state && loading.index === idx}
                  onClick={() => sendFriendRequest(item._id, idx)}>
                  Connect
                </Button>
              </div>
            );
          })}
      </div>
      {data.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No new suggestions"
        />
      )}
    </div>
  );
};

export default FriendSuggestion;
