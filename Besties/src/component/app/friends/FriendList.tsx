import { Link } from "react-router-dom";
import useSWR from "swr";
import Fetcher from "../../../lib/Fetcher";
import Loader from "../../shared/Loader";
import NotFound from "../../shared/NotFound";

interface FriendData {
  _id?: string;
  id?: string;
  fullname?: string | null;
  email?: string;
  image?: string | null;
}

interface FriendItem {
  _id: string;
  status: string;
  friend: FriendData;
}

const getInitials = (name: string = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

const FriendList = () => {
  const { data, isLoading, error } = useSWR<FriendItem[]>("/friend", Fetcher, {
    shouldRetryOnError: false,
  });

  if (isLoading) return <Loader />;
  if (error || !data) return <NotFound />;

  return (
    <div className="flex flex-col bg-white p-3 flex-1 min-h-0">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 mb-2">
        My Friends List ({data.length})
      </h2>

      <div className="space-y-1 overflow-y-auto max-h-96 pr-1">
        {data.length === 0 && (
          <div className="text-center py-8 text-xs text-gray-400">
            No friends yet. Start connecting!
          </div>
        )}
        {data.map((item) => {
          const friendId = item.friend?.id ?? item.friend?._id ?? item._id;
          const name = item.friend?.fullname || "User";
          const initials = getInitials(name);

          return (
            <div
              key={friendId || item._id}
              className="p-2 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {item.friend?.image ? (
                      <img
                        src={item.friend.image}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate capitalize">
                      {name}
                    </p>
                    <span className="text-[11px] font-medium text-green-500">
                      Active now
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Link
                  to={`/app/chat/${friendId}`}
                  className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                  <i className="ri-chat-3-line text-sm"></i>
                </Link>
                <Link
                  to={`/app/video/${friendId}`}
                  className="inline-flex items-center justify-center w-8 h-8 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                  <i className="ri-video-on-line text-sm"></i>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendList;