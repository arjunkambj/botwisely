"use client";

import { Button } from "@heroui/react";
import { Select, SelectSection, SelectItem, Input } from "@heroui/react";
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
    <div className="flex flex-col gap-y-2">
      <Select
        disableSelectorIconRotation
        aria-label="Select workspace"
        className="px-1"
        classNames={{
          trigger:
            "min-h-12 bg-transparent border-small border-default-200 dark:border-default-100 data-[hover=true]:border-default-500 dark:data-[hover=true]:border-default-200 data-[hover=true]:bg-transparent",
        }}
        defaultSelectedKeys={["1"]}
        items={workspaces}
        listboxProps={{
          bottomContent: (
            <Button
              className="bg-default-100 text-foreground text-center"
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
            <div key={item.key} className="ml-1 flex flex-row gap-x-10">
              <span className="text-tiny leading-4">Acme Inc.</span>
              <span className="text-tiny text-default-400">
                {item.data?.label}
              </span>
            </div>
          ));
        }}
        selectorIcon={
          <Icon
            color="hsl(var(--heroui-default-500))"
            icon="lucide:chevrons-up-down"
          />
        }
        startContent={
          <div className="border-small border-default-300 relative h-8 w-8 flex-none rounded-full">
            <Icon
              className="text-default-500 mt-2 ml-2"
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
          >
            {/* @ts-ignore */}
            {(item) => (
              <SelectItem
                key={item.value}
                aria-label={item.label}
                textValue={item.label}
              >
                <div className="flex flex-row items-center justify-between gap-1">
                  <span>{item.label}</span>
                  <div className="border-small border-default-300 flex h-6 w-6 items-center justify-center rounded-full">
                    <Icon
                      className="text-default-500"
                      icon="solar:users-group-rounded-linear"
                      width={16}
                    />
                  </div>
                </div>
              </SelectItem>
            )}
          </SelectSection>
        )}
      </Select>
    </div>
  );
};
