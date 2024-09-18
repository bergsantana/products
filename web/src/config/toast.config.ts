import type { ToastContainerOptions } from 'vue3-toastify'

export const toastConfig: ToastContainerOptions = {
  limit: 10,
  icon: false,
  autoClose: 2500,
  containerClassName: 'custom-toast-container',
  bodyClassName: 'custom-toast-body',
  hideProgressBar: true,
  pauseOnHover: true,
  closeButton: true,
  toastClassName: 'custom-toast-classname'
}