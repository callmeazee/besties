import type { FC, ReactNode } from "react";

interface avatarInterface {
  title?: string | null;
  subtitle?: ReactNode;
  image?: string;
  titleColor?: string;
  subtitleColor?: string;
  size?: "lg" | "md";
  key?: string | number;
  onClick?: () => void;
}

const Avatar: FC<avatarInterface> = ({
  image,
  title,
  subtitle = "subtitle is missing",
  titleColor,
  size = "lg",
  subtitleColor,
  key,
  onClick,
}) => {
  return (
    <div className="flex gap-3 items-center" key={key}>
      {image && (
        <img
          src={image}
          className={`${size === "lg" ? "w-12 h-12" : "w-10 h-10 "}
            rounded-full
            border-2
            border-white/60
            object-cover
            shrink-0`}
          onClick={onClick}
        />
      )}
      {title && subtitle && (
        <div className="flex flex-col">
          <h1
            className={`$ ${size === "lg" ? "text-lg/6" : "text-sm"}
            font-medium
            capitalize`}
            style={{ color: titleColor }}>
            {title}
          </h1>
          <div className="text-sm" style={{ color: subtitleColor }}>
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
