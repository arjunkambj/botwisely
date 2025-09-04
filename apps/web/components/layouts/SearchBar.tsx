"use client";

import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback, useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <Input
      aria-label="Search agents & knowledge"
      placeholder="Search agents & knowledge…"
      size="sm"
      value={value}
      onChange={onChange}
      variant="flat"
      radius="sm"
      startContent={<Icon icon="solar:magnifier-linear" width={16} className="text-default-500" />}
      classNames={{
        inputWrapper:
          "h-8 min-h-8 bg-default-100 data-[hover=true]:bg-default-200 border-none",
        input: "text-small",
      }}
    />
  );
}

