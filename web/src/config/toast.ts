import { toast, type ToastOptions, type ToastType } from 'vue3-toastify'

import './toast.css'

export const commonToastOptions: ToastOptions = {
  isLoading: false
}

export abstract class Toast {
  static id: string

  static default(
    aText: string,
    type: ToastType = 'default',
    anOptionalToastOptions?: ToastOptions
  ): void {
    toast(aText, {
      ...commonToastOptions,
      ...anOptionalToastOptions,
      type
    })
  }

  static success(aText: string, anOptionalToastOptions?: ToastOptions): void {
    this.default(aText, 'success', {
      ...anOptionalToastOptions,
    
    })
  }

  static error(aText: string, anOptionalToastOptions?: ToastOptions): void {
    this.default(aText, 'error', {
      ...anOptionalToastOptions,
    
    })
  }

  static info(aText: string, anOptionalToastOptions?: ToastOptions): void {
    this.default(aText, 'info', {
      ...anOptionalToastOptions,
      
    })
  }

  static warning(aText: string, anOptionalToastOptions?: ToastOptions): void {
    this.default(aText, 'warning', {
      ...anOptionalToastOptions,
      
    })
  }

  static clear() {
    toast.clearAll()
  }
}
