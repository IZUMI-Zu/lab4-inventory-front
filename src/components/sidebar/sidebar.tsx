import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { useLocation } from "react-router-dom";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";

export const SidebarWrapper = () => {
  const location = useLocation();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title="Home">
              <SidebarItem
                title="Inventory Table"
                icon={<HomeIcon />}
                isActive={location.pathname === "/"}
                href="/"
              />
            </SidebarMenu>
            <SidebarMenu title="Inventory Operation">
              <SidebarItem
                isActive={location.pathname === "/inventory"}
                title="Inventory Submit"
                icon={<ViewIcon />}
                href="inventory"
              />
              <SidebarItem
                isActive={location.pathname === "/inventory_read"}
                title="Inventory Read"
                icon={<FilterIcon />}
                href="/inventory_read"
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={location.pathname === "/developers"}
                title="Serial Configuration"
                icon={<DevIcon />}
                href="/developers"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
