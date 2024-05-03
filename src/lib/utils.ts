import { AllowedFileExtensions } from "@/schemas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFileExtensionAllowed(fileName: string) {
  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  if (!fileExtension || !AllowedFileExtensions.includes(fileExtension)) {
    return false;
  }
  return true;
}
