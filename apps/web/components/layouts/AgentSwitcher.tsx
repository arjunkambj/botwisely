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
      className="w-auto"
      classNames={{
        base:
          "w-auto min-w-[10rem] md:min-w-[12rem] lg:min-w-[16rem] max-w-[65vw] md:max-w-[40ch] lg:max-w-[48ch]",
        trigger:
          "h-8 min-h-8 px-2 rounded-medium bg-default-100 data-[hover=true]:bg-default-200 border-none focus:outline-none data-[focus=true]:ring-1 data-[focus=true]:ring-default-300 w-auto min-w-[10rem] md:min-w-[12rem] lg:min-w-[16rem] max-w-[65vw] md:max-w-[40ch] lg:max-w-[48ch]",
        value:
          "text-small text-default-700 whitespace-normal md:whitespace-nowrap",
        selectorIcon: "text-default-600",
      }}
      defaultSelectedKeys={["agent-1"]}
      items={agents}
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
            onPress={() => console.log("on create agent")}
          >
            New Agent
          </Button>
        ),
      }}
      placeholder="Select agent"
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <span className="text-tiny text-default-700 whitespace-normal md:whitespace-nowrap">
              {item.data?.label}
            </span>
          </div>
        ));
      }}
      selectorIcon={
        <Icon
          className="text-default-600"
          width={16}
          icon="lucide:chevrons-up-down"
        />
      }
      // Icons removed for a cleaner, text-first selector
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
            <SelectItem
              key={item.value}
              aria-label={item.label}
              textValue={item.label}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <span className="text-small text-default-700">
                  {item.label}
                </span>
              </div>
            </SelectItem>
          )}
        </SelectSection>
      )}
    </Select>
  );
};

export default AgentSwitcher;
