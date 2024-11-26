import { Collections, SortDirection, SortMethod } from "~/popup/components/TopBar/Toolbar/Actions";
import { OriginWebsites } from "~/popup/components/TopBar/Toolbar/Actions/OriginWebsites";

export const Toolbar = () => {
  return (
    <div className="flex h-full">
      <SortMethod />
      <SortDirection />
      <OriginWebsites />
      <Collections />
    </div>
  );
};
