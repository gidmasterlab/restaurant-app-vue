<template>
  <div class="backdrop" :class="{ show: show }" />
  <div class="dropdown-container" :class="{ show: show }">
    <button ref="dropdownRef" class="button" @click="showList">
      <Icon class="icon" :name="selected.icon" />
      <span class="text"> {{ selected.name }} </span>
      <div class="arrow" />
    </button>
    <div class="content" ref="contentRef">
      <ul class="list">
        <li v-for="item of list" :key="item.id">
          <button @click="itemSelected(item.id)">
            <div class="icon-wrapper">
              <Icon class="icon" :name="item.icon" />
            </div>
            <span class="text">{{ item.name }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, type Ref, type PropType } from "vue";
import Icon from "@/components/shared/Icon.vue";
import type { ListType } from "@/types/ListType";

export default defineComponent({
  name: "DropDown",
  props: {
    list: Array as PropType<ListType[]>,
    selected: Object as PropType<ListType>,
  },
  emits: {
    select(id: string) { return id }
  },
  components: {
    Icon
  },
  setup(props, { emit }) {
    const show: Ref<boolean> = ref<boolean>(false);
    const contentRef: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null);
    const dropdownRef: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null);

    const collapseList = (event: MouseEvent) => {
      const dropdownCollision = dropdownRef.value?.contains(event.target as Node);
      const contentCollision = contentRef.value?.contains(event.target as Node);
      const isElementCollision = !dropdownCollision && !contentCollision;

      if (isElementCollision && show.value) {
        show.value = false;
      }
    };

    const showList = () => {
      show.value = !show.value;
    };

    const itemSelected = (id: string) => {
      show.value = false;
      emit("select", id);
    };

    onMounted(() => {
      window.addEventListener("click", collapseList);
    });

    onUnmounted(() => {
      window.removeEventListener("click", collapseList);
    });

    return {
      dropdownRef,
      contentRef,
      show,
      itemSelected,
      showList
    };
  }
});
</script>

<style lang="scss" scoped>
.backdrop {
  display: none;

  @include mediaQuery($breakpoint-mobile) {
    z-index: $position-index-backdrop;
    background-color: $background-secondary;

    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease;

    &.show {
      visibility: visible;
      opacity: 0.5;
    }
  }
}

.dropdown-container {
  width: 100%;
  position: relative;

  .button {
    cursor: pointer;
    width: 100%;
    height: $controller-height;
    padding: 0 $controller-padding;
    gap: $controller-gap;
    border-radius: $controller-radius;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border: 1px solid $divider;
    background-color: $background-primary;

    .icon {
      width: 24px;
      height: 24px;
      fill: $text-secondary;
    }

    .text {
      flex: 1;
      color: $text-secondary;
      text-align: left;
    }

    .arrow {
      border-style: solid;
      border-color: $text-secondary;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 4px;
      margin-top: -5px;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -webkit-transition: transform 0.3s ease;
      -moz-transition: transform 0.3s ease;
      -o-transition: transform 0.3s ease;
      transition: transform 0.3s ease;
    }
  }

  .content {
    z-index: $position-index-list;
    position: absolute;
    left: 0;
    top: $controller-height;
    width: 100%;

    background-color: $background-primary;
    border: 1px solid $divider;

    visibility: hidden;
    opacity: 0;

    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;

    .list {
      list-style: none;

      li {
        display: inline-block;
        align-items: center;
        width: 100%;
        height: $controller-height;

        &:not(:last-child) {
          border-bottom: 1px solid $divider;
        }

        button {
          cursor: pointer;
          width: 100%;
          height: 100%;
          padding: 0 $controller-padding;

          display: flex;
          align-items: center;
          gap: $controller-gap;

          background-color: transparent;
          border: 0;


          .icon-wrapper {
            width: 24px;
            height: 24px;

            .icon {
              width: 100%;
              height: 100%;
              fill: $text-secondary;
            }
          }


          .text {
            color: $text-secondary;
          }

          &:hover {
            background-color: $primary-color;

            .icon {
              fill: $text-light;
            }

            .text {
              color: $text-light;
            }
          }
        }
      }
    }
  }

  &.show {
    .button {
      .arrow {
        margin-top: 5px;
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }

      border-bottom-color: transparent;
      border-end-start-radius: 0;
      border-end-end-radius: 0;
    }

    .content {
      visibility: visible;
      opacity: 1;
    }
  }

  @include mediaQuery($breakpoint-mobile) {
    .button {
      width: $controller-height;
      height: $controller-height;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      padding: 0;
      border-radius: 50%;
      background-color: $primary-color;

      .icon {
        fill: $text-light;
      }

      .text {
        display: none;
      }

      .arrow {
        display: none;
      }
    }

    .content {
      z-index: $position-index-modal;
      position: fixed;
      bottom: 0;
      top: unset;
      box-shadow: $toolbar_elevation;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;

      width: 100%;
      height: 0;
      visibility: visible;
      opacity: 1;


      .list {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: $gap-mobile;

        li {
          height: auto;

          &:not(:last-child) {
            border-bottom: 0;
          }

          button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: $controller-gap;


            .icon-wrapper {
              width: $controller-height;
              height: $controller-height;

              border: 0;
              border-radius: 50%;

              display: flex;
              justify-content: center;
              align-items: center;
              background-color: $primary-color;

              .icon {
                width: 24px;
                height: 24px;
                fill: $text-light;
              }
            }

            .text {
              color: $text-primary;
            }

            &:hover {
              background-color: unset;

              .text {
                color: $text-primary;
              }
            }
          }
        }
      }
    }

    &.show {
      .button {
        border-radius: 50%;
      }

      .content {
        height: 250px;
      }
    }

  }
}
</style>
