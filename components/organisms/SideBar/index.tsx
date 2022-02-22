import Footer from "./Footer";
import Profile from "./Profile";
import MenuItem from "./MenuItem";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import MenuBottomBar from "./MenuBottomBar";

interface SideBarProps {
  activeMenu: "overview" | "transactions" | "settings";
}
export default function SideBar(props: SideBarProps) {
  const router = useRouter();
  const { activeMenu } = props;

  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/sign-in");
  };
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Overview"
            icon="ic-menu-overview"
            active={activeMenu === "overview"}
            href="/member"
          />
          <MenuItem
            title="Transactions"
            icon="ic-menu-transaction"
            active={activeMenu === "transactions"}
            href="/member/transactions"
          />
          <MenuItem title="Messages" icon="ic-menu-messages" href="/member" />
          <MenuItem title="Card" icon="ic-menu-card" href="/member" />
          <MenuItem title="Rewards" icon="ic-menu-reward" href="/member" />
          <MenuItem
            title="Settings"
            icon="ic-menu-setting"
            active={activeMenu === "settings"}
            href="/member/edit-profile"
          />
          <MenuItem title="Log Out" icon="ic-menu-logout" onClick={onLogOut} />
        </div>
        <Footer />
      </div>

      {/* Mobile View */}
      <div className="bottom-bar">
        <div className="wrapper">
          <MenuBottomBar
            active={activeMenu === "overview"}
            title="Overview"
            href="/member"
            icon="ic-menu-overview"
          ></MenuBottomBar>
          <MenuBottomBar
            active={activeMenu === "transactions"}
            title="Transaction"
            href="/member/transactions"
            icon="ic-menu-transaction"
          ></MenuBottomBar>
          <MenuBottomBar
            active={activeMenu === "settings"}
            title="Setting"
            href="/member/edit-profile"
            icon="ic-menu-setting"
          ></MenuBottomBar>
          <MenuBottomBar
            title="Top Up"
            href="/"
            icon="ic-menu-card"
          ></MenuBottomBar>
        </div>
      </div>
    </section>
  );
}
