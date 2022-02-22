import cx from "classnames";
import Link from "next/link";

interface MenuBottomBarProps {
  title: string;
  icon:
    | "ic-menu-overview"
    | "ic-menu-transaction"
    | "ic-menu-messages"
    | "ic-menu-card"
    | "ic-menu-reward"
    | "ic-menu-setting"
    | "ic-menu-logout";
  active?: boolean;
  href?: string;
}
export default function MenuBottomBar(props: Partial<MenuBottomBarProps>) {
  const { title, icon, active, href = "/" } = props;
  const classItem = cx({
    "menu-item": true,
    active: active,
  });
  return (
    <div className={classItem}>
      <Link href={href}>
        <a>
          <img src={`/icon/${icon}.svg`} alt="" />
          {title}
        </a>
      </Link>
    </div>
  );
}
