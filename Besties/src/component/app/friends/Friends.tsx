import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

import Card from "../../shared/Card";
import Button from "../../shared/Button";
import Fetcher from "../../../lib/Fetcher";
import Loader from "../../shared/Loader";
import NotFound from "../../shared/NotFound";
import HttpInterceptor from "../../../lib/HttpInterceptor";
import Context from "../../../Context";

interface FriendDataInterface {
  id?: string;
  _id?: string;
  fullname?: string | null;
  email?: string;
  image?: string | null;
}

interface FriendInterface {
  _id: string;
  id?: string;
  status: string;
  friend: FriendDataInterface;
}

const getFriendId = (item: FriendInterface) =>
  item.friend.id ?? item.friend._id ?? item.id;

const Friends = () => {
  const navigate = useNavigate();
  const {
    data: friendsList,
    isLoading,
    error,
    mutate,
  } = useSWR<FriendInterface[]>("/friend", Fetcher);
  const { setLiveActiveSession } = useContext(Context);

  const uniqueFriends = useMemo(() => {
    const map = new Map<string, FriendInterface>();

    friendsList?.forEach((item) => {
      const friendId = getFriendId(item);
      const key = friendId || item.friend.email || item._id;

      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    return Array.from(map.values());
  }, [friendsList]);

  if (isLoading) return <Loader />;
  if (error || !friendsList) return <NotFound />;

  const unfriend = async (id: string) => {
    try {
      await HttpInterceptor.delete(`/friend/${id}`);
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Connections ({uniqueFriends.length})
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {uniqueFriends.map((item) => {
          const friendId = getFriendId(item);
          const friendSession = {
            ...item.friend,
            id: friendId,
            _id: friendId,
            status: "Offline",
          };
          const initials =
            item.friend.fullname
              ?.trim()
              .split(/\s+/)
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2) || "??";

          return (
            <Card
              key={friendId || item._id}
              className="hover:shadow-md transition-shadow border border-gray-100 bg-white relative">
              {/* Profile info button - top right */}
              <button
                type="button"
                onClick={() => navigate(`/app/profile/${friendId}`)}
                className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 flex items-center justify-center transition-all border border-gray-100"
                title="View Profile">
                <i className="ri-information-line text-base" />
              </button>
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm mb-3">
                  {item.friend.image ? (
                    <img
                      src={item.friend.image}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <h3 className="text-sm font-bold text-gray-800 capitalize truncate w-full mb-0.5">
                  {item.friend.fullname || "User Profile"}
                </h3>
                <p className="text-xs text-gray-400 truncate w-full mb-4">
                  {item.friend.email}
                </p>

                {item.status === "accepted" && (
                  <div className="flex items-center gap-2 mb-4 w-full justify-center">
                    <Link
                      to={friendId ? `/app/chat/${friendId}` : "/app/friends"}
                      state={{ user: friendSession }}
                      onClick={() => setLiveActiveSession(friendSession)}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 flex items-center justify-center transition-all border border-gray-100"
                      title="Chat">
                      <i className="ri-chat-3-line text-base" />
                    </Link>
                    <Link
                      to={friendId ? `/app/audio/${friendId}` : "/app/friends"}
                      state={{ user: friendSession }}
                      onClick={() => setLiveActiveSession(friendSession)}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 flex items-center justify-center transition-all border border-gray-100"
                      title="Voice Call">
                      <i className="ri-phone-line text-base" />
                    </Link>
                    <Link
                      to={friendId ? `/app/video/${friendId}` : "/app/friends"}
                      state={{ user: friendSession }}
                      onClick={() => setLiveActiveSession(friendSession)}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 flex items-center justify-center transition-all border border-gray-100"
                      title="Video Call">
                      <i className="ri-vidicon-line text-base" />
                    </Link>
                  </div>
                )}

                {item.status === "accepted" ? (
                  <Button
                    type="danger"
                    icon="user-minus-line"
                    className="w-full text-xs py-2 rounded-xl justify-center font-bold shadow-none border border-rose-100 transition-all h-9"
                    onClick={() => unfriend(item._id)}>
                    Unfriend
                  </Button>
                ) : (
                  <div className="w-full text-center text-xs font-bold text-gray-400 py-2 bg-gray-50 border border-gray-100 rounded-xl capitalize">
                    {item.status}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
