"use client";

import { Button } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const workspaces = [
  {
    value: "0",
    label: "Acme Inc.",
    items: [
      {
        value: "1",
        label: "Core workspace",
      },
      {
        value: "2",
        label: "Design workspace",
      },
      {
        value: "3",
        label: "Dev. workspace",
      },
      {
        value: "4",
        label: "Marketing workspace",
      },
    ],
  },
];

export const OrgSwitcher = () => {
  return (
    <Select
      size="sm"
      radius="sm"
      variant="flat"
      disableSelectorIconRotation
      aria-label="Select workspace"
      className="max-w-xs"
      classNames={{
        trigger:
          "h-8 min-h-8 px-2 rounded-medium bg-default-100 data-[hover=true]:bg-default-200 border-none focus:outline-none data-[focus=true]:ring-1 data-[focus=true]:ring-default-300",
        value: "text-small text-default-700",
        selectorIcon: "text-default-600",
      }}
      defaultSelectedKeys={["1"]}
      items={workspaces}
      listboxProps={{
        itemClasses: {
          base: "min-h-10 h-10",
          title: "text-small text-default-700",
        },
        bottomContent: (
          <Button
            className="w-full"
            variant="flat"
            color="default"
            size="sm"
            onPress={() => console.log("on create workspace")}
          >
            New Workspace
          </Button>
        ),
      }}
      placeholder="Select workspace"
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="ml-1 flex items-center gap-2 truncate">
            <span className="hidden text-tiny text-default-500 sm:inline">Acme</span>
            <span className="text-tiny text-default-600 truncate">
              {item.data?.label}
            </span>
          </div>
        ));
      }}
      selectorIcon={<Icon className="text-default-600" width={16} icon="lucide:chevrons-up-down" />}
      startContent={
        <div className="border-small border-default-200 relative h-6 w-6 flex-none rounded-full bg-default-100">
          <Icon
            className="text-default-600 absolute left-1.5 top-1.5"
            icon="solar:users-group-rounded-linear"
            width={16}
          />
        </div>
      }
    >
      {(section) => (
        <SelectSection
          key={section.value}
          hideSelectedIcon
          showDivider
          aria-label={section.label}
          items={section.items}
          title={section.label}
          classNames={{
            base: "px-1",
            heading:
              "px-2 py-1 text-tiny uppercase tracking-wide text-default-400",
            group: "gap-1",
          }}
      >
        {(item) => (
            <SelectItem key={item.value} aria-label={item.label} textValue={item.label}>
              <div className="flex flex-row items-center justify-between gap-2">
                <span className="text-small text-default-700">{item.label}</span>
                <div className="border-small border-default-200 flex h-6 w-6 items-center justify-center rounded-full bg-default-100">
                  <Icon className="text-default-600" icon="solar:users-group-rounded-linear" width={16} />
                </div>
              </div>
            </SelectItem>
          )}
        </SelectSection>
      )}
    </Select>
  );
};
