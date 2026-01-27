import { ref } from 'vue'

export interface ShippingInfo {
  country: string
  state: string
  zipCode: string
}

export function useShippingForm(initial: ShippingInfo) {
  const shippingInfo = ref<ShippingInfo>({ ...initial })
  const errors = ref<Record<string, string>>({})

  const validate = () => {
    errors.value = {}

    if (!shippingInfo.value.country.trim()) {
      errors.value.country = 'Country is required'
    }

    if (!shippingInfo.value.state.trim()) {
      errors.value.state = 'State is required'
    }

    if (!shippingInfo.value.zipCode.trim()) {
      errors.value.zipCode = 'ZIP code is required'
    }

    return Object.keys(errors.value).length === 0
  }

  const reset = (newValues?: Partial<ShippingInfo>) => {
    shippingInfo.value = { ...initial, ...newValues }
    errors.value = {}
  }

  return {
    shippingInfo,
    errors,
    validate,
    reset
  }
}