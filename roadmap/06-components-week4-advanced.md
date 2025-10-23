# Phase 6: Advanced Components (Week 4)

**Duration:** 18-24 hours
**Dependencies:** None (can run independently)
**Agent-Ready:** ✅ Yes (7 independent tasks)
**Priority:** High

---

## 🎯 Objectives

Build 7 advanced, enterprise-grade components that complete the UI library:

1. **FileUpload** - Drag-and-drop file upload with preview
2. **MultiSelect** - Multi-selection combobox with tags
3. **Carousel** - Image/content carousel with navigation
4. **Rating** - Star rating input component
5. **Tree** - Hierarchical tree view with expand/collapse
6. **ContextMenu** - Right-click context menus (already in Phase 5, but enhanced here)
7. **ScrollArea** - Custom scrollbar styling

**Target:** Production-ready, complex components with animations and advanced features.

---

## 📦 Component 1: FileUpload

### Overview
Drag-and-drop file upload component with preview, progress, and validation.

**File:** `packages/ui/src/components/ui/file-upload.tsx`

**Dependencies:**
```bash
pnpm add react-dropzone
```

### Implementation

```typescript
"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface FileWithPreview extends File {
  preview?: string;
}

export interface FileUploadProps {
  value?: FileWithPreview[];
  onChange?: (files: FileWithPreview[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
  disabled?: boolean;
  showPreview?: boolean;
  className?: string;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      value = [],
      onChange,
      maxFiles = 5,
      maxSize = 5242880, // 5MB default
      accept = {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
        "application/pdf": [".pdf"],
      },
      disabled = false,
      showPreview = true,
      className,
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<FileWithPreview[]>(value);

    React.useEffect(() => {
      setFiles(value);
    }, [value]);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
          })
        );

        const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(updatedFiles);
        onChange?.(updatedFiles);
      },
      [files, maxFiles, onChange]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
      useDropzone({
        onDrop,
        maxFiles,
        maxSize,
        accept,
        disabled,
      });

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onChange?.(newFiles);
    };

    // Clean up previews on unmount
    React.useEffect(() => {
      return () => {
        files.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
      };
    }, [files]);

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive && "border-primary bg-primary/5",
            !isDragActive && "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          {isDragActive ? (
            <p className="text-sm text-muted-foreground">
              Drop the files here...
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">
                Drag & drop files here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Max {maxFiles} file{maxFiles > 1 ? "s" : ""},{" "}
                {formatFileSize(maxSize)} each
              </p>
            </div>
          )}
        </div>

        {/* File Rejections */}
        {fileRejections.length > 0 && (
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm font-medium text-destructive mb-1">
              Some files were rejected:
            </p>
            <ul className="text-xs text-destructive space-y-1">
              {fileRejections.map(({ file, errors }) => (
                <li key={file.name}>
                  {file.name}:{" "}
                  {errors.map((e) => e.message).join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* File Preview */}
        {showPreview && files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              >
                {/* Preview */}
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <div className="h-12 w-12 flex items-center justify-center bg-muted rounded">
                    <File className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
```

### Storybook Story

**File:** `packages/ui/src/components/ui/file-upload.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload, FileWithPreview } from "./file-upload";
import { useState } from "react";

const meta: Meta<typeof FileUpload> = {
  title: "Form/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    return (
      <div className="w-full max-w-md">
        <FileUpload value={files} onChange={setFiles} />
      </div>
    );
  },
};

export const ImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    return (
      <div className="w-full max-w-md">
        <FileUpload
          value={files}
          onChange={setFiles}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
        />
      </div>
    );
  },
};

export const SingleFile: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    return (
      <div className="w-full max-w-md">
        <FileUpload value={files} onChange={setFiles} maxFiles={1} />
      </div>
    );
  },
};

export const WithoutPreview: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    return (
      <div className="w-full max-w-md">
        <FileUpload
          value={files}
          onChange={setFiles}
          showPreview={false}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { FileUpload } from "./components/ui/file-upload";
export type { FileUploadProps, FileWithPreview } from "./components/ui/file-upload";
```

### Acceptance Criteria

- [ ] Drag-and-drop functionality
- [ ] File validation (size, type)
- [ ] Image previews
- [ ] Multi-file support
- [ ] Storybook story with 5+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with keyboard support

---

## 📦 Component 2: MultiSelect

### Overview
Multiple selection combobox with tag display and filtering.

**File:** `packages/ui/src/components/ui/multi-select.tsx`

**Dependencies:**
```bash
pnpm add @radix-ui/react-popover cmdk
```

### Implementation

```typescript
"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelected?: number;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onValueChange,
      placeholder = "Select items...",
      emptyText = "No items found.",
      searchPlaceholder = "Search...",
      className,
      disabled = false,
      maxSelected,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = (item: string) => {
      const newValue = value.filter((v) => v !== item);
      onValueChange?.(newValue);
    };

    const handleSelect = (item: string) => {
      if (value.includes(item)) {
        handleUnselect(item);
      } else {
        if (maxSelected && value.length >= maxSelected) {
          return;
        }
        onValueChange?.([...value, item]);
      }
      setInputValue("");
    };

    const selectedOptions = options.filter((opt) => value.includes(opt.value));
    const availableOptions = options.filter((opt) => !value.includes(opt.value));

    return (
      <div ref={ref} className={cn("relative", className)}>
        <Command className="overflow-visible bg-transparent">
          {/* Selected Items Display */}
          <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <Badge key={option.value} variant="secondary">
                  {option.label}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option.value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option.value)}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
              {/* Input */}
              <CommandPrimitive.Input
                placeholder={value.length === 0 ? placeholder : ""}
                value={inputValue}
                onValueChange={setInputValue}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                disabled={disabled}
                className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Options Dropdown */}
          <div className="relative mt-2">
            {open && availableOptions.length > 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto max-h-[300px]">
                  {availableOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ) : null}
          </div>
        </Command>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
```

### Storybook Story

**File:** `packages/ui/src/components/ui/multi-select.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./multi-select";
import { useState } from "react";

const meta: Meta<typeof MultiSelect> = {
  title: "Form/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-full max-w-md">
        <MultiSelect
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["next", "react"]);
    return (
      <div className="w-full max-w-md">
        <MultiSelect
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select frameworks..."
        />
      </div>
    );
  },
};

export const WithMaxSelected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-full max-w-md space-y-2">
        <MultiSelect
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select up to 3..."
          maxSelected={3}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {value.length}/3
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    value: ["next", "react"],
    disabled: true,
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { MultiSelect } from "./components/ui/multi-select";
export type { MultiSelectProps, MultiSelectOption } from "./components/ui/multi-select";
```

### Acceptance Criteria

- [ ] Multi-selection with tags
- [ ] Search/filter functionality
- [ ] Remove selected items
- [ ] Max selection limit
- [ ] Storybook story with 4+ variants
- [ ] Exports added to index.ts
- [ ] Keyboard navigation

---

## 📦 Component 3: Carousel

### Overview
Image/content carousel with navigation, autoplay, and indicators.

**File:** `packages/ui/src/components/ui/carousel.tsx`

**Dependencies:**
```bash
pnpm add embla-carousel-react
```

### Implementation

```typescript
"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  showControls?: boolean;
  showIndicators?: boolean;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      showControls = true,
      showIndicators = true,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          showControls,
          showIndicators,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, showControls } = useCarousel();

  if (!showControls) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, showControls } = useCarousel();

  if (!showControls) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { api, showIndicators } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  if (!showIndicators || scrollSnaps.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2",
        className
      )}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            index === selectedIndex
              ? "bg-primary w-4"
              : "bg-primary/50 hover:bg-primary/75"
          )}
          onClick={() => api?.scrollTo(index)}
        >
          <span className="sr-only">Go to slide {index + 1}</span>
        </button>
      ))}
    </div>
  );
});
CarouselIndicators.displayName = "CarouselIndicators";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
};
```

### Storybook Story

**File:** `packages/ui/src/components/ui/carousel.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "./carousel";
import { Card, CardContent } from "./card";

const meta: Meta<typeof Carousel> = {
  title: "Data Display/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

export const WithMultipleItems: Story = {
  render: () => (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

export const WithoutControls: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs" showControls={false}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicators />
    </Carousel>
  ),
};

export const WithoutIndicators: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs" showIndicators={false}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  type CarouselApi,
} from "./components/ui/carousel";
```

### Acceptance Criteria

- [ ] Embla Carousel integration
- [ ] Previous/Next navigation
- [ ] Dot indicators
- [ ] Keyboard navigation (arrows)
- [ ] Multiple items per slide
- [ ] Storybook story with 4+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with ARIA roles

---

## 📦 Component 4: Rating

### Overview
Star rating input component for reviews and feedback.

**File:** `packages/ui/src/components/ui/rating.tsx`

### Implementation

```typescript
"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  value?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      onValueChange,
      max = 5,
      readonly = false,
      disabled = false,
      size = "md",
      showValue = false,
      className,
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleClick = (rating: number) => {
      if (readonly || disabled) return;
      onValueChange?.(rating);
    };

    const handleMouseEnter = (rating: number) => {
      if (readonly || disabled) return;
      setHoverValue(rating);
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
    };

    const displayValue = hoverValue ?? value;

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: max }, (_, i) => {
            const rating = i + 1;
            const isFilled = rating <= displayValue;
            const isPartial = rating === Math.ceil(displayValue) && displayValue % 1 !== 0;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleClick(rating)}
                onMouseEnter={() => handleMouseEnter(rating)}
                disabled={disabled}
                className={cn(
                  "relative transition-transform hover:scale-110",
                  !readonly && !disabled && "cursor-pointer",
                  (readonly || disabled) && "cursor-default",
                  disabled && "opacity-50"
                )}
                aria-label={`Rate ${rating} out of ${max}`}
              >
                <Star
                  className={cn(
                    sizeClasses[size],
                    "transition-colors",
                    isFilled
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-muted-foreground"
                  )}
                />
                {isPartial && (
                  <Star
                    className={cn(
                      sizeClasses[size],
                      "absolute top-0 left-0 fill-yellow-400 text-yellow-400 transition-colors"
                    )}
                    style={{
                      clipPath: `inset(0 ${100 - (displayValue % 1) * 100}% 0 0)`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {showValue && (
          <span className="text-sm font-medium text-muted-foreground">
            {value.toFixed(1)} / {max}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = "Rating";
```

### Storybook Story

**File:** `packages/ui/src/components/ui/rating.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./rating";
import { useState } from "react";

const meta: Meta<typeof Rating> = {
  title: "Form/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <Rating value={value} onValueChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState(3.5);
    return <Rating value={value} onValueChange={setValue} />;
  },
};

export const ShowValue: Story = {
  render: () => {
    const [value, setValue] = useState(4);
    return <Rating value={value} onValueChange={setValue} showValue />;
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    readonly: true,
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
  },
};

export const SmallSize: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return <Rating value={value} onValueChange={setValue} size="sm" />;
  },
};

export const LargeSize: Story = {
  render: () => {
    const [value, setValue] = useState(4);
    return <Rating value={value} onValueChange={setValue} size="lg" />;
  },
};

export const TenStars: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return <Rating value={value} onValueChange={setValue} max={10} showValue />;
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { Rating } from "./components/ui/rating";
export type { RatingProps } from "./components/ui/rating";
```

### Acceptance Criteria

- [ ] Interactive star rating
- [ ] Half-star support (partial fill)
- [ ] Hover preview
- [ ] Readonly and disabled states
- [ ] Size variants (sm, md, lg)
- [ ] Storybook story with 8+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with ARIA labels

---

## 📦 Component 5: Tree View

### Overview
Hierarchical tree view with expand/collapse, selection, and custom icons.

**File:** `packages/ui/src/components/ui/tree.tsx`

### Implementation

```typescript
"use client";

import * as React from "react";
import { ChevronRight, Folder, File } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
  className?: string;
  expandedByDefault?: boolean;
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
  expandedByDefault?: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  onSelect,
  selectedId,
  expandedByDefault = false,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(expandedByDefault);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    if (!node.disabled) {
      onSelect?.(node);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer transition-colors",
          isSelected && "bg-accent text-accent-foreground",
          !isSelected && "hover:bg-accent/50",
          node.disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={handleSelect}
      >
        {/* Expand/Collapse Button */}
        {hasChildren ? (
          <button
            type="button"
            onClick={handleToggle}
            className="p-0.5 hover:bg-accent rounded transition-transform"
            style={{
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="w-5" />
        )}

        {/* Icon */}
        <span className="flex-shrink-0">
          {node.icon || (hasChildren ? <Folder className="h-4 w-4" /> : <File className="h-4 w-4" />)}
        </span>

        {/* Label */}
        <span className="text-sm flex-1 truncate">{node.label}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              expandedByDefault={expandedByDefault}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ data, onSelect, selectedId, className, expandedByDefault = false }, ref) => {
    return (
      <div ref={ref} className={cn("py-2", className)} role="tree">
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            onSelect={onSelect}
            selectedId={selectedId}
            expandedByDefault={expandedByDefault}
          />
        ))}
      </div>
    );
  }
);

Tree.displayName = "Tree";
```

### Storybook Story

**File:** `packages/ui/src/components/ui/tree.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Tree, TreeNode } from "./tree";
import { useState } from "react";
import { FolderOpen, FileText, Image, Code } from "lucide-react";

const meta: Meta<typeof Tree> = {
  title: "Data Display/Tree",
  component: Tree,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

const fileSystemData: TreeNode[] = [
  {
    id: "1",
    label: "src",
    icon: <FolderOpen className="h-4 w-4" />,
    children: [
      {
        id: "1-1",
        label: "components",
        children: [
          { id: "1-1-1", label: "Button.tsx", icon: <Code className="h-4 w-4" /> },
          { id: "1-1-2", label: "Input.tsx", icon: <Code className="h-4 w-4" /> },
        ],
      },
      {
        id: "1-2",
        label: "pages",
        children: [
          { id: "1-2-1", label: "index.tsx", icon: <FileText className="h-4 w-4" /> },
          { id: "1-2-2", label: "about.tsx", icon: <FileText className="h-4 w-4" /> },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "public",
    children: [
      { id: "2-1", label: "logo.png", icon: <Image className="h-4 w-4" /> },
      { id: "2-2", label: "favicon.ico", icon: <Image className="h-4 w-4" /> },
    ],
  },
  {
    id: "3",
    label: "package.json",
    icon: <FileText className="h-4 w-4" />,
  },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();
    return (
      <div className="w-[300px] border rounded-lg p-2">
        <Tree
          data={fileSystemData}
          selectedId={selected}
          onSelect={(node) => setSelected(node.id)}
        />
      </div>
    );
  },
};

export const ExpandedByDefault: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();
    return (
      <div className="w-[300px] border rounded-lg p-2">
        <Tree
          data={fileSystemData}
          selectedId={selected}
          onSelect={(node) => setSelected(node.id)}
          expandedByDefault
        />
      </div>
    );
  },
};

export const WithDisabledNodes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();
    const dataWithDisabled: TreeNode[] = [
      {
        id: "1",
        label: "Available Folder",
        children: [
          { id: "1-1", label: "File 1.txt" },
          { id: "1-2", label: "File 2.txt", disabled: true },
        ],
      },
      {
        id: "2",
        label: "Disabled Folder",
        disabled: true,
        children: [{ id: "2-1", label: "File 3.txt" }],
      },
    ];
    return (
      <div className="w-[300px] border rounded-lg p-2">
        <Tree
          data={dataWithDisabled}
          selectedId={selected}
          onSelect={(node) => setSelected(node.id)}
        />
      </div>
    );
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { Tree } from "./components/ui/tree";
export type { TreeProps, TreeNode } from "./components/ui/tree";
```

### Acceptance Criteria

- [ ] Expand/collapse functionality
- [ ] Node selection
- [ ] Custom icons per node
- [ ] Disabled nodes
- [ ] Keyboard navigation
- [ ] Storybook story with 3+ variants
- [ ] Exports added to index.ts
- [ ] ARIA tree role

---

## 📦 Component 6: ScrollArea

### Overview
Custom styled scrollbar component using Radix UI.

**File:** `packages/ui/src/components/ui/scroll-area.tsx`

**Dependencies:**
```bash
pnpm add @radix-ui/react-scroll-area
```

### Implementation

```typescript
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
```

### Storybook Story

**File:** `packages/ui/src/components/ui/scroll-area.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm" key={tag}>
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <figure key={i} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <div className="h-[200px] w-[150px] bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold">
                {i + 1}
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const LongText: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[500px] rounded-md border p-4">
      <h3 className="mb-4 text-lg font-semibold">Terms and Conditions</h3>
      <p className="text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
        <br /><br />
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <br /><br />
        {/* Repeat content */}
        {Array.from({ length: 10 }).map((_, i) => (
          <React.Fragment key={i}>
            Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            <br /><br />
          </React.Fragment>
        ))}
      </p>
    </ScrollArea>
  ),
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
```

### Acceptance Criteria

- [ ] Radix UI ScrollArea primitive
- [ ] Custom styled scrollbar
- [ ] Vertical and horizontal scrolling
- [ ] Smooth scrolling behavior
- [ ] Storybook story with 3+ variants
- [ ] Exports added to index.ts
- [ ] Accessible scrolling

---

## ✅ Phase 6 Checklist

### Pre-Implementation
- [ ] Review existing patterns
- [ ] Install dependencies (react-dropzone, embla-carousel-react, @radix-ui/react-scroll-area)
- [ ] Verify export structure

### Component Implementation (3 hours each for complex components)
- [ ] FileUpload - Drag-and-drop with preview (3 hours)
- [ ] MultiSelect - Multi-selection tags (2.5 hours)
- [ ] Carousel - Embla integration (3 hours)
- [ ] Rating - Star rating (2 hours)
- [ ] Tree - Hierarchical view (3.5 hours)
- [ ] ScrollArea - Custom scrollbar (2 hours)

**Total: ~18 hours**

### Quality Assurance
- [ ] All components exported from index.ts
- [ ] TypeScript compilation successful
- [ ] Storybook builds without errors
- [ ] No console warnings
- [ ] Accessibility tested
- [ ] Dark mode verified
- [ ] Responsive design tested

### Documentation
- [ ] All Storybook stories complete
- [ ] API props documented
- [ ] Usage examples provided

---

## 🔧 Verification Commands

```bash
# Install dependencies
pnpm --filter @devlaunch/ui install

# Type check
pnpm --filter @devlaunch/ui typecheck

# Build library
pnpm --filter @devlaunch/ui build

# Start Storybook
pnpm --filter @devlaunch/ui storybook

# Lint
pnpm --filter @devlaunch/ui lint
```

---

## 📊 Success Metrics

- ✅ All 6 advanced components implemented
- ✅ 20+ Storybook stories
- ✅ 100% TypeScript coverage
- ✅ WCAG 2.1 AA compliant
- ✅ Tree-shakeable exports
- ✅ No build errors

---

## 🚀 Next Steps

After completing Phase 6:
- **Phase 7:** Theming System
- **Phase 8:** Quality Assurance
- **Phase 9:** Release Process

---

**Estimated Completion:** 18-24 hours
**Agent Distribution:** 6 independent tasks (can run in parallel)
