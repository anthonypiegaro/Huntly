import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(seconds: number, shouldReject = false): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Rejected after ${seconds} seconds.`))
      } else {
        resolve(`Resolved after ${seconds} seconds.`)
      }
    }, seconds * 1000)
  });
}
