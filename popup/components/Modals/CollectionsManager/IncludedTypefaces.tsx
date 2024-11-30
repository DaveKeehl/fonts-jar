import type { TypefaceTuple } from "~/types/typeface";

type Props = {
  typefaces: string[];
  favorites: TypefaceTuple[];
};

export const IncludedTypefaces = ({ typefaces, favorites }: Props) => {
  const joinedNames = typefaces
    .map((slug) => {
      const typeface = favorites.find((favorite) => favorite[0] === slug);
      if (typeface) return typeface[1].family;
      return slug;
    })
    .join(", ");

  return (
    <p className="truncate-custom leading-4 text-greyscale-600">
      {typefaces.length === 0 ? "No fonts added" : joinedNames}
    </p>
  );
};
