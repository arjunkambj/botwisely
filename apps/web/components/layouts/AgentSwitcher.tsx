"use client";

import { Button, Select, SelectItem, SelectSection } from "@heroui/react";
import { Icon } from "@iconify/react";

const agents = [
  {
    value: "org-0",
    label: "Acme Inc.",
    items: [
      { value: "agent-1", label: "Default Agent" },
      { value: "agent-2", label: "Sales Assistant" },
      { value: "agent-3", label: "Support Bot" },
      { value: "agent-4", label: "Analytics Bot" },
    ],
  },
];

export const AgentSwitcher = () => {
  return (
    <Select
      size="sm"
      radius="sm"
      variant="flat"
      disableSelectorIconRotation
      aria-label="Select agent"
      className="max-w-xs"
      classNames={{
        trigger:
          "h-8 min-h-8 px-2 rounded-medium bg-default-100 data-[hover=true]:bg-default-200 border-none",
        value: "text-small",
      }}
      defaultSelectedKeys={["agent-1"]}
      items={agents}
      listboxProps={{
        bottomContent: (
          <Button
            className="bg-default-100 text-foreground text-center"
            size="sm"
            onPress={() => console.log("on create agent")}
          >
            New Agent
          </Button>
        ),
      }}
      placeholder="Select agent"
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="ml-1 flex items-center gap-2 truncate">
            <span className="hidden text-tiny text-default-500 sm:inline">Agent</span>
            <span className="text-tiny text-default-600 truncate">
              {item.data?.label}
            </span>
          </div>
        ));
      }}
      selectorIcon={<Icon className="text-default-500" width={16} icon="lucide:chevrons-up-down" />}
      startContent={
        <div className="border-small border-default-300 relative h-6 w-6 flex-none rounded-full bg-default-100">
          <Icon className="text-default-500 absolute left-1.5 top-1.5" icon="solar:bot-linear" width={14} />
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
            <SelectItem key={item.value} aria-label={item.label} textValue={item.label}>
              <div className="flex flex-row items-center justify-between gap-2">
                <span className="text-small">{item.label}</span>
                <div className="border-small border-default-300 flex h-6 w-6 items-center justify-center rounded-full">
                  <Icon className="text-default-500" icon="solar:bot-linear" width={16} />
                </div>
              </div>
            </SelectItem>
          )}
        </SelectSection>
      )}
    </Select>
  );
};

export default AgentSwitcher;
