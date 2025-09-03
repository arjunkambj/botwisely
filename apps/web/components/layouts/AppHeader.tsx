import UserProfile from "../shared/UserProfile";
import { OrgSwitcher } from "./OrgSwitcher";
import { AcmeIcon } from "../shared/Logo";

export default function AppHeader() {
  return (
    <div className="flex w-full bg-content2 py-2 px-4 justify-between items-center">
      <div className="flex items-center gap-2">
        <AcmeIcon />
      </div>
      <div className="flex items-center gap-2">
        <OrgSwitcher />
        <UserProfile />
      </div>
    </div>
  );
}
