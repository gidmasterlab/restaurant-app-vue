<template>
  <div class="input-wrapper" :class="{ error: error }">
    <label class="label" :for="id" v-if="label">{{ label }}</label>
    <div class="input-controller" :class="{ padding: !icon && label }" @click="changeFocus">
      <Icon class="icon" :name="icon" v-if="icon" />
      <input
        ref="inputRef"
        class="input"
        type="text"
        v-maska:[maskOptions]
        :id="id"
        :placeholder="placeholder"
        :value="modelValue || value"
        @input="updateValue" />
    </div>
    <span class="message" v-if="message">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, type Ref, reactive } from "vue";
import Icon from "@/components/shared/Icon.vue";
import { vMaska } from "maska"

export default defineComponent({
  name: "Input",
  emits: {
    input(value: string) { return value },
    'update:modelValue'(value: string) { return value },
  },
  directives: { maska: vMaska },
  props: {
    id: String,
    label: String,
    icon: String,
    placeholder: String,
    value: String,
    modelValue: String as PropType<string | number>,
    message: String,
    error: Boolean,
    mask: String
  },
  components: {
    Icon
  },
  setup(props, { emit }) {

    const inputRef: Ref<HTMLInputElement> = ref<HTMLInputElement>(null);
    const maskOptions = reactive({
      mask: props.mask,
      eager: true
    })

    const updateValue = (event: Event) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
      emit('input', target.value);
    }

    const changeFocus = () => {
      inputRef.value.focus();
    }

    return {
      maskOptions,
      inputRef,
      changeFocus,
      updateValue
    };
  }
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;

  .label {
    color: $text-primary;
    font-size: 14px;
  }

  .message {
    color: $text-secondary;
    font-size: 12px;
  }

  .input-controller {
    width: 100%;
    height: $controller-height;
    background-color: $background-primary;
    border: 1px solid $divider;
    border-radius: $controller-radius;

    position: relative;
    display: flex;
    align-items: center;
    gap: $controller-gap;
    padding: 0 $controller-padding;

    &.padding {
      padding: 0 calc($controller-padding / 2);
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: $text-secondary;
    }

    .input {
      border: 0;
      background-color: transparent;
      height: 100%;
      width: 100%;
      color: $text-primary;

      &::placeholder {
        color: $text-secondary;
        opacity: 0.8;
      }

      &:-ms-input-placeholder {
        color: $text-secondary;
        opacity: 0.8;
      }

      &::-ms-input-placeholder {
        color: $text-secondary;
        opacity: 0.8;
      }
    }
  }

  &.error {
    .label {
      color: $text-accent;
    }

    .message {
      color: $text-accent;

    }

    .input-controller {
      border: 1px solid $text-accent;

      .icon {
        fill: $text-accent;
      }

      .input {
        color: $text-accent;

        &::placeholder {
          color: $text-accent;
        }

        &:-ms-input-placeholder {
          color: $text-accent;
        }

        &::-ms-input-placeholder {
          color: $text-accent;
        }
      }
    }
  }

  @include mediaQuery($breakpoint-mobile) {
    //
  }

}
</style>
