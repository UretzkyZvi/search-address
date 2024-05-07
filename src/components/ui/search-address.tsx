"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandLoading } from "cmdk";

interface OSMap {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

interface Address {
  municipality: string;
  state: string;
  "ISO3166-2-lvl4": string;
  country: string;
  country_code: string;
  postcode: string;
  road: string;
  house_number: string;
  town: string;
}

interface SearchAddressProps {
  onSelectLocation: (item: OSMap | null) => void;
}
const SearchAddress: React.FC<SearchAddressProps> = ({
  onSelectLocation
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Record<string, OSMap[]>>({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedItem, setSelectedItem] = useState<OSMap | null>(null);

  const groupByType = (data: OSMap[]): Record<string, OSMap[]> => {
    return data.reduce(
      (acc, item) => {
        const { type } = item;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type]?.push(item);
        return acc;
      },
      {} as Record<string, OSMap[]>,
    );
  };

  const handleSearch = async (value: string) => {
    setQuery(value);
    setLoading(true);
    if (value.length > 2) {
      setTimeout(() => {
        const response = fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${value}&addressdetails=1&layer=address&dedupe=1&limit=5&accept-language=en`,
        );
        response
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response;
          })
          .then((response) => response.json())
          .then((data: OSMap[]) => {
            if (Array.isArray(data)) {
              setResults(groupByType(data));
              setLoading(false);
            } else {
              setResults({}); // Handle cases where data is not as expected
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with your fetch operation:",
              error,
            );
            setResults({});
          });
      }, 300);
    } else {
      setResults({});
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-80 justify-between truncate"
        >
          <p className="truncate">
            {selectedItem
              ? `${selectedItem.display_name} (${selectedItem.type})`
              : "Select place..."}
          </p>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput
            placeholder="Search the place..."
            onValueChange={(value) => handleSearch(value)}
            className="w-full"
          />
          <CommandList>
            {loading ? (
              <CommandLoading>
                <CommandEmpty>Type to search</CommandEmpty>
              </CommandLoading>
            ) : Object.keys(results).length > 0 ? (
              Object.entries(results).map(([type, items]) => (
                <CommandGroup
                  key={type}
                  heading={type.charAt(0).toUpperCase() + type.slice(1)}
                >
                  {items.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item.display_name}
                      onSelect={(currentValue: string) => {
                        const item = results[type]?.find(
                          (item) => item.display_name === currentValue,
                        );
                        setValue(currentValue === value ? "" : currentValue);
                        setSelectedItem(item ?? null);
                        onSelectLocation(item ?? null);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.display_name
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {item.display_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchAddress;
