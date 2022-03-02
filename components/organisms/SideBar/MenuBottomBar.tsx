import cx from "classnames";
import Link from "next/link";
import Image from "next/image";

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
          {active ? (
            <Image src={`/icon/${icon}-active.svg`} width={25} height={25} />
          ) : (
            <Image src={`/icon/${icon}.svg`} width={25} height={25} />
          )}
          {title}
        </a>
      </Link>
    </div>
  );
}
