import type { FC, Dispatch, SetStateAction } from "react";
import { useState, useContext } from "react";
import Context from "../Context";
import HttpInterceptor from "../lib/HttpInterceptor";
import { mutate } from "swr";
import Form from "../component/shared/Form";
import Input from "../component/shared/Input";
import Button from "../component/shared/Button";

interface EditProfileModalProps {
  onClose: () => void;
}

interface SessionType {
  fullname?: string;
  email?: string;
}

interface AppContextType {
  session?: SessionType;
  setSession: Dispatch<SetStateAction<SessionType | undefined>>;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ onClose }) => {
  const { session, setSession } = useContext(Context) as AppContextType;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    setMessage(null);
    try {
      const { data: updatedUser } = await HttpInterceptor.put(
        "/auth/profile",
        {
          fullname: values.fullname,
          email: values.email,
          bio: values.bio,
        },
      );

      setSession({
        ...session,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
      });

      mutate("/auth/refresh-token");
      setMessage({
        type: "success",
        text: "Profile details updated successfully!",
      });
      setTimeout(() => onClose(), 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to save updates.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col p-5 space-y-4 animate-scale-up">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
            <i className="ri-user-settings-line text-blue-500"></i> Account
            Configuration
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <i className="ri-close-circle-fill text-xl"></i>
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"}`}>
            {message.text}
          </div>
        )}

        <Form className="space-y-4 flex flex-col" onValue={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Full Display Name
            </label>
            <Input name="fullname" placeholder="Enter full name" type="text" />
            <span className="text-[11px] text-slate-400 block pl-1">
              Current: {session?.fullname}
            </span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address Connection
            </label>
            <Input
              name="email"
              placeholder="Enter email address"
              type="email"
            />
            <span className="text-[11px] text-slate-400 block pl-1">
              Current: {session?.email}
            </span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Short Bio / Status
            </label>
            <Input
              name="bio"
              placeholder="Write a short summary about yourself"
              type="text"
            />
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-xl cursor-pointer">
              Discard Changes
            </button>
            <Button
              type="primary"
              loading={loading}
              className="text-xs py-2 px-4 rounded-xl font-bold h-9">
              Save Account Updates
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileModal;
